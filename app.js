const express = require ('express');
const app = express();
const server = require('http').createServer(app);

const io = require('socket.io')(server)


app.use(express.static(__dirname+'/public'))

var users ={};
var contact;


io.on('connection', socket =>{
    console.log('Connected');

    socket.on('contact', contacts =>{
        contact = contacts;
        socket.join(contact);
    })

    socket.on('new-user', name =>{
        users[socket.id] = name;
        io.sockets.in(contact).emit('user-connected', name)
    })

    socket.on('send-message', message =>{
        socket.broadcast.to(contact).emit('chat', {message: message.message, name:users[socket.id], self:message.self})
    })

    socket.on('disconnect',()=>{
        io.sockets.in(contact).emit('disconnected', users[socket.id])
        delete users[socket.id]
    })
})

app.get("/", (req,res)=>{
    res.sendFile(__dirname+"index.html")
})


const PORT = process.env.PORT || 3000;

server.listen(PORT, ()=>{
    console.log(`Server started at port ${PORT}`)
})
