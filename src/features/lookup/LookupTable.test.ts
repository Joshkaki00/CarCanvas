/**
 * Unit tests for LookupTable class
 */

import { describe, it, expect } from 'vitest';
import { LookupTable } from './LookupTable';
import { createSampleFuelMap } from './sampleData';

describe('LookupTable', () => {
  it('should create a lookup table from config', () => {
    const config = createSampleFuelMap();
    const table = new LookupTable(config);
    expect(table).toBeDefined();
  });

  it('should perform lookup at exact table values', () => {
    const config = createSampleFuelMap();
    const table = new LookupTable(config);

    // Lookup at exact table position
    const result = table.lookup(3000, 50);

    expect(result.value).toBeGreaterThan(0);
    expect(result.indices).toBeDefined();
    expect(result.weights).toBeDefined();
  });

  it('should interpolate between table values', () => {
    const config = createSampleFuelMap();
    const table = new LookupTable(config);

    // Lookup at position requiring interpolation
    const result = table.lookup(2750, 45);

    expect(result.value).toBeGreaterThan(0);
    expect(result.weights.rpm).toBeGreaterThan(0);
    expect(result.weights.rpm).toBeLessThan(1);
    expect(result.weights.load).toBeGreaterThan(0);
    expect(result.weights.load).toBeLessThan(1);
  });

  it('should handle edge cases at table boundaries', () => {
    const config = createSampleFuelMap();
    const table = new LookupTable(config);

    // Test at minimum values
    const minResult = table.lookup(1000, 0);
    expect(minResult.value).toBeGreaterThan(0);

    // Test at maximum values
    const maxResult = table.lookup(7000, 100);
    expect(maxResult.value).toBeGreaterThan(0);
  });

  it('should return axes data', () => {
    const config = createSampleFuelMap();
    const table = new LookupTable(config);

    const axes = table.getAxes();
    expect(axes.rpm).toBeDefined();
    expect(axes.load).toBeDefined();
    expect(axes.rpm.length).toBeGreaterThan(0);
    expect(axes.load.length).toBeGreaterThan(0);
  });
});
