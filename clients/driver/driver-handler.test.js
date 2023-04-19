'use strict';

const { pickupOrder, droppedOff } = require('./handler');
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

describe('Test Driver sockets', () => {
  test('Simulates pickup, emits in-transit', async () => {
    pickupOrder(payload)
    setTimeout(() => {
      expect(socket.emit).toHaveBeenCalledWith('in-transit', payload)
      expect(console.log).toHaveBeenCalledWith(`DRIVER: picked up ${payload.orderId}`)
    }, 2500);
  })

  test('Simulates delivery, emits delivered', async () => {
    droppedOff(payload)
    setTimeout(() => {
      expect(socket.emit).toHaveBeenCalledWith('delivered', payload)
      expect(console.log).toHaveBeenCalledWith(`DRIVER: delivered ${payload.orderId}`)
    }, 2500);
  })
})