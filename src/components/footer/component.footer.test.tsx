import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';

import ComponentFooter from './component.footer';

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function MockImage({ src, alt, width, height, className }: any) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
      />
    );
  };
});

describe('ComponentFooter', () => {
  it('renders the footer with correct structure', () => {
    const { container } = render(<ComponentFooter />);

    // Check if the footer element is rendered
    const footer = container.querySelector('footer');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass('bg-neutral-700', 'text-center');
  });

  it('displays the Apply Digital logo with correct attributes', () => {
    render(<ComponentFooter />);

    const logo = screen.getByAltText('Apply Digital Logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/Apply_Digital_Logo.svg');
    expect(logo).toHaveAttribute('width', '170');
    expect(logo).toHaveAttribute('height', '44');
    expect(logo).toHaveClass('my-auto');
  });

  it('renders the footer as a footer element', () => {
    const { container } = render(<ComponentFooter />);

    const footer = container.querySelector('footer');
    expect(footer?.tagName).toBe('FOOTER');
  });

  it('has the correct footer structure with logo', () => {
    const { container } = render(<ComponentFooter />);

    const footer = container.querySelector('footer');
    const logo = screen.getByAltText('Apply Digital Logo');

    // Verify that logo is a child of the footer
    expect(footer).toContainElement(logo);
  });

  it('renders without crashing', () => {
    expect(() => render(<ComponentFooter />)).not.toThrow();
  });

  it('applies correct styling classes', () => {
    const { container } = render(<ComponentFooter />);

    const footer = container.querySelector('footer');
    const logo = screen.getByAltText('Apply Digital Logo');

    // Verify footer has correct background and text alignment classes
    expect(footer).toHaveClass('bg-neutral-700');
    expect(footer).toHaveClass('text-center');

    // Verify logo has correct margin class
    expect(logo).toHaveClass('my-auto');
  });

  it('uses the correct logo source path', () => {
    render(<ComponentFooter />);

    const logo = screen.getByAltText('Apply Digital Logo');
    expect(logo).toHaveAttribute('src', '/Apply_Digital_Logo.svg');
  });

  it('has proper logo dimensions', () => {
    render(<ComponentFooter />);

    const logo = screen.getByAltText('Apply Digital Logo');
    expect(logo).toHaveAttribute('width', '170');
    expect(logo).toHaveAttribute('height', '44');
  });
});
