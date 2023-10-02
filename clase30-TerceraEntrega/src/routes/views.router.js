import { Router } from 'express';
import ViewsController from '../controllers/views.controller.js';

class ViewsRouter {
    constructor() {
        this.router = Router();
        this.router.get('/', ViewsController.getProducts);
        this.router.get('/realTimeProducts', ViewsController.getRealTimeProducts);
        this.router.get('/products', ViewsController.getProductsForUser);
        this.router.get('/carts/:cartId', ViewsController.getCart);
        this.router.get('/login', ViewsController.renderLogin);
        this.router.get('/register', ViewsController.renderRegister);
        this.router.get('/errorRegister', ViewsController.renderErrorRegister);
        this.router.get('/errorLogin', ViewsController.renderErrorLogin);
    }

    getRouter() {
        return this.router;
    }
}

export default new ViewsRouter();