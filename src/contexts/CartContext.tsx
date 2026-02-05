import { createContext, useContext } from "react"
import type { CartItem } from "@/types/cart"
import { useCart } from "@/hooks/use-cart"

interface CartContextValue {
  items: CartItem[]
  addToCart: (payload: Omit<CartItem, "quantity">, quantity: number) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

interface CartProviderProps {
  children: React.ReactNode
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const cart = useCart()

  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>
}

export const useCartContext = () => {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error("useCartContext must be used within CartProvider")
  }

  return context
}


