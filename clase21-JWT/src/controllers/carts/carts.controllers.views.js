import { cartService } from '../../dao/services/cart.service.js'

export const HandleRenderCarts = async (req, res) => {
    let resultado = await cartService.getCarts()

    let name

    if(req.session.user) {
        name = req.session.user.user_name
    }

    res.render('carts', { title: 'Carritos de compra', carritos: resultado.payload, name })
}

export const HandleRenderProductsCart = async (req, res) => {
    const { cid } = req.params
    
    let resultado = await cartService.getProductsCart(cid)

    let name

    if(req.session.user) {
        name = req.session.user.user_name
    }

    res.render('products-cart', { title: 'Carrito', products: resultado.payload, name })
}