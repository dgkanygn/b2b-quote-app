import { useCartContext } from '../../../context/CartContext';

export const useCart = () => {
  const { items, updateQuantity, removeFromCart, totalItems, isEmpty, clearCart } = useCartContext();

  return {
    items,
    updateQuantity,
    removeItem: removeFromCart,
    totalItems,
    isEmpty,
    clearCart
  };
};
