import React from 'react';
import './Stopwatch.css';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

class Stopwatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOn: false,
      elapsedTime: 0
    };
  }

  handleStart = () => {
    this.setState(state => {
      const startTime = Date.now() - state.elapsedTime;
      this.timer = setInterval(() => {
        this.setState({ elapsedTime: Date.now() - startTime });
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
    this.setState({ isOn: false, elapsedTime: 0 });
    clearInterval(this.timer);
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  formatTime(time) {
    let ms = ('0' + Math.floor(time / 10) % 1000).slice(-2);
    let seconds = ('0' + Math.floor(time / 1000) % 60).slice(-2);
    let minutes = ('0' + Math.floor(time / 60000) % 60).slice(-2);
    let hours = ('0' + Math.floor(time / 3600000) % 24).slice(-2);
    return (
      <div className='time-format'>
        <p className='hh-mm-ss'>{hours}:{minutes}:{seconds}</p>
        <p className='ms'>.{ms}</p>
      </div>
    )
  }

  render() {
    const { isOn, elapsedTime } = this.state;

    return (
      <div className='container'>
        <Container>
          <Paper className="paper-time">
            {this.formatTime(elapsedTime)}
            <div>
              {!isOn && <Button variant='contained' color='primary' onClick={this.handleStart}>{elapsedTime === 0 ? 'Start' : 'Resume'}</Button>}
              {isOn && <Button variant='contained' color='primary' onClick={this.handleStop}>Stop</Button>}
            </div>
            <div>
              {!isOn && elapsedTime > 0 ? <Button variant='contained' color='primary' onClick={this.handleReset}>Reset</Button> : null}
            </div>
          </Paper>
        </Container>
      </div>
    );
  }
}

export default Stopwatch;
