import React from 'react';
import './Timer.css';
import TimeInput from './TimeInput';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import PauseRoundedIcon from '@material-ui/icons/PauseRounded';
import ReplayRoundedIcon from '@material-ui/icons/ReplayRounded';

class Countdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOn: false,
      hasFinished: false,
      elapsedTime: 0,
      seconds: 45,
      minutes: '',
      hours: '',
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

  handleClearInput = () => {
    this.handleReset();
    this.setState({
      seconds: '',
      minutes: '',
      hours: '',
      duration: 0
    });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  formatTime(time, hasFinished) {
    let ms = ('0' + Math.floor(time / 10) % 1000).slice(-2);
    let seconds = ('0' + Math.floor(time / 1000) % 60).slice(-2);
    let minutes = ('0' + Math.floor(time / 60000) % 60).slice(-2);
    let hours = Math.floor(time / 3600000); // mod 24 for days
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
        if (duration >= 3.6e9) { duration = 3.6e9 - 1e3 }
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
        if (duration >= 3.6e9) { duration = 3.6e9 - 1e3 }
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
        if (duration >= 3.6e9) { duration = 3.6e9 - 1e3 }
        return { hours: hours, duration: duration };
      });
    }
  };

  render() {
    const { isOn, hasFinished, elapsedTime, hours, minutes, seconds, duration } = this.state;

    return (
      <div className='container'>
        <Container>
          <Paper className="paper-time">
            {this.formatTime(duration - elapsedTime, hasFinished)}
            <div>
              {!isOn && !hasFinished &&
                <Fab
                  color='primary'
                  onClick={this.handleStart}
                >
                  <PlayArrowRoundedIcon />
                </Fab>
              }
              {isOn &&
                <Fab
                  color='primary'
                  onClick={this.handleStop}
                >
                  <PauseRoundedIcon />
                </Fab>
              }
              {!isOn && elapsedTime > 0 ?
                <IconButton
                  className="reset-btn"
                  color="default"
                  onClick={this.handleReset}
                >
                  <ReplayRoundedIcon fontSize="large" />
                </IconButton>
                :
                null
              }
              {hasFinished &&
                <Fab
                  color='primary'
                  onClick={this.handleReset}
                >
                  <ReplayRoundedIcon />
                </Fab>
              }
            </div>
          </Paper>
        </Container>
        <Container>
          <TimeInput
            hours={hours}
            minutes={minutes}
            seconds={seconds}
            isDisabled={isOn}
            onHoursChange={this.handleHours}
            onMinutesChange={this.handleMinutes}
            onSecondsChange={this.handleSeconds}
            onClearInputChange={this.handleClearInput}
          />
        </Container>
      </div >
    );
  }
}

export default Countdown;
