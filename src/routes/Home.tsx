/**
 * Home page with project overview
 */

import { Link } from 'react-router-dom';
import { Card } from '@shared/components/Card';

export function Home() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
          CarFuelCanvas
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          How Core Data Structures Save Fuel in Cars
        </p>
      </div>

      <Card>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg">
            An interactive web application demonstrating how computer science data structures—specifically
            multidimensional arrays, lookup tables, and interpolation algorithms—are used in automotive Engine Control
            Units (ECUs) to optimize fuel efficiency.
          </p>

          <h3>Why This Matters</h3>
          <p>
            Modern cars contain sophisticated computers that make thousands of decisions per second. One critical
            decision is: how much fuel should be injected into each cylinder? The answer depends on engine speed (RPM),
            throttle position, temperature, and many other factors.
          </p>

          <p>
            ECUs use
            {' '}
            <strong>lookup tables</strong>
            {' '}
            and
            {' '}
            <strong>linear interpolation</strong>
            {' '}
            to make these calculations in
            microseconds. This project shows you exactly how it works.
          </p>
        </div>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        <ObjectiveCard
          number={1}
          title="Lookup Tables"
          description="Implement a working 3D lookup table system with linear interpolation for instant fuel calculations."
          link="/lookup"
        />

        <ObjectiveCard
          number={2}
          title="Visualization"
          description="Visualize fuel maps as interactive 2D surface plots showing how fuel varies with engine parameters."
          link="/visualization"
        />

        <ObjectiveCard
          number={3}
          title="Performance"
          description="Compare lookup tables vs. real-time calculation to understand the memory-speed tradeoff."
          link="/comparison"
        />
      </div>

      <Card>
        <div className="prose dark:prose-invert max-w-none">
          <h3>Educational Goals</h3>
          <ul>
            <li>Understand how multidimensional arrays represent complex real-world data</li>
            <li>Learn bilinear and trilinear interpolation algorithms</li>
            <li>Appreciate the performance implications of data structure choices</li>
            <li>Connect CS concepts to automotive engineering applications</li>
          </ul>
        </div>
      </Card>
    </div>
  );
}

interface ObjectiveCardProps {
  number: number;
  title: string;
  description: string;
  link: string;
}

function ObjectiveCard({ number, title, description, link }: ObjectiveCardProps) {
  return (
    <Link to={link} className="block group">
      <Card className="h-full transition-all hover:scale-105 hover:shadow-xl border-2 hover:border-automotive-400">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-automotive-500 to-automotive-600 text-white flex items-center 
                            justify-center font-bold text-2xl shadow-lg">
              {number}
            </div>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-automotive-600 transition-colors">
              {title}
            </h3>
          </div>
          <p className="text-gray-600 leading-relaxed">{description}</p>
          <div className="flex items-center text-automotive-600 font-semibold group-hover:text-automotive-500 transition-colors">
            Explore <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
