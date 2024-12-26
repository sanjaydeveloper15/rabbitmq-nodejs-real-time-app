import express from 'express'
// import amqp from "amqplib";
import router from './routes/index.js'
import { CONSTANTS } from './constants/common.constants.js'
import Consumer from './workers/rabbitMqConsumer.js'

const app = express()
const port = CONSTANTS.SERVER_PORT
const rabbitMqConsumer = new Consumer()



// middleware to parse json, available in express since 4.16 version, earlier same we were acheiving with body-parser package
app.use(express.json({ limit: '5mb' }))
app.use(express.urlencoded({ limit: '5mb', extended: true }))

//api v1 base route set
app.use('/api/v1', router)

// listen server
app.listen(port, async () => {
    await rabbitMqConsumer.invoke()
    return console.log(`Server listening on port ${port}`)
})

// const queue = "text-message-list";
// const text = {
//     item_id: "005",
//     username: "github@sanjaydeveloper15",
//     text: "Hello Buddy, It's Sanjay here!",
// };

// (async () => {
//     let connection;
//     try {
//         connection = await amqp.connect("amqp://localhost");
//         const channel = await connection.createChannel();

//         await channel.assertQueue(queue, { durable: false });

//         channel.sendToQueue(queue, Buffer.from(JSON.stringify(text)));
//         console.log(" [x] Sent '%s'", text);
//         await channel.close();



//     } catch (err) {
//         console.warn(err);
//     } finally {
//         if (connection) await connection.close();
//     }
// })();

// (async () => {
//     try {
//         const connection = await amqp.connect("amqp://localhost");
//         const channel = await connection.createChannel();

//         process.once("SIGINT", async () => {
//             await channel.close();
//             await connection.close();
//         });

//         await channel.assertQueue(queue, { durable: false });
//         await channel.consume(
//             queue,
//             (message) => {
//                 if (message) {
//                     console.log(
//                         " [x] Received '%s'",
//                         JSON.parse(message.content.toString())
//                     );
//                 }
//             },
//             { noAck: true }
//         );

//         console.log(" [*] Waiting for messages. To exit press CTRL+C");
//     } catch (err) {
//         console.warn(err);
//     }
// })();