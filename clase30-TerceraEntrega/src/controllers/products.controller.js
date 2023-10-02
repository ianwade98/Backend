import DAO from '../persistence/DAOs/factory.js';

const productsManager = DAO.products;

class ProductsController {
    getProducts = async (req, res) => {
        try {
            const results = await productsManager.getProducts(req.query);
            if (results) {
                res.json({ message: 'Productos encontrados.', results })
            } else {
                res.json({ message: 'No hay productos disponibles.' })
            }
        } catch (error) {     
            res.status(500).json({ message: error.message })
        }
    }

    getMockingProducts = async (req, res) => {
        try {   
            const mockingProducts = await productsManager.getMockingProducts();
            if (mockingProducts) {
                res.json({ message: 'Productos falsos.', results: mockingProducts })
            }
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    getProductById = async (req, res) => { 
        try {
            const { productId } = req.params;
            const productFound = await productsManager.getProductById(productId);
            if (productFound) {
                res.json({ message: 'Producto encontrado.', product: productFound })
            } else {
                res.json({ message: 'Producto no encontrado.' })
            }
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    addProduct = async (req, res) => { 
        try {
            const newProduct = req.body;
            const addedProduct = await productsManager.addProduct(newProduct);
            if (addedProduct) {
                res.json({ message: 'Producto agregado exitosamente.', product: addedProduct })
            } else {
                res.json({ message: 'El producto no se ha podido agregar.' })
            }
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    updateProduct = async (req, res) => {
        try {
            const { productId } = req.params;
            const newValuesObject = req.body;
            const updatedProduct = await productsManager.updateProduct(productId, newValuesObject);
            if (updatedProduct) {
                res.json({ message: 'Se ha actualizado el producto exitosamente.', product: updatedProduct })
            } else {
                res.json({ message: 'El producto no se ha podido actualizar.' })  
            }    
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    deleteProduct =  async (req, res) => {
        try {
            const { productId } = req.params;
            const deletedProduct = await productsManager.deleteProduct(productId);
            if (deletedProduct) {
                res.json({ message: 'Se ha eliminado el producto exitosamente.', product: deletedProduct })
            } else {
                res.json({ message: 'El producto no se ha podido eliminar.' })
            }
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}

export default new ProductsController();