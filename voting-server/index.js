import makeStore from './src/store';
import startServer from './src/server';

/*
1. A client sends an action to the server.
2. The server hands the action to the Redux Store.
3. The Store calls the reducer and the reducer executes the logic related to the action.
4. The Store updates its state based on the return value of the reducer.
5. The Store executes the listener function subscribed by the server.
6. The server emits a 'state' event.
7. All connected clients - including the one that initiated the original action - receive the new state.
*/

export const store = makeStore();
startServer(store);

store.dispatch({
  type: 'SET_ENTRIES',
  entries: require('./entries.json')
});
store.dispatch({type: 'NEXT'});
