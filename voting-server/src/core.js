import {List, Map} from 'immutable';

export function setEntries(state, entries) {
  return state.set('entries', List(entries));
}

export function next(state) {
  const entries = state.get('entries');

  return state.merge({
    vote: Map({pair: entries.take(2)}),
    entries: entries.skip(2)
  })
}

/*
state = {
  vote: {
    pair: ['Trainspotting', '28 Days Later']
  },
  entries: []
}

updateIn, gotes into vote.tally.trainspotting, created the keys if they don't already exist, and initialises the final key with 0 if it's unset.
It then runs the function to update the value.

state = {
  vote: {
    pair: ['Trainspotting', '28 Days Later'],
    tally: {
      'Trainspotting': 1
    }
  },
  entries: []
}

Clever!

*/

export function vote(state, entry) {
  return state.updateIn(
    ['vote', 'tally', entry],
    0,
    tally => tally + 1
  )
}
