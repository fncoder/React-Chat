const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });


const connections = []

app.use(express.static(__dirname + '/src'));

app.get('*', function(req, res){
  res.sendfile(__dirname + '/src/index.html');
});

wss.on('connection', (socket, req)=>{

const session = {
  type: 'close',
  status: 'Connected',
  joined: null,
  connections: connections
}


  socket.on('message', data =>{
    
  const clientData = JSON.parse(data);

    if(clientData.type === 'connection'){
      session.joined = clientData.joined;
      connections.push(session.joined)
      clientData.connections = connections
      clientData.status = session.status
    }

    else if(clientData.type === 'message'){
      clientData.time = new Date().toLocaleString()
      clientData.nickname = session.joined
    }

    wss.clients.forEach(client =>{
      client.send(JSON.stringify(clientData));
    });
    
  });

  socket.on('close', ()=>{
    const index = connections.indexOf(session.joined);
    connections.splice(index, 1);

    session.status = 'Disconnected';
    session.connections = connections;

    wss.clients.forEach(client =>{
      client.send(JSON.stringify(session));
    });

  });
});


server.listen(8080, ()=>{
  console.log('Listening on', server.address().port);
});

