import { List, Map } from 'immutable';

// Allow input entries to be a regular JavaScript array (or anything iterable).
// setEntries will ensure that it is an Immutable List by the time it's in the
// state tree.

export function setEntries(state, entries) {
  return state.set('entries', List(entries));
}

// Merge update into the old state, where teh two entries are put in one List,
// and the rest in the new version of entries.

export function next(state) {
  const entries = state.get('entries');

  return state.merge({
    vote: Map({pair: entries.take(2)}),
    entries: entries.skip(2)
  });
}


export function vote(state, entry) {
  return state.updateIn(
    ['vote', 'tally', entry],
    0,
    tally => tally + 1
  );
}
