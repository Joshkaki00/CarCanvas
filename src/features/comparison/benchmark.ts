/**
 * Performance benchmarking utilities
 * Objective 3: Compare lookup tables vs real-time calculation
 */

import type { PerformanceMetrics } from '@shared/types';

/**
 * Run a benchmark test
 * Implement a function that runs a given function multiple times and measures performance
 * 
 * @param fn - The function to benchmark
 * @param iterations - Number of times to run the function (default 10000)
 * @returns Performance metrics (average, min, max times)
 */
export function runBenchmark(fn: () => void, iterations: number = 10000): PerformanceMetrics {
  const times: number[] = [];

  // Warm-up run
  for (let i = 0; i < 100; i += 1) {
    fn();
  }

  // Actual benchmark
  for (let i = 0; i < iterations; i += 1) {
    const start = performance.now();
    fn();
    const end = performance.now();
    times.push((end - start) * 1000); // Convert to microseconds
  }

  const averageTime = times.reduce((sum, t) => sum + t, 0) / times.length;
  const minTime = Math.min(...times);
  const maxTime = Math.max(...times);

  return {
    averageTime,
    minTime,
    maxTime,
    iterations,
  };
}

/**
 * Calculate fuel using a mathematical formula (real-time calculation)
 * This simulates what an ECU would do without lookup tables
 * 
 * TODO: Implement a complex calculation that simulates expensive real-time computation
 * Make it intentionally slower than a lookup table to demonstrate the tradeoff
 */
export function calculateFuelDirectly(_rpm: number, _load: number): number {
  // TODO: Implement fuel calculation using mathematical formulas
  // Consider:
  // - Base fuel amount
  // - Load factor (throttle position)
  // - RPM factor
  // - Add complexity with trigonometric functions (sin, cos) to simulate expense
  // - Multiple iterations to make it slower than lookup

  return 1.0; // Placeholder
}
