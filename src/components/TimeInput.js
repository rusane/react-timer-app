import React from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import Tooltip from '@material-ui/core/Tooltip';

export default function CountdownInput(props) {
  const { hours, minutes, seconds, isDisabled, onHoursChange, onMinutesChange, onSecondsChange, onClearInputChange } = props;

  return (
    <div>
      <div>
        <TextField
          id="hh-input"
          label="Hours"
          value={hours}
          onChange={onHoursChange}
          type="number"
          placeholder="00"
          margin="normal"
          disabled={isDisabled}
        />
        <TextField
          id="mm-input"
          label="Minutes"
          value={minutes}
          onChange={onMinutesChange}
          type="number"
          placeholder="00"
          margin="normal"
          disabled={isDisabled}
        />
        <TextField
          id="ss-input"
          label="Seconds"
          value={seconds}
          onChange={onSecondsChange}
          type="number"
          placeholder="00"
          margin="normal"
          disabled={isDisabled}
        />
      </div>
      <Tooltip title="Clear input" placement="right" enterDelay={500}> 
        <IconButton
          onClick={onClearInputChange}
          disabled={isDisabled}
        >
          <ClearRoundedIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
}