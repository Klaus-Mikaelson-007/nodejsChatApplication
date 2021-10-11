const express = require ('express');
const app = express();
const server = require('http').createServer(app);

const io = require('socket.io')(server)


app.use(express.static(__dirname+'/public'))

var users ={};

io.on('connection', socket =>{
    console.log('Connected');
    socket.on('new-user', name =>{
        users[socket.id] = name;
        socket.broadcast.emit('user-connected', name)
    })

    socket.on('send-message', message =>{
        socket.broadcast.emit('chat', {message: message, name:users[socket.id]})
    })

    socket.on('disconnect',()=>{
        socket.broadcast.emit('disconnected', users[socket.id])
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
