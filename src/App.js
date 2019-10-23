import React from 'react';
// import Stopwatch from './Stopwatch';
import Countdown from './Countdown';
import './App.css';

class App extends React.Component {
  render() { 
    return (
      <div className='main'>
        <Countdown/>
      </div>
    );
  }
}

export default App;
