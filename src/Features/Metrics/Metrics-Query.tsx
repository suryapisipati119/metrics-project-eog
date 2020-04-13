import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Provider, createClient, useQuery } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';
import { FormControl, InputLabel, Select, MenuItem, makeStyles, styled } from '@material-ui/core';
import { actions } from '../Metrics/metrics-reducer';
import MetricMeasurment from '../MetricsMeasurements/metrics-measurements';

const useStyles = makeStyles(theme => ({
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
  const [selectedMetric, steSelectedMetric] = React.useState('');

  const handleChange = (event: any) => {
    steSelectedMetric(event.target.value);
  };

  const dispatch = useDispatch();

  const [result] = useQuery({
    query: getMetricsQuery,
  });
  const { fetching, data, error } = result;

  useEffect(() => {
    if (error) {
      dispatch(actions.metricsApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    dispatch(actions.metricDataRecevied(data));
  }, [dispatch, data, error]);

  if (fetching) return <LinearProgress />;

  return (
    <MetricComponent>
      <StyledFormControl className={classes.formControl}>
        <InputLabel>Select</InputLabel>
        <Select value={selectedMetric} onChange={handleChange}>
          {data.getMetrics.map((metrics: any) => {
            return (
              <MenuItem value={metrics} key={metrics.toString()}>
                {metrics}
              </MenuItem>
            );
          })}
        </Select>
      </StyledFormControl>
      <MetricComponent>
        Result:
        {selectedMetric !== '' ? <MetricMeasurment selectedMetric={selectedMetric} /> : ''}
      </MetricComponent>
    </MetricComponent>
  );
};

const StyledFormControl = styled(FormControl)({
  position: 'fixed',
  top: '4em',
  right: '1em',
  width: '20%',
});

const MetricComponent = styled('div')({
  padding: '15px',
});
