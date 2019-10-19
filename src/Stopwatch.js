import React from 'react';

class Stopwatch extends React.Component {
  state = {
    isOn: false,
    elapsedTime: 0
  };

  handleStart = () => {
    this.setState(state => {
      const startTime = Date.now() - state.elapsedTime;
      this.timer = setInterval(() => {
        this.setState({ elapsedTime: Date.now() - startTime });
      });
      return { isOn: !state.isOn };
    });
  };

  handleStop = () => {
    clearInterval(this.timer)
    this.setState(state => {
      return { isOn: !state.isOn };
    });
  };

  handleReset = () => {
    this.setState({isOn: false, elapsedTime: 0});
    clearInterval(this.timer);
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() { 
    const {isOn, elapsedTime} = this.state;
    const containerStyle = { 
      background: 'midnightblue',
      height: '100%',
      paddingTop: '35vh',
      textAlign: 'center',  
      font: '16px monospace',
      color: 'white'
    };

    return (
      <div style={containerStyle}>
          <h1 style={{margin: '0'}}>Stopwatch</h1>
          <p>{elapsedTime} ms</p>
          {!isOn &&  <button onClick={this.handleStart}>{elapsedTime === 0 ? 'Start' : 'Resume'}</button>}
          {isOn && <button onClick={this.handleStop}>Stop</button>}
          {!isOn ? <button onClick={this.handleReset}>Reset</button> : null}
      </div>
    );
  }
}

export default Stopwatch;
