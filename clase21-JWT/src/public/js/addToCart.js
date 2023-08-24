const buttonAddToCart = $('.button-add-to-cart');

const urlCarts = 'http://localhost:8080/api/carts';

(async () => {

    let idCart;

    await fetch(urlCarts)
    .then(data => data.json())
    .then(data => {
        idCart = data.payload[0]._id
    })

    buttonAddToCart.addEventListener('click', async (e) => {
        let idProduct = e.target.id;

        await fetch(`${urlCarts}/${idCart}/product/${idProduct}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(data => {
            if(data.status === 201) {
                alert('Producto añadido al carrito')
            } else {
                alert('Algo salió mal')
            }
        })
    })

})()