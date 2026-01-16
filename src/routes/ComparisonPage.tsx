/**
 * Performance comparison page (Objective 3)
 */

import { PerformanceComparison } from '@features/comparison/PerformanceComparison';

export function ComparisonPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Objective 3: Performance Comparison
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Discover why ECUs use lookup tables instead of calculating fuel values in real-time.
        </p>
      </div>

      <PerformanceComparison />

      <div className="max-w-3xl space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The Memory-Speed Tradeoff</h2>
        <p className="text-gray-700 leading-relaxed">
          In computer science, we often face a fundamental tradeoff: we can either compute values as needed (saving
          memory) or pre-compute and store them (using more memory but executing faster). For real-time embedded
          systems like ECUs, speed is critical.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Why Speed Matters in ECUs</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          An ECU must calculate fuel injection amounts thousands of times per second. At 3000 RPM, each cylinder fires
          25 times per second (in a 4-stroke engine). With multiple cylinders, the ECU performs fuel calculations
          hundreds or thousands of times per second.
        </p>

        <p className="text-gray-700 leading-relaxed">
          If each calculation takes too long, the ECU can't keep up with the engine's demands, leading to poor
          performance, increased emissions, and reduced fuel efficiency.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Data Structure Impact</h3>
        <ul className="space-y-2 text-gray-700 leading-relaxed list-none">
          <li>
            <strong>Lookup Tables:</strong> O(1) or O(log n) access time, predictable performance
          </li>
          <li>
            <strong>Direct Calculation:</strong> O(n) or worse, variable performance based on input
          </li>
          <li>
            <strong>Memory Cost:</strong> Lookup tables require storing pre-computed values (typically a few KB)
          </li>
          <li>
            <strong>Flexibility:</strong> Tables can be tuned/calibrated without changing code
          </li>
        </ul>

        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Real-World Application</h3>
        <p className="text-gray-700 leading-relaxed">
          This same principle applies to many domains: video game physics engines, financial trading systems, graphics
          rendering, and more. Understanding when to pre-compute vs. calculate on-the-fly is a fundamental skill in
          software engineering.
        </p>
      </div>
    </div>
  );
}
