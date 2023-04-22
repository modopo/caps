'use strict';

const Queue = require('./lib/queue');
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3001;
const io = new Server(PORT);

let driverQueue = new Queue();
let vendorQueue = new Queue();

let caps = io.of('/caps');
caps.on('connection', (socket) => {

  socket.on('join', (payload) => {
    socket.join(payload.store);
    console.log("JOINED ROOM:", payload.store);
  });

  socket.on('pickup', (payload) => {
    logEvent('pickup', payload);
    let details = generateOrder('pickup', payload);
    let clientSpecificPickupQueue = driverQueue.read(details.clientId);

    if (clientSpecificPickupQueue) {
      clientSpecificPickupQueue.store(details.messageId, details);
    } else {
      clientSpecificPickupQueue = new Queue();
      clientSpecificPickupQueue.store(details.messageId, details);
      driverQueue.store(payload.store, clientSpecificPickupQueue);
    }

    socket.broadcast.emit('pickup', payload);
  });

  socket.on('in-transit', (payload) => {
    logEvent('in-transit', payload);
    caps.to(payload.store).emit('in-transit', payload);
  });

  socket.on('delivered', (payload) => {
    logEvent('delivered', payload);
    caps.to(payload.store).emit('delivered', payload)
  });

  socket.on('received', (payload) => {
    console.log("This is the vendor queue BEFORE: ",vendorQueue);
    console.log("This is the driver queue BEFORE: ", driverQueue);
    
    let removed = driverQueue.data[payload.store].remove(payload.orderId);
    let vendorSpecificDeliveredQueue = vendorQueue.read(removed.clientId);

    if(vendorSpecificDeliveredQueue) {
      vendorSpecificDeliveredQueue.store(removed.messageId, removed);
    } else {
      vendorSpecificDeliveredQueue = new Queue();
      vendorSpecificDeliveredQueue.store(removed.messageId, removed);
      vendorQueue.store(payload.store, vendorSpecificDeliveredQueue);
    }

    console.log("This is the vendor queue AFTER: ",vendorQueue);
    console.log("This is the driver queue AFTER: ", driverQueue);
    
    caps.to(payload.store).emit('received', generateOrder('received', payload));
  })

  socket.on('getAll', (payload) => {
    if (payload.queue === 'driverQueue') {
      Object.keys(driverQueue.data).forEach(store => {
        Object.keys(driverQueue.read(store).data).forEach(newPayload => {
          socket.emit('pickup', driverQueue.data[store].data[newPayload].order);
        })
      });
    } else if (payload.queue = 'vendorQueue') {
      Object.keys(vendorQueue.data).forEach(store => {
        Object.keys(vendorQueue.read(store).data).forEach(newPayload => {
          socket.emit('delivered', vendorQueue.data[store].data[newPayload].order);
        })
      });
    }
  });
});

function logEvent(eventName, payload) {
  let log = {
    event: eventName,
    time: new Date(),
    payload: payload
  }

  console.log("EVENT:", log);
}

function generateOrder(event, payload) {
  let newPayload = {
    event: event,
    messageId: payload.orderId,
    clientId: payload.store,
    order: payload
  }

  return newPayload;
}