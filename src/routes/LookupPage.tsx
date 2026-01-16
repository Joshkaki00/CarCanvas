/**
 * Lookup Table demonstration page (Objective 1)
 */

import { LookupDemo } from '@features/lookup/LookupDemo';

export function LookupPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-3 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Objective 1: Lookup Tables & Interpolation
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl leading-normal">
          Experience how ECUs use 2D/3D lookup tables with linear interpolation to calculate optimal fuel injection in
          real-time.
        </p>
      </div>

      <LookupDemo />

      <div className="prose dark:prose-invert max-w-none">
        <h2>How It Works</h2>
        <p>
          The lookup table stores pre-computed fuel values for specific combinations of RPM and throttle position. When
          the engine operates at values between table entries, the system uses
          {' '}
          <strong>bilinear interpolation</strong>
          {' '}
          to
          calculate the exact fuel amount.
        </p>

        <h3>Bilinear Interpolation Algorithm</h3>
        <ol>
          <li>Find the four surrounding points in the 2D table</li>
          <li>Calculate interpolation weights based on distance from known points</li>
          <li>Perform linear interpolation in the RPM direction</li>
          <li>Perform linear interpolation in the load direction</li>
          <li>Return the interpolated value</li>
        </ol>

        <h3>Why This Matters</h3>
        <p>
          Real ECUs use this exact technique to make decisions in microseconds. The lookup table is stored in the
          ECU&apos;s memory, and the interpolation algorithm runs on the microprocessor. This combination of data
          structures and algorithms enables precise fuel control that optimizes both performance and efficiency.
        </p>
      </div>
    </div>
  );
}
