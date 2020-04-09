import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { actions } from './reducer';
import { Provider, createClient, useQuery } from 'urql';
import { useGeolocation } from 'react-use';
import LinearProgress from '@material-ui/core/LinearProgress';
import Chip from '../../components/Chip';
import { IState } from '../../store';
import { FormControl, InputLabel, Select, MenuItem, makeStyles, styled } from '@material-ui/core';
import { actions } from '../Weather/reducer';
import MetricMeasurment from './metrics-measurements';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const getMetricsQuery = `
query{
    getMetrics
  }
`;

export default () => {
  return (
    <Provider value={client}>
      <Metrics />
    </Provider>
  );
};

const Metrics = () => {
    const classes = useStyles();
  const [selectedMetric, steSelectedMetric] = React.useState(null);

  const handleChange = (event: any) => {
    steSelectedMetric(event.target.value);
  };

  const dispatch = useDispatch(); 

  const [result]= useQuery({
      query: getMetricsQuery
  });
  const { fetching, data, error } = result;
const [state, setState] = React.useState([])

useEffect(() => {
  if (error) {
    dispatch(actions.weatherApiErrorReceived({ error: error.message }));
    return;
  }
  if (!data) return;
  // const { getWeatherForLocation } = data;
  dispatch(actions.metricDataRecevied(data));
}, [dispatch, data, error]);

if (fetching) return <LinearProgress />;

  return <div><StyledFormControl className={classes.formControl}>
  <InputLabel>Select</InputLabel>
  <Select
    value={selectedMetric}
    onChange={handleChange}
  >
  {
     data.getMetrics.map((metrics:any) => {
        return <MenuItem value={metrics}>{metrics}</MenuItem>

      })
  }
  </Select>
</StyledFormControl>
<div>
  result: 
  {selectedMetric !=null ? <MetricMeasurment selectedMetric={selectedMetric}/> : ""}
  </div>
</div>;
};

const StyledFormControl = styled(FormControl)({
  position: 'fixed',
  top: "4em",
  right: '1em',
  width: '20%'
})
