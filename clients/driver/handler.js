'use strict';

const socket = require('../socket');

function pickupOrder() {
  socket.on('pickup', (payload) => {
    setTimeout(() => {
      console.log(`DRIVER: picked up ${payload.orderId}`)
      socket.emit('join', payload);
      socket.emit('received', payload);
      socket.emit('in-transit', payload);
    }, 2000)
  })
}

function droppedOff() {
  socket.on('in-transit', (payload) => {
    getAll();
    setTimeout(() => {
      console.log(`DRIVER: delivered up ${payload.orderId}`)
      socket.emit('delivered', payload);
    }, 2000)
  })
}

function getAll() {
  socket.emit('getAll', { queue: 'driverQueue' } )
}

module.exports = {
  pickupOrder,
  droppedOff,
  getAll
}