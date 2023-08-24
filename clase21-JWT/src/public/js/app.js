const $ = (item) => document.querySelector(`${item}`)

const filas = document.querySelectorAll('.fila')

filas.forEach((f, i) => {
    filas[i].addEventListener('click', (e) => {
        let id = e.target.parentElement.id;
        window.location.href = `/products/${id}`
    })
})