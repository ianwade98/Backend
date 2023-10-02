import { Router } from 'express';
import ProductsController from '../controllers/products.controller.js';

class ProductsRouter {
    constructor() {
        this.router = Router();
        this.router.get('/', ProductsController.getProducts);
        this.router.get('/mockingProducts', ProductsController.getMockingProducts);
        this.router.get('/:productId', ProductsController.getProductById);
        this.router.post('/', ProductsController.addProduct);
        this.router.put('/:productId', ProductsController.updateProduct);
        this.router.delete('/:productId', ProductsController.deleteProduct);
    }

    getRouter() {
        return this.router;
    }
}

export default new ProductsRouter();