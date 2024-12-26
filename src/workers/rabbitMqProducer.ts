import BaseClass from "./baseClass.js";
import { CONSTANTS } from '../constants/common.constants.js';
// Producer is an application that sends messages
class Producer extends BaseClass {

    constructor() {
        super()
        console.info('Invoked Consumer Class')
    }

    async invoke(bodyObj:any) {
        let connection:any;
        try {
            connection = await this.getRabbitMqConn()
            const channel = await connection.createChannel();
            await channel.assertQueue(CONSTANTS.QUEUE_BUFFER_NAME, { durable: false });
            channel.sendToQueue(CONSTANTS.QUEUE_BUFFER_NAME, Buffer.from(JSON.stringify(bodyObj)));
            console.log(" [x] Sent '%s'", bodyObj);
            await channel.close();
        } catch (err:any) {
            console.warn(err);
        } finally {
            if (connection) await connection.close();
        }
    }

}

export default Producer