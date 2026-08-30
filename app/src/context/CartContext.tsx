import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

export type CartProduct = { id: string; name: string; price: number; image: string };
export type CartItem = CartProduct & { quantity: number };
type CartValue = { items: CartItem[]; add: (product: CartProduct) => void; changeQuantity: (id: string, quantity: number) => void; remove: (id: string) => void; clear: () => void; total: number; count: number };
const CartContext = createContext<CartValue | undefined>(undefined);
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const add = (product: CartProduct) => setItems(current => { const item = current.find(value => value.id === product.id); return item ? current.map(value => value.id === product.id ? { ...value, quantity: value.quantity + 1 } : value) : [...current, { ...product, quantity: 1 }]; });
  const changeQuantity = (id: string, quantity: number) => setItems(current => quantity < 1 ? current.filter(item => item.id !== id) : current.map(item => item.id === id ? { ...item, quantity } : item));
  const value = useMemo(() => ({ items, add, changeQuantity, remove: (id: string) => setItems(current => current.filter(item => item.id !== id)), clear: () => setItems([]), total: items.reduce((sum, item) => sum + item.price * item.quantity, 0), count: items.reduce((sum, item) => sum + item.quantity, 0) }), [items]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export function useCart() { const value = useContext(CartContext); if (!value) throw new Error('useCart deve ser usado dentro de CartProvider'); return value; }
