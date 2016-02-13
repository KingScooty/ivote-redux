// export default function(store) {
//   return function(socket) {
//     return function(next) {
//       return function(action) {
//         return next(action);
//       }
//     }
//   }
// }

// Currying baby.

export default socket => store => next => action => {
  // Avoid emitting client only actions to server
  // (like SET_STATE)
  if (action.meta && action.meta.remote) {
    socket.emit('action', action);
  }
  console.log('in middleware', action);
  return next(action);
}
