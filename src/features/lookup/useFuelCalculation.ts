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
      // Single lookup is too fast for accurate measurement
      const iterations = 1000;
      
      const startTime = performance.now();
      let result: InterpolationResult | null = null;
      
      for (let i = 0; i < iterations; i += 1) {
        result = lookupTable.lookup(rpm, load);
      }
      
      const endTime = performance.now();

      // Calculate average time per lookup in microseconds
      const averageTimeMs = (endTime - startTime) / iterations;
      
      return {
        ...result!,
        calculationTime: averageTimeMs * 1000, // Convert to microseconds
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
