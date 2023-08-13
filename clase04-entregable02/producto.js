const Contenedor = require('./desafio.js')

const start = async function () {
    let contenedor = new Contenedor('productos.txt')
    contenedor.save({
        title: "smartphone",
        price: 300,
        thumbnail: "shorturl.at/ehnEN"
    })

    contenedor.save({
        title: "notebook",
        price: 1000,
        thumbnail: "shorturl.at/hlsAV"
    })

    contenedor.save({
        title: "gps",
        price: 100,
        thumbnail: "shorturl.at/hDMNQ"
    })
    console.log(contenedor.getById(1));
    console.log(contenedor.getById(5));
    console.log(contenedor.getAll());
    console.log(contenedor.deleteById(1));
    console.log(contenedor.deleteById(6));
    console.log(contenedor.getAll());
    contenedor.deleteAll();
    console.log(contenedor.getAll());
};

start();