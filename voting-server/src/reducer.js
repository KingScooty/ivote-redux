import {setEntries, next, vote, INITIAL_STATE} from './core';

export default function reducer(state = INITIAL_STATE, action) {
  // Figure out which function too call and call it

  switch(action.type) {
  case 'SET_ENTRIES':
    return setEntries(state, action.entries);
  case 'NEXT':
    return next(state);
  case 'VOTE':
    return vote(state, action.entry);
  }

  // If unknown action, simply return the state back
  return state;
}
