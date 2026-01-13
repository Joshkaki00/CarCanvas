/**
 * Sample ECU fuel map data for demonstration
 * Based on realistic automotive fuel injection maps
 */

import type { LookupTableConfig } from './types';

/**
 * Create a sample 2D fuel map
 * RPM range: 1000-7000 RPM (typical gasoline engine)
 * Load range: 0-100% (throttle position)
 * Fuel values: milliseconds of injection time
 */
export function createSampleFuelMap(): LookupTableConfig {
  const rpmAxis = [1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000];
  const loadAxis = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  // Generate realistic fuel map data
  // Base formula: fuelTime = (load * rpm) / constant + baseInjection
  const fuelData: number[][] = [];

  for (let i = 0; i < rpmAxis.length; i += 1) {
    const rpm = rpmAxis[i];
    const row: number[] = [];

    for (let j = 0; j < loadAxis.length; j += 1) {
      const load = loadAxis[j];

      // Realistic fuel calculation with some variation
      const baseFuel = 1.5; // Base injection time in ms
      const loadFactor = load / 100;
      const rpmFactor = rpm / 1000;

      // Fuel increases with both load and RPM, but not linearly
      const fuelTime = baseFuel + loadFactor * rpmFactor * 2.5 + Math.sin(rpm / 1000) * 0.3;

      row.push(Math.max(0.5, fuelTime)); // Minimum 0.5ms
    }

    fuelData.push(row);
  }

  return {
    rpmAxis,
    loadAxis,
    fuelData,
  };
}
