import { Server } from "socket.io"

import { messageModelSchema } from '../dao/schemas/message.schema.js'
import { productModelSchema } from '../dao/schemas/product.schema.js'

export const serverConection = ( server ) => {
    let io = new Server(server)

    io.on('connection', socket => {
        console.log('Cliente conectado')
        // socket.emit('get-products', 'Obtener productos')
        
        socket.on('get-messages', data => {
            console.log(data)
        })

        socket.on('get-products', data => {
            console.log(data)
        })
        
        messageModelSchema.find().then(data => {
            socket.emit('get-messages', data)
        })

        productModelSchema.find().then(data => {
            socket.emit('get-products', data)
        })
    })
}