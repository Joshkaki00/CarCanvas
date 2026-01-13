/**
 * Performance benchmarking utilities
 * Objective 3: Compare lookup tables vs real-time calculation
 */

import type { PerformanceMetrics } from '@shared/types';

/**
 * Run a benchmark test
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
 */
export function calculateFuelDirectly(rpm: number, load: number): number {
  // Complex mathematical formula that would be too slow for real-time ECU use
  const baseFuel = 1.5;
  const loadFactor = load / 100;
  const rpmFactor = rpm / 1000;

  // Simulate expensive calculations
  let result = baseFuel;
  for (let i = 0; i < 10; i += 1) {
    result += Math.sin(rpm / 1000 + i) * 0.1;
    result += Math.cos(load / 100 + i) * 0.1;
  }

  result += loadFactor * rpmFactor * 2.5;

  return Math.max(0.5, result);
}
