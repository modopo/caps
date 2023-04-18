'use strict';

const { eventEmitter, eventPool } = require('./eventPool');


eventPool.forEach(event => {
  eventEmitter.on(event, (order) => logEvent(order));
})

function logEvent(event) {
  let log = {
    event: event.event,
    time: new Date(),
    payload: event.payload
  }
  console.log("EVENT:", log);
}

require('./driver');
let vendor = require('./vendor');