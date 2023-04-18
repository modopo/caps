'use strict';

const { log } = require('console');
const { eventEmitter } = require('../eventPool');
const driver = require('./handler');
const { pickupOrder } = require('./handler');

jest.spyOn(eventEmitter, 'emit')
jest.spyOn(eventEmitter, 'on');

beforeEach(() => {
  eventEmitter.emit.mockClear();
  eventEmitter.on.mockClear();
})

xdescribe('Tesing driver events', () => {
  test('Pickup order should emit in-transit event', async () => {
    let order = {
      event: 'in-transit',
      payload: {
        store: 'test',
        orderId: 'abc123',
        customer: 'test',
        address: 'test',
      }
    }

    let spyon = jest.spyOn(driver, pickupOrder);
    
    expect(spyon).toHaveBeenCalledWith(
      'in-transit',
      expect.objectContaining({
        event: 'in-transit',
        payload: order.payload
      })
    )

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