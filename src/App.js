import React from 'react';
import Stopwatch from './Stopwatch';
import './App.css';

class App extends React.Component {
  render() { 
    return (
      <div className='Main'>
        <Stopwatch/>
      </div>
    );
  }
}

export default App;
