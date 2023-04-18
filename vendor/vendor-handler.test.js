'use strict';

const { eventEmitter } = require('../eventPool');
const { newOrder, confirmedDelivery } = require('./handler');

jest.spyOn(eventEmitter, 'emit');

describe('Tesing vendor events', () => {
  test('newOrder with a store name should generate correct payload', () => {
    let storename = 'test';
    newOrder(storename);

    expect(eventEmitter.emit).toBeCalledWith('pickup',
      expect.objectContaining({
        store: storename
      }));
  });

  test('Confirmed delivery should fire when listening for delivered', () => {
    const payload = {
      store: 'test',
      orderId: 'abc123',
      customer: 'test',
      address: 'test'
    };

    jest.spyOn(console, 'log');
    confirmedDelivery();
    eventEmitter.emit('delivered', payload);

    expect(console.log).toHaveBeenCalledWith("VENDOR: Thank you for delivering abc123");
  })
})