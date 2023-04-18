'use strict';

const { eventEmitter } = require('../eventPool');

function pickupOrder() {
  eventEmitter.on('pickup', (payload) => {
    setTimeout(() => {
      console.log(`DRIVER: picked up ${payload.orderId}`)
      eventEmitter.emit('in-transit', payload)
    }, 2000)
  })
}

function droppedOff() {
  eventEmitter.on('in-transit', (payload) => {
    setTimeout(() => {
      console.log(`Driver: delivered up ${payload.orderId}`)
      eventEmitter.emit('delivered', payload);
    }, 2000)
  })
}

module.exports = {
  pickupOrder,
  droppedOff
}