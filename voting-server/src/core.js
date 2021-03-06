import {List, Map} from 'immutable';

function getWinners(vote) {
  if (!vote) return [];
  const [a, b] = vote.get('pair');
  const aVotes = vote.getIn(['tally', a], 0);
  const bVotes = vote.getIn(['tally', b], 0);

  if      (aVotes > bVotes) return [a];
  else if (aVotes < bVotes) return [b];
  else                      return [a,b];
}

export const INITIAL_STATE = Map();

export function setEntries(state, entries) {
  return state.set('entries', List(entries));
}

export function next(state) {
  const entries = state.get('entries')
                       .concat(getWinners(state.get('vote')));

  if (entries.size === 1) {
    return state.remove('vote')
                .remove('entries')
                .set('winner', entries.first());
  } else {
    return state.merge({
      vote: Map({
        round: state.getIn(['vote', 'round'], 0) + 1,
        pair: entries.take(2)
      }),
      entries: entries.skip(2)
    });
  }
}

/*

VOTE
----

state = {
  vote: {
    pair: ['Trainspotting', '28 Days Later']
  },
  entries: []
}

updateIn, gotes into vote.tally.trainspotting, created the keys if they don't
already exist, and initialises the final key with 0 if it's unset.
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

export function vote(voteState, entry) {
  if (voteState.get('pair').includes(entry)) {
    return voteState.updateIn(
      ['tally', entry],
      0,
      tally => tally + 1
    );
  } else {
    return voteState;
  }
}
