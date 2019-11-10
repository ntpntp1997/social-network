// add socketId to array with each userID
export let pushSocketIdToArray = (clients, userId, socketId) => {
  if (clients[userId]) {
    clients[userId].push(socketId);
  } else {
    clients[userId] = [socketId];
  }

  return clients;
};

/**
 *
 * @param {*} clients bien se chua mang socket id
 * @param {*} userId user id se chua mang socket id
 * @param {*} socketId  socket id cua client
 * @param {*} varianble bien du lieu can duoc so sanh
 * @param {*} varIf dieu kien dung cua mang
 */
export let pushSocketIdToArrayWithIf = (
  clients,
  userId,
  socketId,
  varianble,
  varIf
) => {
  if (varianble === varIf) {
    if (clients[varIf]) {
      clients[varIf].push(socketId);
    } else {
      clients[varIf] = [socketId];
    }
  }
  return clients;
};

//notice all user match var if
export let emitNotifyToArrayWithIf = (clients, varIf, io, eventName, data) => {
  clients[varIf].forEach(socketId =>
    io.sockets.connected[socketId].emit(eventName, data)
  );
};

//notice with user id
export let emitNotifyToArray = (clients, userId, io, eventName, data) => {
  clients[userId].forEach(socketId =>
    io.sockets.connected[socketId].emit(eventName, data)
  );
};

// remove socketId to array with each userID
export let removeSocketIdFromArray = (clients, userId, socket) => {
  clients[userId] = clients[userId].filter(socketId => {
    return socketId !== socket.id;
  });
  if (!clients[userId].length) {
    delete clients[userId];
  }
  return clients;
};
// remove socketId to array with each userID
export let removeSocketIdFromArrayWithIf = (clients, varIf, socket) => {
  clients[varIf] = clients[varIf].filter(socketId => {
    return socketId !== socket.id;
  });
  if (!clients[varIf].length) {
    delete clients[varIf];
  }
  return clients;
};
