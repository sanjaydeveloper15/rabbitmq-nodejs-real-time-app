import amqp from 'amqplib'

class BaseClass {
    // Queue: is a buffer that stores the messages
    // Message: is the information that is sent from the producer to a consumer
    // Exchange: receives messages from producers and pushes them to queues depending on rules defined by the exchange type 
    // The exchange type determines how messages are routed
    // Binding: links the queue to the exchange
    constructor() {
        console.info(`Base Class Invoked`)
    }

    async getRabbitMqConn() {
        try{
            return await amqp.connect("amqp://localhost");
        } catch(err:any) {
            console.warn(`Rabbit MQ Connection Failed: ${err.message}`)
        }
    }

}

export default BaseClass