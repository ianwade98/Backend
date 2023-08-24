import { productModelSchema } from '../schemas/product.schema.js'
import { Product } from '../models/product.model.js'
import { responseData } from '../../utils/response.utils.js'


class ProductService {

    async getProducts (page, limit, disp, category, ord) {
        try {

            let filter = {}
            let p = {}
            if(disp && category) {
                filter = {
                    status: disp,
                    category: category
                }
            } else if(disp) {
                filter = {
                    status: disp
                }
            } else if(category) {
                filter = {
                    category: category
                }
            }

            if(ord == 'asc') p = { price : -1 } 
            else if (ord == 'desc') p = { price : 1 }
            
            let options = { limit, page, lean: true, sort: p }
            let result = await productModelSchema.paginate( filter, options )

            return responseData(200, 'Productos', result)

        } catch (error) {
            return responseData(500, error.message, error)
        }
    }

    async getProductById (id) {
        try {

            let exist = await productModelSchema.findById({_id: id}).lean()
            if(!exist) return responseData(200, 'No se encontró el producto expecificado')
            
            return responseData(200, 'Producto encontrado', exist)

        } catch (error) {
            return responseData(500, error.message, error)
        }
    }

    async createProduct (object) {
        try {

            let exist = await productModelSchema.findOne({code: object.code})

            if(!(
                object.title        &&
                object.description  &&
                object.code         &&
                object.price        &&
                object.status       &&
                object.stock        &&
                object.category
            )) return responseData(411, 'Todos los campos son requeridos')
    
            if(exist) return responseData(203, `Ya existe un producto con el código: ${object.code}`)
            
            const product = new Product( object.title, object.description, object.code, parseFloat(object.price), object.status, parseInt(object.stock), object.category, object.thumbnails )
            await productModelSchema.create(product)

            return responseData(201, `Producto: ${object.title} - ${object.code} creado con éxito`)

        } catch (error) {
            return responseData(500, error.message, error)
        }
    }

    async updateProductById (id, object) {
        try {

            let exist = await productModelSchema.findOne({_id: id})
    
            if(!(id, object)) return responseData(411, 'Faltan compos por llenar')
            if(!exist) return responseData(200, 'No se encontró el producto expecificado')
    
            exist.title       = object.title        || exist.title
            exist.description = object.description  || exist.description
            exist.code        = object.code         || exist.code
            exist.price       = object.price        || exist.price
            exist.status      = object.status       || exist.status
            exist.stock       = object.stock        || exist.stock
            exist.category    = object.category     || exist.category
            exist.thumbnails  = object.thumbnails   || exist.thumbnails

            await productModelSchema.updateOne({_id: id}, exist)

            return responseData(202, `Producto modificado de manera exitosa`, exist)

        } catch (error) {
            return responseData(500, error.message, error)
        }
    }

    async deleteProductById (id) {
        try {

            let exist = await productModelSchema.findOne({_id: id})
            if(!exist) return responseData(200, 'No se encontró el producto expecificado')

            await productModelSchema.deleteOne({_id: id})

            return responseData(200, `Producto ${exist.code} eliminado`)

        } catch (error) {
            return responseData(500, error.message, error)
        }
    }

}

export const productService = new ProductService()