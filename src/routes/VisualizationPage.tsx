/**
 * Visualization demonstration page (Objective 2)
 */

import { useState } from 'react';
import { Card } from '@shared/components/Card';
import { FuelMapChart } from '@features/visualization/FuelMapChart';
import { EngineControlPanel } from '@features/visualization/EngineControlPanel';
import { useFuelCalculation } from '@features/lookup/useFuelCalculation';

export function VisualizationPage() {
  const [rpm, setRpm] = useState(3000);
  const [load, setLoad] = useState(50);

  const { getFuelMapData, getAxes, calculateFuel } = useFuelCalculation();
  const fuelData = getFuelMapData();
  const axes = getAxes();
  const result = calculateFuel(rpm, load);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="space-y-3 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Objective 2: Interactive Fuel Map Visualization
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl leading-normal">
          Visualize how fuel injection time varies across different engine operating conditions.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card title="Fuel Map Visualization">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Each line represents a different load level (0-100% throttle). The chart shows how fuel injection time
              varies with RPM.
            </p>
            <FuelMapChart data={fuelData} rpmAxis={axes.rpm} loadAxis={axes.load} currentRpm={rpm} currentLoad={load} />
          </Card>
        </div>

        <div className="space-y-6">
          <EngineControlPanel rpm={rpm} onRpmChange={setRpm} load={load} onLoadChange={setLoad} />

          <Card title="Current Calculation">
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Fuel Injection Time</p>
                <p className="text-3xl font-bold text-automotive-600 dark:text-automotive-400">
                  {result.value.toFixed(3)}
                  {' '}
                  ms
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Calculation Time</p>
                <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {result.calculationTime.toFixed(2)}
                  {' '}
                  μs
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <h2>Understanding the Visualization</h2>
        <p>
          The fuel map shows how injection time increases with both RPM and load. At low RPM and low load (idle), the
          engine needs minimal fuel. As RPM increases (engine working harder) or load increases (driver pressing
          throttle), more fuel is needed.
        </p>

        <h3>Key Observations</h3>
        <ul>
          <li>
            <strong>Load Effect:</strong>
            {' '}
            Higher throttle positions (upper lines) require more fuel
          </li>
          <li>
            <strong>RPM Effect:</strong>
            {' '}
            Fuel needs generally increase with engine speed
          </li>
          <li>
            <strong>Non-Linear Relationship:</strong>
            {' '}
            The relationship isn&apos;t perfectly linear, which is why lookup
            tables are valuable
          </li>
          <li>
            <strong>Interpolation:</strong>
            {' '}
            Values between lines are calculated using bilinear interpolation
          </li>
        </ul>
      </div>
    </div>
  );
}
