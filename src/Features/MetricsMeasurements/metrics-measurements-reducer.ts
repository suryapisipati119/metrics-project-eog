import { createSlice, PayloadAction } from 'redux-starter-kit';

export type MetricsMeasurements = {
  getMultipleMeasurements: [
    {
      metric: string;
      measurements: [
        {
          metric: string;
          at: number;
          unit: string;
          value: number;
        },
      ];
    },
  ];
};

export type ApiErrorAction = {
  error: string;
};

export type MeasurementQuery = {
  metricName: string;
};

export type MultipleMeasurements = {
  metric: string;
  measurements: Measurement[];
};

export type Measurement = {
  metric: string;
  at: number;
  value: number;
  unit: string;
};

const initialState: MultipleMeasurements[] = [];

const slice = createSlice({
  name: 'metricsMeasurements',
  initialState,
  reducers: {
    metricMeasurementsDataRecevied: (state, action: PayloadAction<any>) => {
      //First rest the previous state
      state = [];
      //Then add new data in store
      return state.concat(action.payload.getMultipleMeasurements);
    },
    metricsMeasurementsApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => {},
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
