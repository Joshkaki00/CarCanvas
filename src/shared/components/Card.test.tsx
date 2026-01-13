/**
 * Unit tests for Card component
 */

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  it('should render children', () => {
    const { getByText } = render(
      <Card>
        <div>Test Content</div>
      </Card>,
    );

    expect(getByText('Test Content')).toBeDefined();
  });

  it('should render title when provided', () => {
    const { getByText } = render(
      <Card title="Test Title">
        <div>Content</div>
      </Card>,
    );

    expect(getByText('Test Title')).toBeDefined();
  });

  it('should apply custom className', () => {
    const { container } = render(
      <Card className="custom-class">
        <div>Content</div>
      </Card>,
    );

    const cardElement = container.firstChild as HTMLElement;
    expect(cardElement.className).toContain('custom-class');
  });
});
