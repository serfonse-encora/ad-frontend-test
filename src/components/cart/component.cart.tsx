'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import {
  CartItem,
  clearCart,
  getCartItems,
  getCartTotal,
  removeFromCart,
  updateCartItemQuantity,
} from '../../services/cart.service';

const ComponentCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Load cart items on component mount
  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = () => {
    try {
      const items = getCartItems();
      setCartItems(items);
    } catch (error) {
      // Handle error silently
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = (gameId: string) => {
    if (removeFromCart(gameId)) {
      loadCartItems(); // Reload cart items
    }
  };

  const _handleQuantityChange = (gameId: string, newQuantity: number) => {
    if (updateCartItemQuantity(gameId, newQuantity)) {
      loadCartItems(); // Reload cart items
    }
  };

  const _handleClearCart = () => {
    if (clearCart()) {
      loadCartItems(); // Reload cart items
    }
  };

  const formatPrice = (price: number) => {
    return price.toFixed(2);
  };

  if (loading) {
    return (
      <section className='pt-24 pb-48 cart'>
        <div className='container'>
          {/* Back Button */}
          <div className='mb-24 mt-24'>
            <Link
              href='/'
              className='text-grey-medium mt-24'
              style={{ textDecoration: 'none' }}
            >
              ← Back to Shop
            </Link>
          </div>
          <h1 className='font-weight-700 mb-48 text-grey-medium'>Your Cart</h1>
          <p>Loading cart...</p>
        </div>
      </section>
    );
  }

  if (cartItems.length === 0) {
    return (
      <section className='pt-24 pb-48 cart'>
        <div className='container'>
          {/* Back Button */}
          <div className='mb-24 mt-24'>
            <Link
              href='/'
              className='text-grey-medium mt-24'
              style={{ textDecoration: 'none' }}
            >
              ← Back to Shop
            </Link>
          </div>
          <h1 className='font-weight-700 mb-48 text-grey-medium'>Your Cart</h1>
          <div className='text-center mt-48'>
            <p className='text-body text-grey-medium'>Your cart is empty</p>
            <p className='text-reading text-grey-medium mt-12'>
              Add some games from our catalog to get started!
            </p>
          </div>
        </div>
      </section>
    );
  }

  const subtotal = getCartTotal();
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <section className='pt-24 pb-48 cart'>
      <div className='container'>
        {/* Back Button */}
        <div className='mb-24 mt-24'>
          <Link
            href='/'
            className='text-grey-medium '
            style={{ textDecoration: 'none' }}
          >
            ← Back to Shop
          </Link>
        </div>

        <div className='mb-48'>
          <h1 className='font-weight-700'>Shopping Cart</h1>
          <p className='text-grey-medium text-subtitle'>{totalItems} items</p>
        </div>

        {/* Main Cart Layout */}
        <div className='d-flex gap-48 flex-mobile'>
          {/* Left Side - Cart Items */}
          <div className='flex-2'>
            <div className='cart-items'>
              {cartItems.map((item, index) => (
                <div
                  key={item.game.id}
                  className={`card-cart flex-wrap p-24 mb-24 ${index === cartItems.length - 1 ? '' : ' border-bottom-grey'}`}
                >
                  <div className='d-flex gap-32 flex-wrap'>
                    <Image
                      src={item.game.image}
                      alt={item.game.name}
                      width={256}
                      height={156}
                      className='cart-item-image mr-1'
                    />

                    <div className='flex-1'>
                      <div className='d-flex justify-content-space-between'>
                        <p className='text-reading text-grey-medium mt-8'>
                          {item.game.genre}
                        </p>
                      </div>
                      <p className='text-xxl font-weight-700 text-grey mt-1'>
                        {item.game.name}
                      </p>
                      <p className='text-reading text-grey-medium mt-1'>
                        {item.game.description}
                      </p>
                    </div>
                    <p className='text-xxl text-grey-medium font-weight-700 mt-8 mt-auto'>
                      ${formatPrice(item.game.price)}
                    </p>
                    <a
                      className='ml-auto pointer'
                      onClick={() => handleRemoveItem(item.game.id)}
                    >
                      <Image
                        src='/remove.svg'
                        alt='Remove item'
                        width={12}
                        height={12}
                      />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Order Summary */}
          <div className='flex-1 full-width gap-24'>
            <div
              className='card p-24'
              style={{ position: 'sticky', top: '20px' }}
            >
              <h3 className='text-subtitle font-weight-700 mb-24'>
                Order Summary
              </h3>

              <div className='d-flex justify-content-space-between mb-12'>
                <span className='text-reading text-grey-medium'>
                  Subtotal ({totalItems} items)
                </span>
                <span className='text-reading font-weight-700'>
                  ${formatPrice(subtotal)}
                </span>
              </div>

              <div className='d-flex justify-content-space-between mb-12'>
                <span className='text-reading text-grey-medium'>Tax</span>
                <span className='text-reading font-weight-700'>
                  ${formatPrice(tax)}
                </span>
              </div>

              <div className='line-grey-separator' />

              <div className='d-flex justify-content-space-between mb-24'>
                <span className='text-subtitle font-weight-700'>Total</span>
                <span className='text-title font-weight-700 text-grey'>
                  ${formatPrice(total)}
                </span>
              </div>
            </div>
            <button className='button primary full-width mt-24'>
              Checkout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComponentCart;
