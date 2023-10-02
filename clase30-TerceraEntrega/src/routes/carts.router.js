import { Router } from 'express';
import CartsController from '../controllers/carts.controller.js';

class CartsRouter {
    constructor() {
        this.router = Router();
        this.router.post('/', CartsController.addCart);
        this.router.get('/:cartId', CartsController.getCartById);
        this.router.post('/:cartId/products/:productId', CartsController.addProductToCart);
        this.router.delete('/:cartId/products/:productId', CartsController.deleteProductFromCart);
        this.router.put('/:cartId', CartsController.replaceProductsInCart);
        this.router.put('/:cartId/products/:productId', CartsController.updateProductInCart);
        this.router.delete('/:cartId', CartsController.emptyCart);
        this.router.post('/:cartId/purchase', CartsController.completePurchase);
    }

    getRouter() {
        return this.router;
    }
}

export default new CartsRouter();