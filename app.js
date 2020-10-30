const express = require('express');
const socket = require('socket.io');
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

const io = socket(server);

io.on('connection', (socket) => {
    console.log('New Connection', socket.id);

    socket.on('chat', (data) => {
        io.sockets.emit('chat', data);
    })
    socket.on('typing', (data) => {
        io.sockets.emit('typing', data);
    })

});