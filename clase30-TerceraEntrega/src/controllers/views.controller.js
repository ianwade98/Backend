import DAO from "../persistence/DAOs/factory.js";

const productsManager = DAO.products;
const cartsManager = DAO.carts;

class ViewsController {
    getProducts = async (req, res) => {
        try {
            const results = await productsManager.getProducts(req.query);
            const products = (results.payload).map(product => {
                return {
                    id: product._id,
                    title: product.title,
                    description: product.description,
                    price: product.price,
                    thumbnail: product.thumbnail,
                    code: product.code,
                    stock: product.stock,
                    category: product.category,
                    status: product.status
                }
            });
            res.render('home', { products })
        } catch (error) {
            console.log(error);
        } 
    }
    
    getRealTimeProducts = (req, res) => { 
        try {
            res.render('realTimeProducts')
        } catch (error) {
            console.log(error);
        }
    }

    getProductsForUser = async (req, res) => {
        try {
            const results = await productsManager.getProducts(req.query);
            const user = { email: req.user.email, name: req.user.firstName, role: req.user.admin ? 'admin' : 'user' };
            if (results.prevLink) {
                results.prevLink = (results.prevLink).replace('api', 'views')
            }
            if (results.nextLink) {
                results.nextLink = (results.nextLink).replace('api', 'views')
            }
            const products = (results.payload).map(product => {
                return {
                    id: product._id.toString(),
                    title: product.title,
                    description: product.description,
                    price: product.price,
                    thumbnail: product.thumbnail,
                    code: product.code,
                    stock: product.stock,
                    category: product.category,
                    status: product.status
                }
            });
            res.render('products', { products, results, user })
        } catch (error) {
            console.log(error);
        }
    }

    getCart = async (req, res) => {
        try {
            const { cartId } = req.params;
            const cart = await cartsManager.getProductsFromCart(cartId);
            const products = (cart[0].products).map(product => {
                return {
                    id: product._id._id.toString(),
                    title: product._id.title,
                    price: product._id.price,
                    thumbnail: product._id.thumbnail,
                    code: product._id.code,
                    quantity: product.quantity,
                    sum: product.quantity * product._id.price
                }
            });
            const sumCart = products.reduce((accumulator, currentValue) => accumulator + currentValue.sum, 0);
            res.render('cart',{ products, cartId, sumCart })
        } catch (error) {
            console.log(error);
        }
    }

    renderLogin = (req, res) => { 
        try {
            res.render('login')
        } catch (error) {
            console.log(error);
        }
    }

    renderRegister = (req, res) => { 
        try {
            res.render('register')
        } catch (error) {
            console.log(error);
        }
    }

    renderErrorRegister = (req, res) => { 
        try {
            res.render('errorRegister')
        } catch (error) {
            console.log(error);
        }
    }

    renderErrorLogin = (req, res) => { 
        try {
            res.render('errorLogin')
        } catch (error) {
            console.log(error);
        }
    }
}

export default new ViewsController();