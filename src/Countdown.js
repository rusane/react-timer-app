import React from 'react';
import './Stopwatch.css'; // decide if separate style sheets are necessary
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

class Countdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOn: false,
      hasFinished: false,
      elapsedTime: 0,
      seconds: 45,
      minutes: 0,
      hours: 0,
      duration: 45000
    };
  }

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
    let hours = Math.floor(time / 3600000) % 1000; // mod 24 for days
    hours = hours.toString().length < 2 ? '0' + hours : hours;

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

  toMilliseconds = (time, unit) => {
    let ms = time;
    if (unit === 'ss') { ms = time * 1000 }
    if (unit === 'mm') { ms = time * 60 * 1000 }
    if (unit === 'hh') { ms = time * 60 * 60 * 1000 }
    return ms;
  };

  handleSeconds = (e) => {
    this.handleReset();
    let seconds = e.target.value;
    if (seconds >= 0) {
      let msSeconds = seconds * 1000;
      this.setState(state => {
        let msMinutes = this.toMilliseconds(state.minutes, 'mm');
        let msHours = this.toMilliseconds(state.hours, 'hh');
        let duration = msSeconds + msMinutes + msHours;
        return { seconds: seconds, duration: duration };
      });
    }
  };

  handleMinutes = (e) => {
    this.handleReset();
    let minutes = e.target.value;
    if (minutes >= 0) {
      let msMinutes = minutes * 60 * 1000;
      this.setState(state => {
        let msSeconds = this.toMilliseconds(state.seconds, 'ss');
        let msHours = this.toMilliseconds(state.hours, 'hh');
        let duration = msSeconds + msMinutes + msHours;
        return { minutes: minutes, duration: duration };
      });
    }
  };

  handleHours = (e) => {
    this.handleReset();
    let hours = e.target.value;
    if (hours >= 0) {
      let msHours = hours * 60 * 60 * 1000;
      this.setState(state => {
        let msSeconds = this.toMilliseconds(state.seconds, 'ss');
        let msMinutes = this.toMilliseconds(state.minutes, 'mm');
        let duration = msSeconds + msMinutes + msHours;
        return { hours: hours, duration: duration };
      });
    }
  };

  render() {
    const { isOn, hasFinished, elapsedTime, seconds, minutes, hours, duration } = this.state;

    return (
      <div className='container'>
        <Container>
          <TextField
            id="hh-input"
            label="Hours"
            onChange={this.handleHours}
            type="number"
            placeholder="00"
            InputLabelProps={{ shrink: true }}
            margin="normal"
            disabled={isOn}
          />
          <TextField
            id="mm-input"
            label="Minutes"
            onChange={this.handleMinutes}
            type="number"
            placeholder="00"
            InputLabelProps={{ shrink: true }}
            margin="normal"
            disabled={isOn}
          />
          <TextField
            id="ss-input"
            label="Seconds"
            defaultValue={seconds}
            onChange={this.handleSeconds}
            type="number"
            placeholder="00"
            InputLabelProps={{ shrink: true }}
            margin="normal"
            disabled={isOn}
          />
        </Container>
        <Container>
          <Paper className="paper-time">
            {this.formatTime(duration - elapsedTime, hasFinished)}
            <div>
              {!isOn && !hasFinished && <Button variant='contained' color='primary' onClick={this.handleStart}>{elapsedTime === 0 ? 'Start' : 'Resume'}</Button>}
              {isOn && <Button variant='contained' color='primary' onClick={this.handleStop}>Stop</Button>}
            </div>
            <div>
              {(!isOn && elapsedTime > 0) || hasFinished ? <Button variant='contained' color='primary' onClick={this.handleReset}>Reset</Button> : null}
            </div>
          </Paper>
        </Container>
      </div >
    );
  }
}

export default Countdown;
