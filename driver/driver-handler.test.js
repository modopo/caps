'use strict';

const { pickupOrder, droppedOff } = require('./handler');
const { eventEmitter } = require('../eventPool');

jest.mock('../eventPool', () => ({
  on: jest.fn(),
  emit: jest.fn()
}));

describe('Tesing driver events', () => {
  test('Pickup order should emit in-transit event', () => {
    console.log = jest.fn();

    expect(eventEmitter.on).toHaveBeenCalledTimes(1);

  });

  xtest('Confirmed delivery should fire when listening for delivered', () => {
    const testOrder = {
      event: 'delivered',
      payload: {
        store: 'test',
        orderId: 'abc123',
        customer: 'test',
        address: 'test',
      },
    };

    confirmedDelivery();
    expect(jest.spyOn(eventEmitter, 'on')).toHaveBeenCalledWith('delivered', () => onfirmedDelivery());
  })
})