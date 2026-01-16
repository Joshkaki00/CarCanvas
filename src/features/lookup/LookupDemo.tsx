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

  return (
    <div className="space-y-6">
      <Card title="🎛️ Engine Control Inputs">
        <p className="text-gray-600 text-sm mb-4">
          Adjust these parameters to simulate different engine operating conditions
        </p>
        <div className="space-y-6">
          <Slider label="Engine RPM" value={rpm} onChange={setRpm} min={1000} max={7000} step={100} unit=" RPM" />
          <Slider label="Throttle Position" value={load} onChange={setLoad} min={0} max={100} step={1} unit="%" />
        </div>
      </Card>

      <Card title="⚡ Lookup Table Results">
        <p className="text-gray-600 text-sm mb-6">
          Using bilinear interpolation to calculate optimal fuel injection
        </p>
        
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="bg-gradient-to-br from-automotive-50 to-automotive-100 p-6 rounded-xl border-2 border-automotive-300 shadow-md">
            <p className="text-xs text-automotive-700 font-semibold uppercase tracking-wider mb-2">Fuel Injection Time</p>
            <p className="text-4xl font-bold text-automotive-600 font-digital">
              {result.value.toFixed(3)}
              <span className="text-lg text-gray-600 ml-2">ms</span>
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-xl border-2 border-emerald-300 shadow-md">
            <p className="text-xs text-emerald-700 font-semibold uppercase tracking-wider mb-2">Calculation Speed</p>
            <p className="text-4xl font-bold text-alert-success font-digital">
              {result.calculationTime < 0.01 
                ? result.calculationTime.toFixed(4) 
                : result.calculationTime.toFixed(2)}
              <span className="text-lg text-gray-600 ml-2">μs</span>
            </p>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200 space-y-2">
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-3">Interpolation Details</p>
          <div className="text-sm text-gray-700 space-y-1">
            <p>
              <span className="text-automotive-600 font-bold">RPM:</span> Between indices [{result.indices.rpm[0]}, {result.indices.rpm[1]}] - Weight: {result.weights.rpm.toFixed(3)}
            </p>
            <p>
              <span className="text-automotive-600 font-bold">Load:</span> Between indices [{result.indices.load[0]}, {result.indices.load[1]}] - Weight: {result.weights.load.toFixed(3)}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
