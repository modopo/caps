'use strict';

const { eventEmitter } = require('../eventPool');

function pickupOrder() {
  eventEmitter.on('pickup', (order) => {
    setTimeout(() => {
      console.log(`DRIVER: picked up ${order.payload.orderId}`)
      eventEmitter.emit('in-transit', {
        event: 'in-transit',
        payload: order.payload
      })
    }, 2000)
  })
}

function droppedOff() {
  eventEmitter.on('in-transit', (order) => {
    setTimeout(() => {
      console.log(`Driver: delivered up ${order.payload.orderId}`)
      eventEmitter.emit('delivered', {
        event: 'delivered',
        payload: order.payload
      });
    }, 2000)
  })
}

module.exports = {
  pickupOrder,
  droppedOff
}