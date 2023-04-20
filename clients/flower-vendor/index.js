'use strict';

const vendor = require('./handler');

vendor.getAll();
vendor.newOrder('flower');
vendor.newOrder('flower');
vendor.confirmedDelivery();
