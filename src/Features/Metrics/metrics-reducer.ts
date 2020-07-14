import { createSlice, PayloadAction } from 'redux-starter-kit';

export type metrics = {
  getMetrics: string;
};

export type ApiErrorAction = {
  error: string;
};

const initialState = {
  getMetrics: '',
};

const slice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    metricDataRecevied: (state, action: PayloadAction<metrics>) => {
      const { getMetrics } = action.payload;
      state.getMetrics = getMetrics;
    },
    metricsApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const metricReducer = slice.reducer;
export const metricActions = slice.actions;
