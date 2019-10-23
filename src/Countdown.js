import React from 'react';
import './Stopwatch.css'; // decide if separate style sheets are necessary
import Button from '@material-ui/core/Button';

class Countdown extends React.Component {
  state = {
    isOn: false,
    hasFinished: false,
    elapsedTime: 0,
    duration: 45000, // ms - hardcoded for now
  };

  handleStart = () => {
    this.setState(state => {
      const startTime = Date.now() - state.elapsedTime;
      this.timer = setInterval(() => {
        let delta = Date.now() - startTime;
        if (delta >= state.duration) {
            clearInterval(this.timer);
            this.setState({ 
                isOn: false, 
                hasFinished: true, 
                elapsedTime: state.duration 
            });            
        } else {
            this.setState({ elapsedTime: delta });
        }
      }, 10);
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
    this.setState({
        isOn: false, 
        hasFinished: false, 
        elapsedTime: 0
    });
    clearInterval(this.timer);
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  formatTime(time, hasFinished) {
    let ms = ('0' + Math.floor(time / 10) % 1000).slice(-2);
    let seconds = ('0' + Math.floor(time / 1000) % 60).slice(-2);
    let minutes = ('0' + Math.floor(time / 60000) % 60).slice(-2);
    let hours = ('0' + Math.floor(time / 3600000) % 24).slice(-2);

    let divClassName = 'time-format';
    if (hasFinished) {
      divClassName += '-finished';
    }

    return (
      <div className={divClassName}>
        <p className='hh-mm-ss'>{hours}:{minutes}:{seconds}</p>
        <p className='ms'>.{ms}</p>
      </div>
    )
  }

  render() { 
    const {isOn, hasFinished, elapsedTime, duration} = this.state;

    // Fix padding around reset button
    return (
      <div className='container'>
          <h1>Countdown</h1>          
          {this.formatTime(duration - elapsedTime, hasFinished)}                 
          {!isOn && !hasFinished && <Button variant='contained' color='primary' onClick={this.handleStart}>{elapsedTime === 0 ? 'Start': 'Resume'}</Button>}
          {isOn && <Button variant='contained' color='primary' onClick={this.handleStop}>Stop</Button>}
          <div>
            {!isOn && elapsedTime > 0 ? <Button variant='contained' color='primary' onClick={this.handleReset}>Reset</Button> : null}
          </div>
      </div>
    );
  }
}

export default Countdown;
