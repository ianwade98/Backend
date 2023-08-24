const $ = (item) => document.querySelector(`${item}`);

const form = $('#form-logout');

if(form) {
    form.addEventListener('submit', e => {
        e.preventDefault();
    
        fetch('http://localhost:8080/api/session/logout', {
            method: 'DELETE',
        }).then(async data => {
            if(data.ok == true && data.status == 200) {
                alert('Sesion cerrada');
                window.location = '/'
            }
        });
    });
};