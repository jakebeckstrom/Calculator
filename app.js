var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const WebSocket = require('ws');

var app = express();

const wss = new WebSocket.Server({ noServer: true });

app.use(express.static(path.join(__dirname, 'calculator/build')))

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

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/calculator/build/index.html'))
  })


  const PORT = process.env.PORT || 3000

  const server = app.listen(PORT, () => {
    console.log(`Now listening on port  ${PORT}`) 
  })
  server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, socket => {
      wss.emit('connection', socket, request);
    });
  });

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
