/**
 * Chart component for performance comparison visualization
 * Objective 3: Visual representation of performance metrics
 * 
 * TODO: Implement bar chart to visually compare lookup vs calculation performance
 * Use Recharts BarChart to show average, min, and max times side-by-side
 */

import type { PerformanceMetrics } from '@shared/types';

interface ComparisonChartProps {
  lookupMetrics: PerformanceMetrics;
  calculationMetrics: PerformanceMetrics;
}

export function ComparisonChart({ lookupMetrics, calculationMetrics }: ComparisonChartProps) {
  // TODO: Transform metrics into chart-compatible data format
  // Example structure:
  // data = [
  //   { method: 'Lookup Table', average: X, min: Y, max: Z },
  //   { method: 'Direct Calculation', average: A, min: B, max: C }
  // ]

  // TODO: Import and use Recharts components:
  // - ResponsiveContainer
  // - BarChart
  // - Bar (one for each metric: average, min, max)
  // - XAxis, YAxis
  // - CartesianGrid, Tooltip, Legend

  return (
    <div className="w-full h-80 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded border-2 border-dashed border-gray-300 dark:border-gray-600">
      <div className="text-center space-y-2">
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          Performance Comparison Chart
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          TODO: Implement Recharts bar chart
        </p>
        <div className="text-xs text-gray-400 dark:text-gray-500 mt-4 space-y-1">
          <p>Lookup: {lookupMetrics.averageTime.toFixed(3)} μs avg</p>
          <p>Calculation: {calculationMetrics.averageTime.toFixed(3)} μs avg</p>
        </div>
      </div>
    </div>
  );
}
