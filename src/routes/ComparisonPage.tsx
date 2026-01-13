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

      <div className="prose dark:prose-invert max-w-none">
        <h2>The Memory-Speed Tradeoff</h2>
        <p>
          In computer science, we often face a fundamental tradeoff: we can either compute values as needed (saving
          memory) or pre-compute and store them (using more memory but executing faster). For real-time embedded
          systems like ECUs, speed is critical.
        </p>

        <h3>Why Speed Matters in ECUs</h3>
        <p>
          An ECU must calculate fuel injection amounts thousands of times per second. At 3000 RPM, each cylinder fires
          25 times per second (in a 4-stroke engine). With multiple cylinders, the ECU performs fuel calculations
          hundreds or thousands of times per second.
        </p>

        <p>
          If each calculation takes too long, the ECU can&apos;t keep up with the engine&apos;s demands, leading to
          poor
          performance, increased emissions, and reduced fuel efficiency.
        </p>

        <h3>Data Structure Impact</h3>
        <ul>
          <li>
            <strong>Lookup Tables:</strong>
            {' '}
            O(1) or O(log n) access time, predictable performance
          </li>
          <li>
            <strong>Direct Calculation:</strong>
            {' '}
            O(n) or worse, variable performance based on input
          </li>
          <li>
            <strong>Memory Cost:</strong>
            {' '}
            Lookup tables require storing pre-computed values (typically a few KB)
          </li>
          <li>
            <strong>Flexibility:</strong>
            {' '}
            Tables can be tuned/calibrated without changing code
          </li>
        </ul>

        <h3>Real-World Application</h3>
        <p>
          This same principle applies to many domains: video game physics engines, financial trading systems, graphics
          rendering, and more. Understanding when to pre-compute vs. calculate on-the-fly is a fundamental skill in
          software engineering.
        </p>
      </div>
    </div>
  );
}
