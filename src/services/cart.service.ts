/**
 * Service for handling cart operations with localStorage
 */

import { Game } from './games.service';

export interface CartItem {
  game: Game;
  quantity: number;
  addedAt: Date;
}

const CART_STORAGE_KEY = 'gamershop_cart';

/**
 * Get all items from the cart
 * @returns CartItem[] Array of cart items
 */
export const getCartItems = (): CartItem[] => {
  try {
    const cartData = localStorage.getItem(CART_STORAGE_KEY);
    if (!cartData) {
      return [];
    }

    const items = JSON.parse(cartData);
    // Convert addedAt string back to Date object
    return items.map((item: any) => ({
      ...item,
      addedAt: new Date(item.addedAt),
    }));
  } catch (error) {
    return [];
  }
};

/**
 * Save cart items to localStorage
 * @param items Array of cart items to save
 */
const saveCartItems = (items: CartItem[]): void => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    // Dispatch custom event to notify other components of cart changes
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  } catch (error) {
    // Handle error silently
  }
};

/**
 * Add a game to the cart
 * @param game Game to add to cart
 * @param quantity Quantity to add (default: 1)
 * @returns boolean True if successful
 */
export const addToCart = (game: Game, quantity: number = 1): boolean => {
  try {
    const cartItems = getCartItems();
    const existingItemIndex = cartItems.findIndex(
      item => item.game.id === game.id
    );

    if (existingItemIndex >= 0) {
      // Update quantity if item already exists
      cartItems[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      cartItems.push({
        game,
        quantity,
        addedAt: new Date(),
      });
    }

    saveCartItems(cartItems);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Remove a game from the cart
 * @param gameId ID of the game to remove
 * @returns boolean True if successful
 */
export const removeFromCart = (gameId: string): boolean => {
  try {
    const cartItems = getCartItems();
    const filteredItems = cartItems.filter(item => item.game.id !== gameId);
    saveCartItems(filteredItems);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Update quantity of a specific item in cart
 * @param gameId ID of the game to update
 * @param quantity New quantity
 * @returns boolean True if successful
 */
export const updateCartItemQuantity = (
  gameId: string,
  quantity: number
): boolean => {
  try {
    if (quantity <= 0) {
      return removeFromCart(gameId);
    }

    const cartItems = getCartItems();
    const itemIndex = cartItems.findIndex(item => item.game.id === gameId);

    if (itemIndex >= 0) {
      cartItems[itemIndex].quantity = quantity;
      saveCartItems(cartItems);
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
};

/**
 * Clear all items from the cart
 * @returns boolean True if successful
 */
export const clearCart = (): boolean => {
  try {
    localStorage.removeItem(CART_STORAGE_KEY);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Get total number of items in cart
 * @returns number Total quantity of all items
 */
export const getCartItemCount = (): number => {
  const cartItems = getCartItems();
  return cartItems.reduce((total, item) => total + item.quantity, 0);
};

/**
 * Get total price of all items in cart
 * @returns number Total price
 */
export const getCartTotal = (): number => {
  const cartItems = getCartItems();
  return cartItems.reduce(
    (total, item) => total + item.game.price * item.quantity,
    0
  );
};

/**
 * Check if a game is in the cart
 * @param gameId ID of the game to check
 * @returns boolean True if game is in cart
 */
export const isGameInCart = (gameId: string): boolean => {
  const cartItems = getCartItems();
  return cartItems.some(item => item.game.id === gameId);
};
