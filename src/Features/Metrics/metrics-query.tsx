import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Provider, createClient, useQuery } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';
import { FormControl, makeStyles, styled, TextField } from '@material-ui/core';
import Autocomplete, { AutocompleteRenderInputParams } from '@material-ui/lab/Autocomplete';
import { metricActions } from '../Metrics/metrics-reducer';

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
  const dispatch = useDispatch();
  const [result] = useQuery({
    query: getMetricsQuery,
  });
  const { fetching, data, error } = result;

  useEffect(() => {
    if (error) {
      dispatch(metricActions.metricsApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    const { getMetrics } = data;
    dispatch(metricActions.metricDataRecevied(getMetrics));
  }, [dispatch, data, error]);

  if (fetching) return <LinearProgress />;

  return (
    <MetricComponent>
      <StyledFormControl className={classes.formControl}>
        <Autocomplete
        multiple
        id="tags-outlined"
        options={data.getMetrics}
        filterSelectedOptions={true}
        renderInput={(params: AutocompleteRenderInputParams) => (
          <TextField
            {...params}
            variant="outlined"
            label="Select"
            placeholder="Favorites"
          />
        )}
      />        
      </StyledFormControl>
    </MetricComponent>
  );
};

const StyledFormControl = styled(FormControl)({
  position: 'fixed',
  top: '5em',
  right: '1em',
  width: '35%',
});

const MetricComponent = styled('div')({
  padding: '15px',
});
