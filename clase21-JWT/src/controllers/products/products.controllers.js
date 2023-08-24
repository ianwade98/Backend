import { productService } from '../../dao/services/product.service.js'


export const HandleGetProducts   = async (req, res) => {
    try {

        const { page = 1, limit = 10 } = req.query

        let response = await productService.getProducts(page, limit)
        res.status(response.status).json(response)

    } catch (error) {
        res.status(500).send({ error })
    }
}

export const HandleGetProduct    = async (req, res) => {
    try {

        const { pid } = req.params

        let response = await productService.getProductById(pid)
        res.status(response.status).json(response)

    } catch (error) {
        res.status(500).send({ error })
    }
}

export const HandleCreateProduct = async (req, res) => {
    try {

        const { title, description, code, price, status, stock, category, thumbnails } = req.body
        const obj = { title, description, code, price, status, stock, category, thumbnails }

        let response = await productService.createProduct(obj)
        res.status(response.status).json(response)

    } catch (error) {
        res.status(500).send({ error })
    }
}

export const HandleUpdateProduct = async (req, res) => {
    try {

        const { pid } = req.params
        const { title, description, code, price, status, stock, category, thumbnails } = req.body
        const obj = { title, description, code, price, status, stock, category, thumbnails }

        let response = await productService.updateProductById(pid, obj)
        res.status(response.status).json(response)

    } catch (error) {
        res.status(500).send({ error })
    }
}

export const HandleDeleteProduct = async (req, res) => {
    try {

        const { pid } = req.params

        let response = await productService.deleteProductById(pid)
        res.status(response.status).json(response)

    } catch (error) {
        res.status(500).send({ error })
    }
}