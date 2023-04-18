'use strict';

const { eventEmitter } = require('../eventPool');
const Chance = require('chance');
const chance = new Chance();

function newOrder(storeName) {
  let order = {
    store: storeName,
    orderId: chance.guid(),
    customer: chance.name(),
    address: chance.address()
  }

  eventEmitter.emit('pickup', { event: 'pickup', payload: order });
}

function confirmedDelivery() {
  eventEmitter.on('delivered', (order) => {
      console.log(`VENDOR: Thank you for delivering ${order.payload.orderId}`);
  })
}

module.exports = {
  newOrder,
  confirmedDelivery
}