import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Stopwatch from './Stopwatch';
import Countdown from './Countdown';
import TimerIcon from '@material-ui/icons/Timer';
import HourglassEmptyRoundedIcon from '@material-ui/icons/HourglassEmptyRounded';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      {...other}
    >
      <Box >{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    height: '100vh',
    backgroundColor: "whitesmoke" //theme.palette.background.paper
  },
}));

export default function TabBar() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab icon={<TimerIcon />} label="STOPWATCH" />
          <Tab icon={<HourglassEmptyRoundedIcon />} label="COUNTDOWN" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Stopwatch />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Countdown />
      </TabPanel>
    </div>
  );
}