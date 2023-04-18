'use strict';

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

    confirmedDelivery();
    eventEmitter.emit('delivered', payload);

    // expect(jest.spyOn(global.console, 'log')).toHaveBeenCalled();
    
    expect(jest.spyOn(eventEmitter, 'on')).toHaveBeenCalledWith('delivered', expect.objectContaining({
      store: 'test'
    }));
  })
})