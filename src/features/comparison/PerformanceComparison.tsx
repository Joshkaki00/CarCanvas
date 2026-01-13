/**
 * Performance comparison component
 * Objective 3: Show lookup tables vs. real-time calculation
 */

import { useState } from 'react';
import { Card } from '@shared/components/Card';
import { useFuelCalculation } from '@features/lookup/useFuelCalculation';
import { runBenchmark, calculateFuelDirectly } from './benchmark';
import type { PerformanceMetrics } from '@shared/types';

export function PerformanceComparison() {
  const [lookupMetrics, setLookupMetrics] = useState<PerformanceMetrics | null>(null);
  const [calculationMetrics, setCalculationMetrics] = useState<PerformanceMetrics | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const { calculateFuel } = useFuelCalculation();

  const runComparison = () => {
    setIsRunning(true);

    // Use setTimeout to allow UI to update
    setTimeout(() => {
      const testRpm = 3500;
      const testLoad = 60;

      // Benchmark lookup table
      const lookupResults = runBenchmark(() => {
        calculateFuel(testRpm, testLoad);
      }, 10000);

      // Benchmark direct calculation
      const calculationResults = runBenchmark(() => {
        calculateFuelDirectly(testRpm, testLoad);
      }, 10000);

      setLookupMetrics(lookupResults);
      setCalculationMetrics(calculationResults);
      setIsRunning(false);
    }, 100);
  };

  const speedup = lookupMetrics && calculationMetrics
    ? (calculationMetrics.averageTime / lookupMetrics.averageTime).toFixed(2)
    : null;

  return (
    <div className="space-y-6">
      <Card title="Performance Benchmark">
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Compare the performance of lookup tables (used in real ECUs) vs. calculating fuel values on-the-fly.
        </p>

        <button
          type="button"
          onClick={runComparison}
          disabled={isRunning}
          className="px-6 py-3 bg-automotive-500 text-white rounded-lg font-semibold hover:bg-automotive-600 
                     disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isRunning ? 'Running Benchmark...' : 'Run Benchmark (10,000 iterations)'}
        </button>
      </Card>

      {lookupMetrics && calculationMetrics && (
        <>
          <div className="grid md:grid-cols-2 gap-6">
            <Card title="Lookup Table Method">
              <div className="space-y-3">
                <MetricRow label="Average Time" value={`${lookupMetrics.averageTime.toFixed(3)} μs`} />
                <MetricRow label="Min Time" value={`${lookupMetrics.minTime.toFixed(3)} μs`} />
                <MetricRow label="Max Time" value={`${lookupMetrics.maxTime.toFixed(3)} μs`} />
                <MetricRow label="Iterations" value={lookupMetrics.iterations.toString()} />
              </div>
              <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded">
                <p className="text-sm text-green-800 dark:text-green-300 font-semibold">
                  ✓ Fast enough for real-time ECU use
                </p>
              </div>
            </Card>

            <Card title="Direct Calculation Method">
              <div className="space-y-3">
                <MetricRow label="Average Time" value={`${calculationMetrics.averageTime.toFixed(3)} μs`} />
                <MetricRow label="Min Time" value={`${calculationMetrics.minTime.toFixed(3)} μs`} />
                <MetricRow label="Max Time" value={`${calculationMetrics.maxTime.toFixed(3)} μs`} />
                <MetricRow label="Iterations" value={calculationMetrics.iterations.toString()} />
              </div>
              <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded">
                <p className="text-sm text-red-800 dark:text-red-300 font-semibold">
                  ✗ Too slow for real-time ECU use
                </p>
              </div>
            </Card>
          </div>

          <Card title="Analysis">
            <div className="space-y-4">
              <div className="p-4 bg-automotive-50 dark:bg-automotive-900/20 rounded-lg">
                <p className="text-2xl font-bold text-automotive-600 dark:text-automotive-400 mb-2">
                  {speedup}
                  x Faster
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Lookup tables are
                  {' '}
                  {speedup}
                  {' '}
                  times faster than direct calculation
                </p>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <h4 className="text-lg font-semibold mb-2">Why ECUs Use Lookup Tables</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                  <li>
                    <strong>Speed:</strong>
                    {' '}
                    Lookup tables provide O(1) or O(log n) access time
                  </li>
                  <li>
                    <strong>Predictability:</strong>
                    {' '}
                    Consistent timing crucial for real-time systems
                  </li>
                  <li>
                    <strong>Memory-Speed Tradeoff:</strong>
                    {' '}
                    Pre-computed values trade memory for execution speed
                  </li>
                  <li>
                    <strong>Real-World Constraints:</strong>
                    {' '}
                    ECUs must calculate fuel in microseconds, thousands of times per second
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}

interface MetricRowProps {
  label: string;
  value: string;
}

function MetricRow({ label, value }: MetricRowProps) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-600 dark:text-gray-400">{label}</span>
      <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">{value}</span>
    </div>
  );
}
