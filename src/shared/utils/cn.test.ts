/**
 * Unit tests for cn utility function
 */

import { describe, it, expect } from 'vitest';
import { cn } from './cn';

describe('cn', () => {
  it('should merge class names', () => {
    const result = cn('class1', 'class2');
    expect(result).toBe('class1 class2');
  });

  it('should handle conditional classes', () => {
    const isActive = true;
    const isDisabled = false;
    const result = cn('base', isActive && 'truthy', isDisabled && 'falsy');
    expect(result).toBe('base truthy');
  });

  it('should merge Tailwind classes correctly', () => {
    const result = cn('p-4', 'p-6');
    // tailwind-merge should keep only the last padding class
    expect(result).toBe('p-6');
  });

  it('should handle arrays of classes', () => {
    const result = cn(['class1', 'class2'], 'class3');
    expect(result).toContain('class1');
    expect(result).toContain('class2');
    expect(result).toContain('class3');
  });
});
