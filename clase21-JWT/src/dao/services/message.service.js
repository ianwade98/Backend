import { messageModelSchema } from '../schemas/message.schema.js'
import { Message } from '../models/message.model.js'
import { responseData } from '../../utils/response.utils.js'


class MessageService {

    async getMessages () {
        try {

            let result = await messageModelSchema.find().lean()
            if(!result.length > 0) return responseData(200, 'No hay mensajes que mostrar')
            return responseData(200, 'Messages', result)

        } catch (error) {
            responseData(500, error.message, error)
        }
    }

    async addMessage  (obj) {
        try {

            if(!(obj.user && obj.message)) return responseData(411, 'Todos los campos son requeridos')

            let m = new Message(obj.user, obj.message)
            await messageModelSchema.create(m)
            return responseData(201, `Nuevo mensaje`, obj)
            
        } catch (error) {
            return responseData(500, error.message, error)
        }
    }

}

export const messageService = new MessageService()