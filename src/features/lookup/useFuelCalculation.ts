/**
 * React hook for fuel calculation using lookup tables
 */

import { useMemo, useCallback } from 'react';
import { LookupTable } from './LookupTable';
import { createSampleFuelMap } from './sampleData';
import type { InterpolationResult } from './types';

export function useFuelCalculation() {
  // Create lookup table instance
  const lookupTable = useMemo(() => new LookupTable(createSampleFuelMap()), []);

  // Calculate fuel amount with performance tracking
  const calculateFuel = useCallback(
    (rpm: number, load: number): InterpolationResult & { calculationTime: number } => {
      const startTime = performance.now();
      const result = lookupTable.lookup(rpm, load);
      const endTime = performance.now();

      return {
        ...result,
        calculationTime: (endTime - startTime) * 1000, // Convert to microseconds
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
