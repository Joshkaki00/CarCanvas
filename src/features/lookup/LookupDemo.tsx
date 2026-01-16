/**
 * Interactive demo component for Lookup Table feature
 * Objective 1: Demonstrate 2D/3D lookup with interpolation
 */

import { useState } from 'react';
import { Card } from '@shared/components/Card';
import { Slider } from '@shared/components/Slider';
import { useFuelCalculation } from './useFuelCalculation';

export function LookupDemo() {
  const [rpm, setRpm] = useState(3000);
  const [load, setLoad] = useState(50);

  const { calculateFuel } = useFuelCalculation();
  const result = calculateFuel(rpm, load);
  
  // Debug: Log the actual calculation time
  console.log('Calculation time:', result.calculationTime, 'μs');

  return (
    <div className="space-y-6">
      <Card title="Engine Parameters">
        <div className="space-y-6">
          <Slider label="Engine RPM" value={rpm} onChange={setRpm} min={1000} max={7000} step={100} unit=" RPM" />

          <Slider label="Throttle Position" value={load} onChange={setLoad} min={0} max={100} step={1} unit="%" />
        </div>
      </Card>

      <Card title="Fuel Calculation Results">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Fuel Injection Time</p>
            <p className="text-2xl font-bold text-automotive-600 dark:text-automotive-400">
              {result.value.toFixed(3)}
              {' '}
              ms
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Calculation Time</p>
            <p className="text-2xl font-bold text-engine-600 dark:text-engine-400">
              {result.calculationTime < 0.01 
                ? result.calculationTime.toFixed(4) 
                : result.calculationTime.toFixed(2)}
              {' '}
              μs
            </p>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          <p>
            RPM Indices: [
            {result.indices.rpm[0]}
            ,
            {' '}
            {result.indices.rpm[1]}
            ] (weight:
            {' '}
            {result.weights.rpm.toFixed(3)}
            )
          </p>
          <p>
            Load Indices: [
            {result.indices.load[0]}
            ,
            {' '}
            {result.indices.load[1]}
            ] (weight:
            {' '}
            {result.weights.load.toFixed(3)}
            )
          </p>
        </div>
      </Card>
    </div>
  );
}
