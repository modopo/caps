'use strict';

const { Server } = require('socket.io');
const PORT = 3001;

const io = new Server(PORT);

const logEvent = (eventName, payload) => {
  let log = {
    event: eventName,
    time: new Date(),
    payload: payload
  }
  console.log("EVENT:", log);
}

let caps = io.of('/caps');
caps.on('connection', (socket) => {

  socket.on('join', (payload) => {
    socket.join(payload.store);
    console.log("JOINED ROOM:", payload.store);
  });

  socket.on('pickup', (payload) => {
    logEvent('pickup', payload);
    socket.broadcast.emit('pickup', payload);
  });

  socket.on('in-transit', (payload) => {
    logEvent('in-transit', payload);
    caps.to(payload.store).emit('in-transit', payload);
  });

  socket.on('delivered', (payload) => {
    logEvent('delivered', payload);
    caps.to(payload.store).emit('delivered', payload)
  });
});