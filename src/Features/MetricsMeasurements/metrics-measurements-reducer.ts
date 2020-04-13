import { createSlice, PayloadAction } from 'redux-starter-kit';

export type MetricsMeasurements = {
  metric: string;
  at: number;
  unit: string;
  value: number;
};

export type ApiErrorAction = {
  error: string;
};

const initialState = {
  metric: '',
  at: 0,
  unit: '',
  value: 0,
};

const slice = createSlice({
  name: 'metricsMeasurements',
  initialState,
  reducers: {
    metricMeasurementsDataRecevied: (state, action: PayloadAction<MetricsMeasurements>) => {
      const { metric, at, unit, value } = action.payload;
      state.metric = metric;
      state.at = at;
      state.unit = unit;
      state.value = value;
    },
    metricsMeasurementsApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
