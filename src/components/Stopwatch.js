import React from 'react';
import '../styles/Timer.css';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import PauseRoundedIcon from '@material-ui/icons/PauseRounded';
import ReplayRoundedIcon from '@material-ui/icons/ReplayRounded';

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
              {!isOn &&
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
                  <ReplayRoundedIcon fontSize="large"/>
                </IconButton>
                :
                null
              }
            </div>
          </Paper>
        </Container>
      </div>
    );
  }
}

export default Stopwatch;
