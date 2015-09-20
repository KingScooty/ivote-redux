import { List, Map } from 'immutable';

/*

Initial:
state = {
  entries: ['Trainspotting', '28 Days Later', 'Sunshine']
}
getWinners returns [];

state = {
  pair: ['Trainspotting', '28 Days Later'],
  entries: ['Sunshine']
}

getWinners returns ['Trainspotting', '28 Days Later']

state = {
  pair: ['Trainspotting', '28 Days Later'],
  tally: {
    'Trainspotting': 4,
    '28 Days Later': 2
  },
  entries: ['Sunshine']
}

getWinners returns [Trainspotting]

*/

function getWinners(vote) {
  if (!vote) return [];
  const [a, b] = vote.get('pair');
  const aVotes = vote.getIn(['tally', a], 0); // returns value or 0;
  const bVotes = vote.getIn(['tally', b], 0); // returns value or 0;
  if      (aVotes > bVotes)  return [a];
  else if (aVotes < bVotes)  return [b];
  else                       return [a, b];
}

// Allow input entries to be a regular JavaScript array (or anything iterable).
// setEntries will ensure that it is an Immutable List by the time it's in the
// state tree.

export function setEntries(state, entries) {
  return state.set('entries', List(entries));
}

// Merge update into the old state, where teh two entries are put in one List,
// and the rest in the new version of entries.

export function next(state) {
  const entries = state.get('entries')
                       .concat(getWinners(state.get('vote')));

/**

We could have just returned Map({winner: entries.first()}) here. But instead we still take the old state as the starting point and explicitly remove 'vote' and 'entries' keys from it. The reason for this is future-proofing: At some point we might have some unrelated data in the state, and it should pass through this function unchanged. It is generally a good idea in these state transformation functions to always morph the old state into the new one instead of building the new state completely from scratch.

 */

  if (entries.size === 1) {
    return state.remove('vote')
                .remove('entries')
                .set('winner', entries.first());
  } else {
    return state.merge({
      vote: Map({pair: entries.take(2)}),
      entries: entries.skip(2)
    });
  }
}


export function vote(state, entry) {
  return state.updateIn(
    ['vote', 'tally', entry],
    0,
    tally => tally + 1
  );
}
