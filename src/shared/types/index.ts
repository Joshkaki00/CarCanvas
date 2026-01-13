/**
 * Common types used across the application
 */

export interface EngineParameters {
  rpm: number;
  throttlePosition: number; // 0-100%
  temperature?: number; // Optional temperature in Celsius
}

export interface FuelCalculationResult {
  fuelAmount: number; // in milliseconds or mg
  calculationTime: number; // in microseconds
  method: 'lookup' | 'calculation';
}

export interface PerformanceMetrics {
  averageTime: number;
  minTime: number;
  maxTime: number;
  iterations: number;
}
