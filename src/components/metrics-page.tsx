import React from 'react';
import Metrics from '../Features/Metrics/Metrics-Query';

export const MetricsPage: React.FC = () => {
  return (
    <div style={{ width: '100%', height: 'calc(100% - 64px)', overflow: 'auto' }}>
      <Metrics />
    </div>
  );
};

export default MetricsPage;
