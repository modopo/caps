'use strict';

const socket = require('../socket');
const Chance = require('chance');
const chance = new Chance();

function newOrder(storeName) {
  let payload = {
    store: storeName,
    orderId: chance.guid(),
    customer: chance.name(),
    address: chance.address()
  }

  socket.emit('join', payload);
  socket.emit('pickup', payload);
}

function confirmedDelivery() {
  socket.on('delivered', (payload) => {
      console.log(`VENDOR: Thank you for delivering ${payload.orderId}`);
  })
}

module.exports = {
  newOrder,
  confirmedDelivery
}