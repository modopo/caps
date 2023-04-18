'use strict';

const { log } = require('console');
const { eventEmitter } = require('../eventPool');
const { newOrder, confirmedDelivery } = require('./handler');

jest.spyOn(eventEmitter, 'emit');
jest.spyOn(eventEmitter, 'on');

beforeEach(() => {
  eventEmitter.emit.mockClear();
  eventEmitter.on.mockClear();
})

describe('Tesing vendor events', () => {
  test('newOrder with a store name should generate correct payload', () => {
    let storename = 'test';
    newOrder(storename);

    expect(eventEmitter.emit).toBeCalledWith('pickup', {
      event: 'pickup',
      payload: expect.objectContaining({
        store: storename
      })
    });
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