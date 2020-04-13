import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as metricsReducer } from '../Features/Metrics/metrics-reducer';
import { reducer as metricsMeasurementsReducer } from '../Features/MetricsMeasurements/metrics-measurements-reducer';

export default {
  weather: weatherReducer,
  metrics: metricsReducer,
  metricsMeasurements: metricsMeasurementsReducer,
};
