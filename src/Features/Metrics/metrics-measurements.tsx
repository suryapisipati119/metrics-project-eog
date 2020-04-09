import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { actions } from './reducer';
import { Provider, createClient, useQuery } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core';
import { actions } from '../Weather/reducer';
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area } from 'recharts';

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




export default (props:any) => {
  return (
    <Provider value={client}>
      <MetricsMeasurements measurements={props}/>
    </Provider>
  );
};

const MetricsMeasurements= (props:any) => {
    const getMetricsMeasurement = `
query{
    getMeasurements(input: {metricName: props.selectedMetric})
    {
      metric
      at
      unit
      value
    }
  }
`;

  const dispatch = useDispatch(); 

  const [result]= useQuery({
      query: getMetricsMeasurement
  });
  const { fetching, data, error } = result;
useEffect(() => {
  if (error) {
    dispatch(actions.weatherApiErrorReceived({ error: error.message }));
    return;
  }
  if (!data) return;
  dispatch(actions.metricMeasurementsDataRecevied(data));
}, [dispatch, data, error]);

if (fetching) return <LinearProgress />;
  return <div>
  <AreaChart width={730} height={250} data={data}
      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
      <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
  </AreaChart>
</div>;
};
