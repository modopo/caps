'use strict';

const { newOrder, confirmedDelivery } = require('./handler');
const socket = require('socket.io-client');

const payload = {
  event: 'pickup',
  time: new Date(),
  payload: {
    store: 'test',
    orderId: '123',
    customer: 'test2',
    address: 'test3'
  }
}

console.log = jest.fn();

describe('Testing vendor events', () => {
  test('Confirmed delivery', () => {
    confirmedDelivery(payload);

    setTimeout(() => {
      expect(console.log).toHaveBeenCalledWith('VENDOR: Thank you for delivering 123')
    }, 2500);
  });
})