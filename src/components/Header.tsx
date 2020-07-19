import React from 'react';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Weather from '../Features/Weather/Weather';
import { Metrics } from './metrics';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  grow: {
    flexGrow: 1,
    cursor: 'pointer',
  },
});

export default () => {
  const classes = useStyles();
  const history = useHistory();
  const name = "surya's";
  function handleClick() {
    history.push('/');
  }
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit" onClick={handleClick} className={classes.grow}>
          {name} React Visualization Assessment
        </Typography>
        <Metrics />
        <Weather />
      </Toolbar>
    </AppBar>
  );
};
