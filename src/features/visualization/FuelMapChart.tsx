/**
 * 3D-like Fuel Map Visualization using Recharts
 * Objective 2: Create interactive 2D visualization of fuel maps
 */

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface FuelMapChartProps {
  data: number[][];
  rpmAxis: number[];
  loadAxis: number[];
  currentRpm?: number;
  currentLoad?: number;
}

export function FuelMapChart({ data, rpmAxis, loadAxis }: FuelMapChartProps) {
  // Transform 2D array into chart data
  // For each load level, create a line showing fuel vs RPM
  const chartData = rpmAxis.map((rpm, rpmIdx) => {
    const point: Record<string, number> = { rpm };

    loadAxis.forEach((load, loadIdx) => {
      point[`load${load}`] = data[rpmIdx][loadIdx];
    });

    return point;
  });

  // Generate colors for different load levels
  const colors = [
    '#0ea5e9',
    '#3b82f6',
    '#6366f1',
    '#8b5cf6',
    '#a855f7',
    '#d946ef',
    '#ec4899',
    '#f43f5e',
    '#ef4444',
    '#f97316',
    '#f59e0b',
  ];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-700" />
        <XAxis
          dataKey="rpm"
          label={{ value: 'RPM', position: 'insideBottom', offset: -5 }}
          className="text-gray-600 dark:text-gray-400"
        />
        <YAxis
          label={{ value: 'Fuel (ms)', angle: -90, position: 'insideLeft' }}
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
        {loadAxis.map((load, idx) => (
          <Line
            key={load}
            type="monotone"
            dataKey={`load${load}`}
            stroke={colors[idx % colors.length]}
            name={`${load}% Load`}
            dot={false}
            strokeWidth={2}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
