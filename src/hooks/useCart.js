import useLocalStorage from './useLocalStorage';

/**
 * useCart — Single Responsibility (SOLID-S)
 * All cart mutation logic lives here.
 * Components call addItem / removeItem / updateQty / clearCart.
 */
function useCart() {
  const [cart, setCart] = useLocalStorage('cart', []);

  const addItem = (product) => {
    if (!product.available) return;
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeItem = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev.map((i) => i.id === id ? { ...i, qty: i.qty + delta } : i).filter((i) => i.qty > 0)
    );
  };

  const clearCart = () => setCart([]);

  const itemCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const subtotal  = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return { cart, addItem, removeItem, updateQty, clearCart, itemCount, subtotal };
}

export default useCart;
