import React from 'react';
import ReactDOM from 'react-dom';
import Voting from './components/Voting';

const pair = ['Trainspotting', '28 days Later'];

ReactDOM.render(
  <Voting pair={pair} />,
  document.getElementById('app')
);
