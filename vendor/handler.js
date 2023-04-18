'use strict';

const { eventEmitter } = require('../eventPool');
const Chance = require('chance');
const chance = new Chance();

function newOrder(storeName) {
  let payload = {
    store: storeName,
    orderId: chance.guid(),
    customer: chance.name(),
    address: chance.address()
  }

  eventEmitter.emit('pickup', payload);
}

function confirmedDelivery() {
  eventEmitter.on('delivered', (payload) => {
      console.log(`VENDOR: Thank you for delivering ${payload.orderId}`);
  })
}

module.exports = {
  newOrder,
  confirmedDelivery
}