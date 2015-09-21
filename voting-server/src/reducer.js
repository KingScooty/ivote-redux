import { setEntries, next, vote, INITIAL_STATE } from './core';

export default function reducer(state = INITIAL_STATE, action) {
  switch(action.type) {
  case 'SET_ENTRIES':
    return setEntries(state, action.entries)
  case 'NEXT':
    return next(state)
  case 'VOTE':
    return vote(state, action.entry)
  }

  // If the reducer doesn't recognise the action, it just returns the
  // current state.
  return state;
}
