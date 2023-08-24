import { userModelSchema } from '../schemas/user.schema.js'
import { User } from '../models/user.model.js'
import { responseData } from '../../utils/response.utils.js'
import { createHash, isValidPassword } from '../../utils/hashGenerator.utils.js'

class SessionService {

    async findUser (obj) {
        try {

            if(!(obj.email && obj.password)) return responseData(411, 'Todos los campos son requeridos')
            
            const user = await userModelSchema.findOne({email: obj.email})
            const exist = isValidPassword(user, obj.password)
            if(!exist) return responseData(400, 'Correo o contraseña invalido', {user})
            
            return responseData(200, 'Sesion iniciada', {user})
            
        } catch (error) {
            return responseData(500, error.message, error)
        }
    }

    async registerUser (obj) {
        try {

            if(!(
                obj.first_name &&
                obj.last_name &&
                obj.user_name &&
                obj.email &&
                obj.password &&
                obj.age
            )) return responseData(411, 'Todos los campos son requeridos')

            let password = createHash(obj.password)

            let user = new User( obj.first_name, obj.last_name, obj.user_name, obj.age, obj.email, password, obj.role )

            const existe = await userModelSchema.findOne({email: obj.email, user_name: obj.user_name})
            if(existe) return responseData(400, 'El usuario ya existe')

            await userModelSchema.create(user)

            return responseData(201, 'Usuario registrado con exito', user.username)
            
        } catch (error) {
            return responseData(500, error.message, error)
        }
    }

}

export const sessionService = new SessionService()