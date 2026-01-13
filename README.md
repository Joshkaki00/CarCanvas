# CarFuelCanvas

**How Core Data Structures Save Fuel in Cars**

An interactive web application demonstrating how computer science data structures—specifically multidimensional arrays, lookup tables, and interpolation algorithms—are used in automotive Engine Control Units (ECUs) to optimize fuel efficiency.

## Project Overview

This is a Senior Intensive project by Joshua Kakinuki that bridges the gap between introductory CS data structures and real-world automotive engineering. The application shows students that the arrays, interpolation, and lookup concepts they learn in class directly impact fuel economy in modern vehicles.

## Tech Stack

- **React 19** with **TypeScript** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **React Router** - Navigation
- **Vitest** - Testing framework
- **ESLint (Airbnb)** - Code linting and style enforcement

## Features

### Objective 1: Lookup Tables & Interpolation

- Working 3D lookup table system with linear interpolation
- Real-time fuel injection calculations based on engine parameters (RPM, throttle position)
- Interactive demo showing interpolation weights and indices

### Objective 2: Interactive Visualization

- 2D surface plot visualization of fuel maps
- Interactive controls for adjusting engine parameters
- Real-time updates showing how fuel varies with RPM and load

### Objective 3: Performance Comparison

- Side-by-side comparison of lookup tables vs. real-time calculation
- Performance benchmarking showing timing differences
- Educational content explaining the memory-speed tradeoff

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Testing

```bash
# Run tests
npm test

# Run tests with UI
npm run test:ui
```

### Linting

```bash
# Check for linting errors
npm run lint

# Fix linting errors automatically
npm run lint:fix
```

## Project Structure

```
src/
├── features/          # Feature-based modules
│   ├── lookup/       # Objective 1: Lookup tables
│   ├── visualization/ # Objective 2: Visualizations
│   └── comparison/   # Objective 3: Performance comparison
├── shared/           # Shared components and utilities
│   ├── components/   # Reusable UI components
│   ├── types/       # TypeScript type definitions
│   └── utils/       # Utility functions
└── routes/          # Page components
```

## Educational Goals

- Understand how multidimensional arrays represent complex real-world data
- Learn bilinear and trilinear interpolation algorithms
- Appreciate the performance implications of data structure choices
- Connect CS concepts to automotive engineering applications

## How ECUs Use Lookup Tables

Modern automotive ECUs make thousands of decisions per second. To calculate optimal fuel injection:

1. **Pre-compute** fuel values for a grid of engine conditions (RPM × Load)
2. **Store** these values in a 2D or 3D array (the "fuel map")
3. **Use interpolation** to calculate values between grid points
4. **Execute** in microseconds with predictable timing

This approach trades memory (storing the table) for speed (instant lookups), which is critical for real-time embedded systems.

## License

This project is for educational purposes as part of a Senior Intensive project.

## Author

Joshua Kakinuki
