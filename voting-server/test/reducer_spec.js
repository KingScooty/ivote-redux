import { Map, fromJS } from 'immutable';
import { expect } from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

  it('handles SET_ENTRIES', () => {
    const initialState = Map();
    const action = {
      type: 'SET_ENTRIES', entries: ['Trainspotting']
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      entries: ['Trainspotting']
    }));
  });

  it('handles NEXT', () => {
    const initialState = fromJS({
      entries: ['Trainspotting', '28 Days Later']
    });
    const action = { type: 'NEXT' };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later']
      },
      entries: []
    }));
  });

  it('handles VOTE', () => {
    const initialState = fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later']
      },
      entries: []
    });
    const action = { type: 'VOTE', entry: 'Trainspotting' };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: { Trainspotting: 1 }
      },
      entries: []
    }));
  });

  /*
    An important additional requirement of reducers is that if they are called with an undefined state, they know how to initialize it to a meaningful value. In our case, the initial value is a Map. So, giving an undefined state should work as if an empty Map had been given:
  */

  it('has an initial state', () => {
    const action = { type: 'SET_ENTRIES', entries: ['Trainspotting'] };
    const nextState = reducer(undefined, action);

    expect(nextState).to.equal(fromJS({
      entries: ['Trainspotting']
    }));
  });

/*
  What is interesting about the way this reducer works is how it can be generically used to take the application from one state to the next, given any type of action. Actually, given a collection of past actions, you can actually just reduce that collection into the current state. That's why the function is called a reducer: It fulfills the contract of a reduce callback function.
*/

  it('can be used with reduce', () => {
    const actions = [
      {type: 'SET_ENTRIES', entries: ['Trainspotting', '28 Days Later']},
      {type: 'NEXT'},
      {type: 'VOTE', entry: 'Trainspotting'},
      {type: 'VOTE', entry: '28 Days Later'},
      {type: 'VOTE', entry: 'Trainspotting'},
      {type: 'NEXT'}
    ];
    const finalState = actions.reduce(reducer, Map());

    expect(finalState).to.equal(fromJS({
      winner: 'Trainspotting'
    }));
  });

});
