const urlProduct = 'http://localhost:8080/api/products';
const socket = io();

export const deleteProduct = () => {
    const btnDeleteProduct = document.querySelectorAll('.btn-delete-product')
    btnDeleteProduct.forEach((e, i) => {
        btnDeleteProduct[i].addEventListener('submit', (e) => {
            e.preventDefault()

            fetch(`${urlProduct}/${e.target.id}`, {
                method: 'DELETE',
            }).then(async data => {
                await socket.emit('get-products', data)
                alert('Producto eliminado')
            })
        })
    })
};