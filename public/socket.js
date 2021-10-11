const socket = io()
const chat = document.querySelector('form');
const message = document.querySelector('input');
const chatPanel = document.querySelector('div.chat')


const name = prompt ('What is your name?')
const welcome = document.createElement('div');
welcome.classList.add('text-center')
welcome.innerText = "You Joined";
chatPanel.appendChild(welcome);
socket.emit('new-user',name);



chat.addEventListener('submit', event => {
    event.preventDefault();
    const div = document.createElement('div');
    div.classList.add('text-end')
    div.innerText = `You : ${message.value}`
    socket.emit('send-message', message.value)
    chatPanel.appendChild(div);
    message.value = ''
})

socket.on('chat', data => {
    const div = document.createElement('div');
    div.classList.add('text-start')
    div.innerText = `${data.name} : ${data.message}`
    chatPanel.appendChild(div);
  })

socket.on('user-connected', name =>{

    const div = document.createElement('div');
    div.classList.add('text-center')
    div.innerText = `${name} Joined`
    chatPanel.appendChild(div);

})

socket.on('disconnected', name =>{

    const div = document.createElement('div');
    div.classList.add('text-center')
    div.innerText = `${name} disconnected`
    chatPanel.appendChild(div);

})



