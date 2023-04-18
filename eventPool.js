'use strict';

const Event = require('events');
const eventEmitter = new Event();

const eventPool = [
  'pickup',
  'in-transit',
  'delivered'
]

module.exports = {
  eventEmitter,
  eventPool
};