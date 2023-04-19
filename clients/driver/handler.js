'use strict';

const socket = require('../socket');

function pickupOrder() {
  socket.on('pickup', (payload) => {
    setTimeout(() => {
      console.log(`DRIVER: picked up ${payload.orderId}`)
      socket.emit('join', payload)
      socket.emit('in-transit', payload)
    }, 2000)
  })
}

function droppedOff() {
  socket.on('in-transit', (payload) => {
    setTimeout(() => {
      console.log(`DRIVER: delivered up ${payload.orderId}`)
      socket.emit('delivered', payload);
    }, 2000)
  })
}

module.exports = {
  pickupOrder,
  droppedOff
}