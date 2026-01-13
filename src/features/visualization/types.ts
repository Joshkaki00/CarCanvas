/**
 * Types for the Visualization feature (Objective 2)
 */

export interface ChartDataPoint {
  rpm: number;
  load: number;
  fuel: number;
}

export interface SurfacePlotData {
  data: ChartDataPoint[];
  currentPoint?: {
    rpm: number;
    load: number;
    fuel: number;
  };
}
