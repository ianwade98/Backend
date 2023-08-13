class ProductManager {
    constructor() {
        this.products = [];
    }

    addProduct(productObj) {
        
        if (Object.values(productObj).includes("") || Object.values(productObj).includes(null)) {
            console.log("La informacion es erronea");
        } else {
            
            const repiteCodigo = this.products.find((prod) => prod.codigo === productObj.codigo);
            if (repiteCodigo) {
                console.log("El codigo " + productObj.codigo + " ya existe");
            } else {
                
                this.products.push({ ...productObj, id: this.products.length + 1 });
                console.log("Producto agregado");
            }
        }
    }

    getProducts() {
        console.log("Productos:"); 
        console.log(this.products); 
        return this.products;
    }

    getProductByID(id) {
        let found = this.products.find((prod) => prod.id === id);
        if (found) {
            console.log(found); 
            return found;
        } else {
            console.log("El producto no existe");
        }
    }
}

// Clase para construir un producto
class Product {
    constructor(titulo, descriction, precio, imagen, codigo, stock) {
        this.titulo = titulo;
        this.descripcion = descriction;
        this.precio = precio;
        this.imagen = imagen;
        this.codigo = codigo;
        this.stock = stock;
    }
}

// Pruebas

// crea el array productos[] (vacio)
const productos = new ProductManager();

// se llama a getproducts que devuelve el array vacio []
productos.getProducts(); 

// se crea un producto para agregar al array vacio creado anteriormente
let producto_nuevo = new Product("Chomba Lacoste", "Para Hombre Polo Classic Fit Algodón Azul", 22.000, "https://http2.mlstatic.com/D_NQ_NP_835018-MLA51921242320_102022-O.webp", "ch700", 10);

// se añade el producto al array
productos.addProduct(producto_nuevo);

// Se llama a getProduct que deverá devolver el producto recien agregado
productos.getProducts(); 

// se añade un nuevo producto igual al anterior debe arrojar error si el mismo ya existe
producto_nuevo = new Product("Chomba Lacoste", "Para Hombre Polo Classic Fit Algodón Azul", 22.000, "https://http2.mlstatic.com/D_NQ_NP_835018-MLA51921242320_102022-O.webp", "ch700", 10);
// en caso de no existir lo agregamos
productos.addProduct(producto_nuevo);

// llamo a los productos por ID
// codigo existente lo muestra
productos.getProductByID(1);
//codigo inexistentemuestra "el producto no existe
productos.getProductByID(2);