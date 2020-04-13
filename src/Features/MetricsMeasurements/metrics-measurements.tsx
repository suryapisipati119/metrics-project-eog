import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Provider, createClient, useQuery } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';
import { actions } from '../MetricsMeasurements/metrics-measurements-reducer';
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area } from 'recharts';
import { styled } from '@material-ui/core';

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});
export default (props: any) => {
  return (
    <Provider value={client}>
      <MetricsMeasurements props={props} />
    </Provider>
  );
};

const MetricsMeasurements = (props: any) => {
  const getMetricsMeasurement = `
query{
    getMeasurements(input: {metricName:"${props.props.selectedMetric}"})
    {
      metric
      at
      unit
      value
    }
  }
`;

  const dispatch = useDispatch();

  const [result] = useQuery({
    query: getMetricsMeasurement,
  });
  const { fetching, data, error } = result;
  useEffect(() => {
    if (error) {
      dispatch(actions.metricsMeasurementsApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    dispatch(actions.metricMeasurementsDataRecevied(data));
  }, [dispatch, data, error]);

  if (fetching) return <LinearProgress />;
  return (
    <StyledChart>
      <AreaChart width={1000} height={250} data={data.getMeasurements}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="unit" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
      </AreaChart>
    </StyledChart>
  );
};

const StyledChart = styled('div')({
  position: 'relative',
  top: '40px',
  left: '100px',
});
