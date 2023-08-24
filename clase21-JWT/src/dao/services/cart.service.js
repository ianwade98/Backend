import { cartModelSchema } from '../schemas/cart.schema.js'
import { Cart } from '../models/cart.model.js'
import { ProductCart } from '../models/productCart.model.js'
import { responseData } from '../../utils/response.utils.js'

class CartService {

    async getCarts () {
        try {

            let result = await cartModelSchema.find().populate('products._id').lean()
            if(!result.length > 0) return responseData(200, 'Aún no existe ningún carrito de compra, crea uno')
            return responseData(200, 'Carritos de compra', result)

        } catch (error) {
            return responseData(500, error.message, error)
        }
    }

    async getProductsCart (id) {
        try {

            let result = await cartModelSchema.findOne({_id: id}).populate('products._id').lean()
            if(!result) return responseData(404, 'No se encontró el carrito especificado')
            return responseData(200, `Carrito: ${result._id}`, result.products)

        } catch (error) {
            return responseData(500, error.message, error)
        }
    }

    async updateCart (cid, object) {
        try {

            let exist = await cartModelSchema.findOne({_id: cid})
            if(!(cid, object)) return responseData(411, 'Faltan compos por llenar')
            if(!exist) return responseData(200, 'No se encontró el carrito expecificado')

            await cartModelSchema.updateOne({_id: cid}, object)
            return responseData(202, `Carrito modificado de manera exitosa`, object)
            
        } catch (error) {
            return responseData(500, error.message, error)
        }
    }

    async updateProductCart (cid, pid, object) {
        try {

            let exist = await cartModelSchema.findOne({_id: cid})
            let existProduct = await exist.products.find(p => JSON.stringify(p._id) == JSON.stringify(pid))
            
            if(!exist) return responseData(404, 'No se encontró el carrito especificado')
            if(!existProduct) return responseData(404, 'No se encontro el producto del carrito especificado')
            
            existProduct.quantity = object.quantity
            
            await cartModelSchema.updateOne({_id: cid}, exist)

            return responseData(200, 'Producto del carrito modificado con exito', object)
            
        } catch (error) {
            return responseData(500, error.message, error)
        }
    }

    async createCart () {
        try {

            let cart = new Cart()
            await cartModelSchema.create(cart)
            return responseData(201, 'Carrito creado con éxito')

        } catch (error) {
            return responseData(500, error.message, error)
        }
    }

    async addProductCart (cid, pid) {
        try {

            let exist = await cartModelSchema.findOne({_id: cid})
            let existProduct = await exist.products.find(p => JSON.stringify(p._id) == JSON.stringify(pid))

            if(!exist) return responseData(404, 'No se encontró el carrito especificado')

            if(existProduct) {
                existProduct.quantity = existProduct.quantity + 1
                await cartModelSchema.updateOne({_id: cid}, exist)
            } else {
                let product = new ProductCart(pid)
                await cartModelSchema.findByIdAndUpdate(cid, {$push: {products: product}})
            }
            return responseData(201, `Producto añadido al carrito`)

        } catch (error) {
            return responseData(500, error.message, error)
        }
    }

    async deleteCart (id) {
        try {

            let exist = await cartModelSchema.findOne({_id: id})
            if(!exist) return responseData(200, 'No se encontró el carrito expecificado')

            await cartModelSchema.deleteOne({_id: id})

            return responseData(200, 'Carrito eliminado')

        } catch (error) {
            return responseData(500, error.message, error)
        }
    }

    async deleteProductCart (cid, pid) {
        try {

            let exist = await cartModelSchema.findOne({_id: cid})
            let existProduct = await exist.products.find(p => JSON.stringify(p._id) == JSON.stringify(pid))

            if(!exist) return responseData(404, 'No se encontró el carrito especificado')

            if(!existProduct) return responseData(404, 'No se encontro el producto especificado')

            let position = await exist.products.findIndex(p => JSON.stringify(p._id) == JSON.stringify(pid))
            exist.products.splice(position, 1)
            await cartModelSchema.updateOne({_id: cid}, exist)

            return responseData(201, `Producto eliminado al carrito`)

        } catch (error) {
            return responseData(500, error.message, error)
        }
    }

}

export const cartService = new CartService()