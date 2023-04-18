'use strict';

const { pickupOrder, droppedOff } = require('./handler');
const { eventEmitter } = require('../eventPool');

jest.spyOn(eventEmitter, 'emit');

describe('Tesing driver events',  () => {
  test('Pickup order should emit in-transit event', async () => {
    let payload = {
      orderId: 'abc'
    }

    jest.spyOn(console, 'log');
    pickupOrder();
    eventEmitter.emit('pickup', payload);

    expect(console.log).toHaveBeenCalledWith("DRIVER: picked up abc")
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