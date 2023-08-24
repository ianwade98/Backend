import { Message } from '../../dao/models/message.model.js'
import { messageService } from '../../dao/services/message.service.js'

export const HandleGetMessages = async (req, res) => {
    try {

        let response = await messageService.getMessages()
        res.status(response.status).json(response)

    } catch (error) {
        res.status(500).send({ error })
    }
}

export const HandleNewMessage = async (req, res) => {
    try {

        const { user, message } = req.body
        const m = new Message(user, message)

        let response = await messageService.addMessage(m)
        res.status(response.status).json(response)

    } catch (error) {
        res.status(500).send({ error })
    }
}