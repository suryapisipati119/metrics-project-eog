import React from 'react';
import { CartesianGrid, XAxis, YAxis, AreaChart, Tooltip, Area } from 'recharts';
import data from './data';
import Metrics from '../Features/Metrics/Metrics-Query';

export const MetricsPage: React.FC = () => {
    return (
        <div>
            <Metrics />
        </div>
    );
}

export default MetricsPage;