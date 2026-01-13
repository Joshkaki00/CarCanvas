/**
 * Chart component for performance comparison visualization
 * Objective 3: Visual representation of performance metrics
 */

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { PerformanceMetrics } from '@shared/types';

interface ComparisonChartProps {
  lookupMetrics: PerformanceMetrics;
  calculationMetrics: PerformanceMetrics;
}

export function ComparisonChart({ lookupMetrics, calculationMetrics }: ComparisonChartProps) {
  const data = [
    {
      method: 'Lookup Table',
      average: lookupMetrics.averageTime,
      min: lookupMetrics.minTime,
      max: lookupMetrics.maxTime,
    },
    {
      method: 'Direct Calculation',
      average: calculationMetrics.averageTime,
      min: calculationMetrics.minTime,
      max: calculationMetrics.maxTime,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-700" />
        <XAxis dataKey="method" className="text-gray-600 dark:text-gray-400" />
        <YAxis
          label={{ value: 'Time (μs)', angle: -90, position: 'insideLeft' }}
          className="text-gray-600 dark:text-gray-400"
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
        <Legend />
        <Bar dataKey="average" fill="#0ea5e9" name="Average Time" />
        <Bar dataKey="min" fill="#3b82f6" name="Min Time" />
        <Bar dataKey="max" fill="#6366f1" name="Max Time" />
      </BarChart>
    </ResponsiveContainer>
  );
}
