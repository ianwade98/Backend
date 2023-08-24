import { renderTable } from './render/renderTable.js'

const $ = (item) => document.querySelector(`${item}`);


const productsContainer = $('#products-container');
const btnOpenForm = $('#btn-open-form');
const btnCloseForm = $('#btn-close-form');
const formNewProduct = $('#form-new-product');
const containerForm = $('#container-form');

const socket = io();

const urlProducts = 'http://localhost:8080/api/products'

const HandleActiveForm = (element, form) => {
    element.addEventListener('click', () => {
        form.classList.toggle('hidden');
    });
};

HandleActiveForm(btnCloseForm, containerForm);
HandleActiveForm(btnOpenForm, containerForm);


formNewProduct.addEventListener('submit', async e => {
    e.preventDefault();

    let product = {
        title: formNewProduct.title.value,
        description: formNewProduct.description.value,
        code: formNewProduct.code.value,
        price: formNewProduct.price.value,
        status: formNewProduct.status.checked,
        stock: formNewProduct.stock.value,
        category: formNewProduct.category.value
    }

    if(!(
        product.title &&
        product.description &&
        product.code &&
        product.price &&
        product.stock &&
        product.category
    )) {
        alert('Todos los campos son requeridos')
    } else {
        await fetch(urlProducts, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        }).then(async data => {
            await socket.emit('get-products', product)
            formNewProduct.reset()
            alert('Producto añadido con éxito');
            containerForm.classList.remove('hidden');
        })
    }
});




socket.on('get-products', data => {
    renderTable(data, productsContainer, true);
});