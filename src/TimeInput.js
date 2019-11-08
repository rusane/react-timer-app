import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function CountdownInput(props) {
  const { defaultSeconds, isDisabled, onHoursChange, onMinutesChange, onSecondsChange } = props;

  return (
    <div>
      <TextField
        id="hh-input"
        label="Hours"
        onChange={onHoursChange}
        type="number"
        placeholder="00"
        InputLabelProps={{ shrink: true }}
        margin="normal"
        disabled={isDisabled}
      />
      <TextField
        id="mm-input"
        label="Minutes"
        onChange={onMinutesChange}
        type="number"
        placeholder="00"
        InputLabelProps={{ shrink: true }}
        margin="normal"
        disabled={isDisabled}
      />
      <TextField
        id="ss-input"
        label="Seconds"
        defaultValue={defaultSeconds}
        onChange={onSecondsChange}
        type="number"
        placeholder="00"
        InputLabelProps={{ shrink: true }}
        margin="normal"
        disabled={isDisabled}
      />
    </div>
  );
}