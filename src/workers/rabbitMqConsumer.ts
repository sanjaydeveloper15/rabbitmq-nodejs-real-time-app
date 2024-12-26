import BaseClass from "./baseClass.js";
import { CONSTANTS } from '../constants/common.constants.js';

// Consumer is an application that receives messages
class Consumer extends BaseClass {

    constructor() {
        super()
        console.info('Invoked Consumer Class')
    }

    async invoke() {
        let connection: any;
        try {
            connection = await this.getRabbitMqConn()
            const channel = await connection.createChannel();

            process.once("SIGINT", async () => {
                await channel.close();
                await connection.close();
            });

            await channel.assertQueue(CONSTANTS.QUEUE_BUFFER_NAME, { durable: false });
            await channel.consume(
                CONSTANTS.QUEUE_BUFFER_NAME,
                (message:any) => {
                    if (message) {
                        console.log(
                            " [x] Received '%s'",
                            JSON.parse(message.content.toString())
                        );
                    }
                },
                { noAck: true }
            );

            console.log(" [*] Waiting for messages. To exit press CTRL+C");
        } catch (err:any) {
            console.warn(err);
        } finally {
            if (connection) await connection.close();
        }
    }

}

export default Consumer