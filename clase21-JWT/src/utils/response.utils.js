import { ResponseData } from '../dao/models/response.model.js'

export const responseData = (status, message, data) => {
    let respuesta = new ResponseData(status, message, data)
    if (!data) respuesta = new ResponseData(status, message)
    return respuesta
}