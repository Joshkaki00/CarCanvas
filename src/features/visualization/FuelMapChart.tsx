/**
 * 3D-like Fuel Map Visualization using Recharts
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
    <ResponsiveContainer width="100%" height={500}>
      <LineChart data={chartData} margin={{ top: 20, right: 20, left: 20, bottom: 60 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-700" />
        <XAxis
          dataKey="rpm"
          label={{ value: 'RPM', position: 'insideBottom', offset: -10 }}
          className="text-gray-600 dark:text-gray-400"
        />
        <YAxis
          label={{ value: 'Fuel (ms)', angle: -90, position: 'insideLeft' }}
          className="text-gray-600 dark:text-gray-400"
          tickFormatter={(val) => val.toFixed(1)}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '10px',
          }}
          formatter={(value: number) => value.toFixed(2) + ' ms'}
        />
        <Legend 
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{ paddingTop: '20px' }}
        />
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
