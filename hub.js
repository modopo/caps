'use strict';

const { eventEmitter, eventPool } = require('./eventPool');

const logEvent = (eventName) => (order) => {
  let log = {
    event: eventName,
    time: new Date(),
    payload: order
  }
  console.log("EVENT:", log);
}

eventPool.forEach(event => {
  eventEmitter.on(event, logEvent(event));
})

require('./driver');
require('./vendor');