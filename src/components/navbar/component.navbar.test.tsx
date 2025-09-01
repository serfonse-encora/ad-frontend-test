import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';

import ComponentNavbar from './component.navbar';

// Mock Next.js Image and Link components
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

jest.mock('next/link', () => {
  return function MockLink({ href, children, className }: any) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  };
});

describe('ComponentNavbar', () => {
  it('renders the navbar with correct structure', () => {
    render(<ComponentNavbar />);

    // Check if the nav element is rendered
    const navbar = screen.getByRole('navigation');
    expect(navbar).toBeInTheDocument();
    expect(navbar).toHaveClass(
      'd-flex',
      'justify-content-space-between',
      'bg-surface-secondary',
      'p-1'
    );
  });

  it('displays the GamerShop brand text', () => {
    render(<ComponentNavbar />);

    const brandText = screen.getByText('GamerShop');
    expect(brandText).toBeInTheDocument();
    expect(brandText).toHaveClass(
      'text-subtitle',
      'font-weight-700',
      'text-grey'
    );
  });

  it('renders a cart link with correct href', () => {
    render(<ComponentNavbar />);

    const cartLink = screen.getByRole('link');
    expect(cartLink).toBeInTheDocument();
    expect(cartLink).toHaveAttribute('href', '/');
    expect(cartLink).toHaveClass('my-auto', 'text-body', 'text-grey');
  });

  it('displays the cart icon with correct attributes', () => {
    render(<ComponentNavbar />);

    const cartIcon = screen.getByAltText('Cart');
    expect(cartIcon).toBeInTheDocument();
    expect(cartIcon).toHaveAttribute('src', '/cart.svg');
    expect(cartIcon).toHaveAttribute('width', '20');
    expect(cartIcon).toHaveAttribute('height', '20');
    expect(cartIcon).toHaveClass('my-auto');
  });

  it('has the correct navbar layout structure', () => {
    render(<ComponentNavbar />);

    const navbar = screen.getByRole('navigation');
    const brandText = screen.getByText('GamerShop');
    const cartLink = screen.getByRole('link');

    // Verify that both brand and cart link are children of the navbar
    expect(navbar).toContainElement(brandText);
    expect(navbar).toContainElement(cartLink);
  });

  it('renders without crashing', () => {
    expect(() => render(<ComponentNavbar />)).not.toThrow();
  });
});
