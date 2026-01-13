/**
 * Engine control panel with sliders for RPM and throttle
 * Objective 2: Interactive controls for visualization
 */

import { Card } from '@shared/components/Card';
import { Slider } from '@shared/components/Slider';

interface EngineControlPanelProps {
  rpm: number;
  onRpmChange: (value: number) => void;
  load: number;
  onLoadChange: (value: number) => void;
}

export function EngineControlPanel({ rpm, onRpmChange, load, onLoadChange }: EngineControlPanelProps) {
  return (
    <Card title="Engine Controls">
      <div className="space-y-6">
        <Slider label="Engine RPM" value={rpm} onChange={onRpmChange} min={1000} max={7000} step={100} unit=" RPM" />

        <Slider label="Throttle Position" value={load} onChange={onLoadChange} min={0} max={100} step={5} unit="%" />

        <div className="mt-6 p-4 bg-automotive-50 dark:bg-automotive-900/20 rounded-lg">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Current State</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600 dark:text-gray-400">RPM:</span>
              <span className="ml-2 font-semibold text-automotive-600 dark:text-automotive-400">
                {rpm}
              </span>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Load:</span>
              <span className="ml-2 font-semibold text-automotive-600 dark:text-automotive-400">
                {load}
                %
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
