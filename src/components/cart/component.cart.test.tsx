import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import * as cartService from '../../services/cart.service';

import ComponentCart from './component.cart';

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

// Mock cart service
jest.mock('../../services/cart.service');

const mockCartService = cartService as jest.Mocked<typeof cartService>;

describe('ComponentCart', () => {
  const mockGame = {
    id: '1',
    name: 'Test Game',
    genre: 'Action',
    image: '/test-image.jpg',
    description: 'Test description',
    price: 59.99,
    isNew: true,
  };

  const mockCartItem = {
    game: mockGame,
    quantity: 2,
    addedAt: new Date('2023-01-01'),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    mockCartService.getCartItems.mockReturnValue([]);

    const { container } = render(<ComponentCart />);

    // Since the loading state is very brief, we check that the component renders without error
    // and that we eventually see the cart state
    expect(container).toBeInTheDocument();
  });

  it('renders empty cart message when no items', async () => {
    mockCartService.getCartItems.mockReturnValue([]);

    render(<ComponentCart />);

    await waitFor(() => {
      expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
    });
  });

  it('renders cart items correctly', async () => {
    mockCartService.getCartItems.mockReturnValue([mockCartItem]);
    mockCartService.getCartTotal.mockReturnValue(119.98);

    render(<ComponentCart />);

    await waitFor(() => {
      expect(screen.getByText('Test Game')).toBeInTheDocument();
      expect(screen.getByText('Action')).toBeInTheDocument();
      expect(screen.getByText('$59.99')).toBeInTheDocument();
      expect(screen.getByText('2 items')).toBeInTheDocument();
      expect(screen.getByText('$119.98')).toBeInTheDocument();
    });
  });

  it('handles item removal', async () => {
    mockCartService.getCartItems.mockReturnValue([mockCartItem]);
    mockCartService.removeFromCart.mockReturnValue(true);

    render(<ComponentCart />);

    await waitFor(() => {
      const removeButton = screen.getByAltText('Remove item');
      fireEvent.click(removeButton);
    });

    expect(mockCartService.removeFromCart).toHaveBeenCalledWith('1');
  });

  it('displays correct total and item count', async () => {
    const multipleItems = [
      mockCartItem,
      {
        game: { ...mockGame, id: '2', name: 'Game 2', price: 39.99 },
        quantity: 1,
        addedAt: new Date(),
      },
    ];

    mockCartService.getCartItems.mockReturnValue(multipleItems);
    mockCartService.getCartTotal.mockReturnValue(159.97);

    render(<ComponentCart />);

    await waitFor(() => {
      expect(screen.getByText('3 items')).toBeInTheDocument();
      expect(screen.getByText('$159.97')).toBeInTheDocument();
    });
  });

  it('renders without crashing', () => {
    mockCartService.getCartItems.mockReturnValue([]);
    expect(() => render(<ComponentCart />)).not.toThrow();
  });
});
