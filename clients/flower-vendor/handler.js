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

function getAll() {
  socket.emit('getAll', { queue: 'vendorQueue' } )
}

module.exports = {
  newOrder,
  confirmedDelivery,
  getAll
}