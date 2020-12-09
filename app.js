const express = require('express');
const WebSocket = require('ws');

const app = express();

const wss = new WebSocket.Server({ noServer: true });

const history = [];

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(data) {
      if (data === 'open') {
        ws.send(JSON.stringify(history));
      } else {
        if (history.length === 10) {
          history.pop();
          history.unshift(data);
        } else {
          history.unshift(data);
        }
      }
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(history));
        }
      })
    })
  });

  app.get('/', function(req, res) {
    res.send("ping received");
  });

  const PORT = process.env.PORT || 3000;
  const server = app.listen(PORT, () => { console.log(`Now listening on port  ${PORT}`); })
  server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, socket => {
      wss.emit('connection', socket, request);
    });
  });

module.exports = app;
