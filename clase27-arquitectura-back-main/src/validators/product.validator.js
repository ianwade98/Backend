import ProductsDao from "../dao/products.dao.js";

class ProductValidator{
    async getProducts({page, limit, sort, category, status}){
        const sortValidValues = [-1, 1, '-1', '1']
        let query = {};
        
        if(category || status){
            query = {category} || {status}
        }

        if(limit) if(isNaN(limit)) throw new Error('El límite debe ser un número mayor a 0');

        if(page) if(isNaN(page) || page <= 0) throw new Error('La página debe ser un número mayor a 0');

        const options = {page: page || 1, limit: limit || 10}
        
        if(sortValidValues.includes(sort)){
            options.sort = { price: sort }
            return await ProductsDao.getAll( query, options )
        }else{
            if(sort) throw new Error('Sort values can only be 1 or -1')
        }
        const products = await ProductsDao.getAll( query, options );
        return products;
    }

    async getProductByID(id){
        if(!id) throw new Error('Se requiere el ID del producto.');

        const product = await ProductsDao.getByID(id)
        return product;
    }

    async createProduct({title, description, code, price, stock, category, thumbnails}){
        if( !title ) throw new Error('Se requiere el título del producto.');
        if( !description ) throw new Error('Se requiere la descripción del producto.');
        if( !code ) throw new Error('El código es requerido');
        if( !price ) throw new Error('El precio es requerido');
        if( !stock ) throw new Error('El stock es requerido');
        if( !category ) throw new Error('La categoría es requerida');	

        const product = ProductsDao.create({title, description, code, price, stock, category, thumbnails});
        return product;
    }

    async updateProduct(id, {title, description, code, price, stock, category, thumbnails}){
        if(!id) throw new Error('El ID del producto es requerido.');

        const product = await ProductsDao.update(id, {title, description, code, price, stock, category, thumbnails});
        return product;
    }

    async deleteProduct(id){
        if(!id) throw new Error('El ID del producto es requerido.');

        const product = await ProductsDao.delete(id);
        return product;
    }
}

export default new ProductValidator();