import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { useAuth } from './AuthContext';

export type CartProduct = { id: string; name: string; price: number; image: string };
export type CartItem = CartProduct & { quantity: number };
type CartValue = { items: CartItem[]; isLoading: boolean; add: (product: CartProduct) => Promise<void>; changeQuantity: (id: string, quantity: number) => Promise<void>; remove: (id: string) => Promise<void>; clear: () => Promise<void>; total: number; count: number };
const CartContext = createContext<CartValue | undefined>(undefined);
const message = (error: { message?: string } | null) => error?.message ?? 'Não foi possível salvar o carrinho.';

export function CartProvider({ children }: { children: ReactNode }) {
  const { user, isInitializing } = useAuth(); const [items, setItems] = useState<CartItem[]>([]); const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    let active = true;
    const load = async () => {
      if (isInitializing) return;
      if (!user) { if (active) { setItems([]); setIsLoading(false); } return; }
      setIsLoading(true);
      const { data, error } = await supabase.from('cart_items').select('product_id, name, price, image_url, quantity').order('created_at');
      if (active) { setItems(error ? [] : (data ?? []).map(item => ({ id: item.product_id, name: item.name, price: Number(item.price), image: item.image_url, quantity: item.quantity }))); setIsLoading(false); }
    };
    load(); return () => { active = false; };
  }, [user?.id, isInitializing]);
  const mustBeSignedIn = () => { if (!user) throw new Error('Entre na sua conta para salvar produtos no carrinho.'); return user; };
  const add = async (product: CartProduct) => { const currentUser = mustBeSignedIn(); const existing = items.find(item => item.id === product.id); const quantity = (existing?.quantity ?? 0) + 1; const { error } = await supabase.from('cart_items').upsert({ user_id: currentUser.id, product_id: product.id, name: product.name, price: product.price, image_url: product.image, quantity }, { onConflict: 'user_id,product_id' }); if (error) throw new Error(message(error)); setItems(current => existing ? current.map(item => item.id === product.id ? { ...item, quantity } : item) : [...current, { ...product, quantity }]); };
  const changeQuantity = async (id: string, quantity: number) => { mustBeSignedIn(); if (quantity < 1) return remove(id); const { error } = await supabase.from('cart_items').update({ quantity }).eq('product_id', id); if (error) throw new Error(message(error)); setItems(current => current.map(item => item.id === id ? { ...item, quantity } : item)); };
  const remove = async (id: string) => { mustBeSignedIn(); const { error } = await supabase.from('cart_items').delete().eq('product_id', id); if (error) throw new Error(message(error)); setItems(current => current.filter(item => item.id !== id)); };
  const clear = async () => { mustBeSignedIn(); const { error } = await supabase.from('cart_items').delete().neq('id', '00000000-0000-0000-0000-000000000000'); if (error) throw new Error(message(error)); setItems([]); };
  const value = useMemo(() => ({ items, isLoading, add, changeQuantity, remove, clear, total: items.reduce((sum, item) => sum + item.price * item.quantity, 0), count: items.reduce((sum, item) => sum + item.quantity, 0) }), [items, isLoading]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export function useCart() { const value = useContext(CartContext); if (!value) throw new Error('useCart deve ser usado dentro de CartProvider'); return value; }
