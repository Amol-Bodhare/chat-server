const express = require('express');
var cors = require('cors')
const webSocket = require('ws');
const app = express()
let activeUsers = new Map()

const wss = new webSocket.Server({ port: 8082 });

wss.on("connection", ws => {
  console.log('WS connected')
  
  const id = wss.getUniqueID();

  ws.on("message", msg => {
    const message = JSON.parse(msg);
    const firstName = message.name;

    if (firstName) {
      activeUsers.set(id, {
        id: id,
        name: firstName
      })
      console.log(`[message] Data received from server Name: ${firstName}`);
  
      activeUsers.forEach((user) => {
        console.log('Users', user);
      })

      ws.send(JSON.stringify([...activeUsers]));
    } else {

      console.log('Different message')
    }

  })
})
app.use(cors())

app.get('/', (req, res) => {
  res.json({msg:'Hello World!'});
})

wss.getUniqueID = function () {
  function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4() + '-' + s4();
};

// io.on('end', (socket) => {
//   activeUsers.delete(socket.id);
//   socket.disconnect(0);
//   console.log('New Connection', activeUsers);
// });