import { cartService } from '../../dao/services/cart.service.js'


export const HandleGetCarts = async (req, res) => {
    try {

        let response = await cartService.getCarts()
        res.status(response.status).json(response)

    } catch (error) {
        res.status(500).send({ error })
    }
}

export const HandleCreateCart= async (req, res) => {
    try {

        let response = await cartService.createCart()
        res.status(response.status).json(response)

    } catch (error) {
        res.status(500).send({ error })
    }
}

export const HandleGetCart = async (req, res) => {
    try {

        const { cid } = req.params

        let response = await cartService.getProductsCart(cid)
        res.status(response.status).json(response)

    } catch (error) {
        res.status(500).send({ error })
    }
}

export const HandleUpdateCart = async (req, res) => {
    try {

        const { cid } = req.params
        const cart = req.body

        let response = await cartService.updateCart(cid, cart)
        res.status(response.status).json(response)

    } catch (error) {
        res.status(500).send({ error })
    }
}

export const HandleUpdateProductCart = async (req, res) => {
    try {

        const { cid, pid } = req.params

        let response = await cartService.updateProductCart(cid, pid, req.body)
        res.status(response.status).json(response)
        
    } catch (error) {
        res.status(500).send({ error })
    }
}

export const HandleDeleteCart = async (req, res) => {
    try {

        const { cid } = req.params

        let response = await cartService.deleteCart(cid)
        res.status(response.status).json(response)

    } catch (error) {
        res.status(500).send({ error })
    }
}

export const HandleAddProductCart = async (req, res) => {
    try {

        const { cid, pid } = req.params

        let response = await cartService.addProductCart(cid, pid)
        res.status(response.status).json(response)

    } catch (error) {
        res.status(500).send({ error })
    }
}

export const HandleDeleteProductCart = async (req, res) => {
    try {

        const { cid, pid } = req.params

        let response = await cartService.deleteProductCart(cid, pid)
        res.status(response.status).json(response)

    } catch (error) {
        res.status(500).send({ error })
    }
}