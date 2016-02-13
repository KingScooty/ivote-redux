import Server from 'socket.io';

export default function startServer(store) {
  const io = new Server().attach(8090);

  // This emits the ENTIRE store. i.e. the ENTIRE
  // state of the app. For small apps this is okay,
  // but for larger ones, a subset of the store would be
  // emitted to the client.

  store.subscribe(
    () => io.emit('state', store.getState().toJS())
  );

/*
  // Equivalent to:
  store.subscribe(function() {
    io.emit('state', store.getState().toJS());
  });
*/

  // Send state/store to client on connection.
  io.on('connection', (socket) => {
    socket.emit('state', store.getState().toJS());

    // Recieve actions (votes) from client
    // Security alert: any client can dispatch *any* action.
    // This would need to be locked down to specific user actions
    // for production.
    // http://vertx.io/docs/vertx-web/java/#_securing_the_bridge
    socket.on('action', store.dispatch.bind(store));
  })

}
