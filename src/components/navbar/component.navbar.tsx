'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { getCartItems } from '../../services/cart.service';

const ComponentNavbar = () => {
  const [_cartItemCount, setCartItemCount] = useState(0);

  // Update cart item count when cart changes
  useEffect(() => {
    const updateCartCount = () => {
      const items = getCartItems();
      const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
      setCartItemCount(totalItems);
    };

    updateCartCount();

    // Listen for storage changes to update cart count when items are added from other components
    const handleStorageChange = () => {
      updateCartCount();
    };

    window.addEventListener('storage', handleStorageChange);
    // Custom event for cart updates within the same tab
    window.addEventListener('cartUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleStorageChange);
    };
  }, []);

  return (
    <nav className='d-flex justify-content-space-between bg-surface-secondary pt-1 pb-1'>
      <h1 className='text-subtitle font-weight-700 text-grey'>GamerShop</h1>
      <Link href='/cart' className='my-auto text-body text-grey'>
        <Image
          className='my-auto'
          src='/cart.svg'
          alt='Cart'
          width={20}
          height={20}
        />
      </Link>
    </nav>
  );
};

export default ComponentNavbar;
