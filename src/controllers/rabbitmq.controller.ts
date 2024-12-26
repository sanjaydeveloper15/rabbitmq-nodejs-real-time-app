import { Request, Response } from 'express';
import Producer from '../workers/rabbitMqProducer.js';

const sendMessage:any = async (req: Request, res: Response) => {
    try {
        const textObj:any = {
            item_id: req.body.itemId || 0,
            username: "github@sanjaydeveloper15",
            message: req.body.message || 'n/a',
        };
        const rabbitMqProducer:any = new Producer()
        await rabbitMqProducer.invoke(textObj)
        return res.status(200).send({ error: false, message: 'success' })
    } catch (err: any) {
        return res.status(500).send({ error: true, message: err.message })
    }
};


const rabbitMQController = {
    sendMessage
}

export default rabbitMQController;
