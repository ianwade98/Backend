import { cartsModel } from '../../mongo/models/carts.model.js';

export default class CartsMongo {
    async addCart() {
        try{
            const newCart = await cartsModel.create({ products: [] });
            return newCart
        } catch (error) {
            console.log(error)
        }
    }

    async getProductsFromCart(cartId) {
        try {
            const cart = await cartsModel.find({ _id: cartId });
            return cart
        } catch (error) {
            console.log(error)
        }
    }

    async addProductToCart(cartId, productId) {
        try {
            const cart = await cartsModel.findById(cartId);
            if ((cart.products).find(product => JSON.stringify(product._id).replace('"', '').replace('"', '') === productId)) {
                throw new Error('Este producto ya está en el carrito.')
            }
            cart.products.push({ _id: productId, quantity: 1 });
            cart.save();
            return cart
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProductInCart(cartId, productId) {
        try {
            const cart = await cartsModel.findById(cartId);
            const filteredProducts = cart.products.filter(product => product._id === productId);
            cart.products = filteredProducts;
            cart.save();
            return cart
        } catch (error) {
            console.log(error)
        }
    }

    async replaceProductsInCart(cartId, products) {
        try {
            const cart = await cartsModel.findById(cartId);
            cart.products = products;
            cart.save();
            return cart
        } catch (error) {
            console.log(error)
        }
    }

    async updateProductInCart(cartId, productId, quantity) {
        try {
            const cart = await cartsModel.findById(cartId); 
            const product = cart.products.find(product => product._id === productId);
            product.quantity = quantity;
            cart.save();
            return cart
        } catch (error) {
            console.log(error)
        }
    }

    async emptyCart(cartId) {
        try {
            const cart = await cartsModel.findById(cartId);
            cart.products = [];
            cart.save();
            return cart
        } catch (error) {
            console.log(error)
        }
    }

    async completePurchase(cartId, user) {
        const unavailableProducts = [];
        const purchasedProducts = [];
        let total = 0;
        try {
            const cart = await cartsModel.findById(cartId);
            for (cartProduct in cart.products) {
                const product = await productsModel.findById(cartProduct._id);
                if (product.stock < cartProduct.quantity) {
                    unavailableProducts.push(cartProduct);
                } else {
                    product.stock -= cartProduct.quantity;
                    total += product.price * cartProduct.quantity;
                    purchasedProducts.push(cartProduct);
                    await product.save();
                }
            }
            cart.products = unavailableProducts;
            await cart.save();
            const tickets = await ticketsModel.find();
            if (purchasedProducts.length !== 0) {
                let newTicket;
                if (tickets.length === 0) {
                    newTicket = await ticketsModel.create({ 
                        code: '00000001',
                        purchase_datetime: Date.now(),
                        amount: total,
                        purchaser: user,
                    });
                } else {
                    const lastCode = tickets[tickets.length - 1].code;
                    const newCode = (parseInt(lastCode) + 1).toString().padStart(8, '0');
                    newTicket = await ticketsModel.create({ 
                        code: newCode,
                        purchase_datetime: Date.now(),
                        amount: total,
                        purchaser: user,
                    });
                }
                return {
                    message: 'Compra realizada con éxito.',
                    ticket: newTicket,
                    new_cart: cart,
                    unavailable_products: unavailableProducts
                }
            } else {
                return {
                    message: 'No se pudo realizar la compra por falta de stock.',
                    unavailable_products: unavailableProducts
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
}