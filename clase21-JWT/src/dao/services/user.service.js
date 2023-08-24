import { userModelSchema } from '../schemas/user.schema.js'
import { User } from '../models/user.model.js'
import { responseData } from '../../utils/response.utils.js'

class UserService {
    
    async getUser (email) {
        try {

            let result = await userModelSchema.findOne({ email })
            if(!result) return responseData(404, 'No se encontro al usuario especificado')
            return responseData(200, 'Usaurio', result)

        } catch (error) {
            return responseData(500, error.message, error)
        }
    }

    async createUser (obj) {
        try {

            let exist = await userModelSchema.findOne({email: obj.email})

            if(!(
                obj.first_name &&
                obj.last_name &&
                obj.user_name &&
                obj.age &&
                obj.email &&
                obj.password
            )) return responseData(411, 'Todos los campos son requeridos')

            if(exist) return responseData(203, 'El usuario ya existe')

            let user = new User( obj.first_name, obj.last_name, obj.user_name, obj.age ,obj.email, obj.password, obj.role )
            let result = await  userModelSchema.create(user)
            return responseData(201, 'Usuario creado', result)

        } catch (error) {
            return responseData(500, error.message, error)
        }
    }

}

export const userService = new UserService()