import { weatherReducer } from '../Features/Weather/reducer';
import { metricReducer } from '../Features/Metrics/metrics-reducer';

export default {
  weather: weatherReducer,
  metrics: metricReducer,
};
