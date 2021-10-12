const socket = io()

const username = document.querySelector('#name');
const contact = document.querySelector('input[name="contact"]');
const nameForm = document.querySelector('#name-form');



const chat = document.querySelector('form.message-form');
const message = document.querySelector('input[name="message"]');


const chatPanel = document.querySelector('div.chat')

var joined = false;

nameForm.addEventListener('submit', event => {
    event.preventDefault();
    
    socket.emit('new-user', username.value);
    socket.emit('contact', contact.value);
    const welcome = document.createElement('div');
    welcome.classList.add('text-center')
    welcome.classList.add('join')
    welcome.innerText = "You Joined";
    chatPanel.appendChild(welcome);

    document.querySelector("#submit").disabled = false;

})

socket.on('chat', data => {

    const div = document.createElement('div');
    div.classList.add('row')
    div.classList.add('ms-0')
    div.classList.add('me-0')
    div.innerHTML = `

    <div class="me-auto card you shadow">
    <span class="message">${data.message}</span>
    </div>
    `;
    
    chatPanel.appendChild(div);

})


chat.addEventListener('submit', event => {
    event.preventDefault();

    if (message.value.length > 1000) {
        message.value = message.value.substring(0, 3000)
    }

    const div = document.createElement('div');
    div.classList.add('row')
    div.classList.add('me-0')
    div.innerHTML = `

    <div class="ms-auto card you shadow">
    <span class="message">${message.value}</span>
    </div>
    `

    if (!message.value == '') {

        socket.emit('send-message', {
            message: message.value,
            self: username.value
        })
        chatPanel.appendChild(div);
        message.value = ''
    }

})



socket.on('user-connected', name => {
    console.log(name);
    const div = document.createElement('div');
    div.classList.add('text-center')
    div.classList.add('join')
    div.innerText = `${name} Joined`
    chatPanel.appendChild(div);
})


socket.on('disconnected', name => {

    const div = document.createElement('div');
    div.classList.add('text-center')
    div.classList.add('join')
    div.innerText = `${name} left`
    chatPanel.appendChild(div);

})
