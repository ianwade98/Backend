import { renderMessages } from './render/renderMessages.js';


const $ = (item) => document.querySelector(`${item}`);
const socket = io();

const formMessages = $('#form-messages');
const messagesContainer = $('#messages-container');

const urlMessages = 'http://localhost:8080/api/messages';

(async () => {

    if(formMessages && messagesContainer) {
        let user;
        Swal.fire({
            title:"Registrate:",
            input:"text",
            text:" Ingresa tu email:",
            inputValidator: (value) => {
                return !value && 'Necesitas un email para usar el chat'
            },
            allowOutsideClick: false
        }).then (result =>{
            user=result.value
        })

        formMessages.addEventListener('submit', async e => {
            e.preventDefault();

            let message = {
                user,
                message: formMessages.message.value
            }

            await fetch(urlMessages, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(message)
            }).then(data => {
                formMessages.reset()
            });

            socket.emit('get-messages', message);

        })

        socket.on('get-messages', data => {
            renderMessages(data, messagesContainer);
        });
    }

})()