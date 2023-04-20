'use strict';

const vendor = require('./handler');

vendor.getAll();
vendor.newOrder('widget');
vendor.newOrder('widget');
vendor.confirmedDelivery();
