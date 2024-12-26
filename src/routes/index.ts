import { Router } from "express";
import rabbitMqController from '../controllers/rabbitmq.controller.js';

const router = Router();

router.get('/', (req, res) => {
    res.status(200).send({ error: false, message: `${process.env.APP_NAME}: Version 1 API's` })
})

router.post('/sendMessage', rabbitMqController.sendMessage)

export default router