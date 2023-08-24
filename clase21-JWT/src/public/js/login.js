const $ = (item) => document.querySelector(`${item}`);

const form = $('#form-login');

form.addEventListener('submit', e => {
    e.preventDefault();

    const user = {
        email: form.email.value,
        password: form.password.value
    }

    fetch('http://localhost:8080/api/session/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    })
    .then(data => {
        if(data.ok == true) {
            window.location = '/products'
        } else {
            alert('Email o contraseña invalidos')
        }
    });
})