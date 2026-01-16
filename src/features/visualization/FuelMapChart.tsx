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
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={chartData} margin={{ top: 20, right: 20, left: 50, bottom: 50 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis
          dataKey="rpm"
          label={{ value: 'Engine RPM', position: 'insideBottom', offset: -10, style: { fontWeight: 600 } }}
          stroke="#6b7280"
        />
        <YAxis
          label={{ value: 'Fuel Injection (ms)', angle: -90, position: 'insideLeft', style: { fontWeight: 600 } }}
          stroke="#6b7280"
          tickFormatter={(val) => val.toFixed(1)}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            padding: '12px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}
          formatter={(value) => typeof value === 'number' ? [value.toFixed(2) + ' ms', ''] : value}
          labelFormatter={(label) => `RPM: ${label}`}
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
            animationDuration={300}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
