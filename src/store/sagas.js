import { spawn, call } from 'redux-saga/effects';
import weatherSaga from '../Features/Weather/saga';
import metricsSaga from '../Features/Metrics/metrics-saga';
import metricMeasurementsSaga from '../Features/MetricsMeasurements/metrics-measurements-saga';

function* fetchAll() {
  yield spawn(weatherSaga);
  yield spawn(metricsSaga);
  yield spawn(metricMeasurementsSaga);
}

export default function* root() {
  yield call(fetchAll);
}
