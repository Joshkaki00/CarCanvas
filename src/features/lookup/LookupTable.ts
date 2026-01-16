/**
 * Core Lookup Table implementation for ECU fuel map simulation
 * Objective 1: Implement a working 3D lookup table system with linear interpolation
 * 
 * TODO: This is a skeleton implementation. You need to implement:
 * - Binary search algorithm for finding surrounding indices
 * - Weight calculation for interpolation
 * - Bilinear interpolation algorithm
 */

import type { FuelMap2D, LookupTableConfig, InterpolationResult } from './types';

export class LookupTable {
  private rpmAxis: number[];

  private loadAxis: number[];

  private fuelData: FuelMap2D;

  constructor(config: LookupTableConfig) {
    this.rpmAxis = config.rpmAxis;
    this.loadAxis = config.loadAxis;
    this.fuelData = config.fuelData as FuelMap2D;
  }

  /**
   * Perform 2D lookup with bilinear interpolation
   * TODO: Implement the complete lookup logic
   */
  lookup(rpm: number, load: number): InterpolationResult {
    // TODO: Find surrounding indices for RPM and load
    const rpmIndices = this.findSurroundingIndices(this.rpmAxis, rpm);
    const loadIndices = this.findSurroundingIndices(this.loadAxis, load);

    // TODO: Calculate interpolation weights (0 to 1)
    const rpmWeight = this.calculateWeight(
      this.rpmAxis[rpmIndices[0]],
      this.rpmAxis[rpmIndices[1]],
      rpm,
    );
    const loadWeight = this.calculateWeight(
      this.loadAxis[loadIndices[0]],
      this.loadAxis[loadIndices[1]],
      load,
    );

    // TODO: Perform bilinear interpolation
    const value = this.bilinearInterpolate(rpmIndices, loadIndices, rpmWeight, loadWeight);

    return {
      value,
      indices: {
        rpm: rpmIndices,
        load: loadIndices,
      },
      weights: {
        rpm: rpmWeight,
        load: loadWeight,
      },
    };
  }

  /**
   * Find the two surrounding indices in an axis array
   */
  private findSurroundingIndices(axis: number[], value: number): [number, number] {
    // Handle edge cases
    if (value <= axis[0]) return [0, 0];
    if (value >= axis[axis.length - 1]) return [axis.length - 1, axis.length - 1];
  
    // Binary search for efficiency
    let left = 0;
    let right = axis.length - 1;
  
    while (right - left > 1) {
      const mid = Math.floor((left + right) / 2);
      if (axis[mid] <= value) {
        left = mid;
      } else {
        right = mid;
      }
    }
  
    return [left, right];
  }

  /**
   * Calculate interpolation weight (0 to 1)
   */
  private calculateWeight(lower: number, upper: number, value: number): number {
    if (lower === upper) return 0;
    return (value - lower) / (upper - lower);
  }

  /**
   * Perform bilinear interpolation
   * TODO: Implement bilinear interpolation algorithm
   * This is the core of the lookup table - it calculates values between grid points
   */
  private bilinearInterpolate(
    _rpmIndices: [number, number],
    _loadIndices: [number, number],
    _rpmWeight: number,
    _loadWeight: number,
  ): number {
    // TODO: Get the four corner values from the fuel data grid
    // const q11 = this.fuelData[rpmLow][loadLow];     (lower-left)
    // const q12 = this.fuelData[rpmLow][loadHigh];    (upper-left)
    // const q21 = this.fuelData[rpmHigh][loadLow];    (lower-right)
    // const q22 = this.fuelData[rpmHigh][loadHigh];   (upper-right)

    // TODO: Interpolate in RPM direction (horizontally)
    // r1 = q11 * (1 - rpmWeight) + q21 * rpmWeight
    // r2 = q12 * (1 - rpmWeight) + q22 * rpmWeight

    // TODO: Interpolate in load direction (vertically)
    // result = r1 * (1 - loadWeight) + r2 * loadWeight

    return 0; // Placeholder - return actual interpolated value
  }

  /**
   * Get the fuel data for visualization
   */
  getFuelData(): FuelMap2D {
    return this.fuelData;
  }

  /**
   * Get axis values
   */
  getAxes(): { rpm: number[]; load: number[] } {
    return {
      rpm: this.rpmAxis,
      load: this.loadAxis,
    };
  }
}
