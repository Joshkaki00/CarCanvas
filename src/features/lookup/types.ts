/**
 * Types for the Lookup Table feature (Objective 1)
 */

export type FuelMap2D = number[][];
export type FuelMap3D = number[][][];

export interface LookupTableConfig {
  rpmAxis: number[];
  loadAxis: number[];
  temperatureAxis?: number[];
  fuelData: FuelMap2D | FuelMap3D;
}

export interface InterpolationResult {
  value: number;
  indices: {
    rpm: [number, number];
    load: [number, number];
    temperature?: [number, number];
  };
  weights: {
    rpm: number;
    load: number;
    temperature?: number;
  };
}
