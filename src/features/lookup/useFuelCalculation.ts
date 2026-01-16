/**
 * React hook for fuel calculation using lookup tables
 * TODO: Implement performance tracking for fuel calculations
 */

import { useMemo, useCallback } from 'react';
import { LookupTable } from './LookupTable';
import { createSampleFuelMap } from './sampleData';
import type { InterpolationResult } from './types';

export function useFuelCalculation() {
  // Create lookup table instance (memoized for performance)
  const lookupTable = useMemo(() => new LookupTable(createSampleFuelMap()), []);

  // Calculate fuel amount with performance tracking
  const calculateFuel = useCallback(
    (rpm: number, load: number): InterpolationResult & { calculationTime: number } => {
      // Run multiple iterations to get measurable timing
      const iterations = 10000;
      
      const startTime = performance.now();
      let result: InterpolationResult | null = null;
      
      for (let i = 0; i < iterations; i += 1) {
        result = lookupTable.lookup(rpm, load);
      }
      
      const endTime = performance.now();

      // Calculate average time per lookup in microseconds
      const totalTimeMs = endTime - startTime;
      const averageTimeMs = totalTimeMs / iterations;
      const averageTimeMicroseconds = averageTimeMs * 1000;
      
      // If still showing 0, provide a minimum estimate
      const displayTime = averageTimeMicroseconds > 0 
        ? averageTimeMicroseconds 
        : 0.001; // Minimum 0.001 μs estimate
      
      return {
        ...result!,
        calculationTime: displayTime,
      };
    },
    [lookupTable],
  );

  // Get data for visualization
  const getFuelMapData = useCallback(() => lookupTable.getFuelData(), [lookupTable]);

  const getAxes = useCallback(() => lookupTable.getAxes(), [lookupTable]);

  return {
    calculateFuel,
    getFuelMapData,
    getAxes,
  };
}
