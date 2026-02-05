import { useEffect, useState } from "react"
import { LOCAL_STORAGE_CART_KEY } from "@/constants/storage"
import type { CartItem } from "@/types/cart"

function loadInitialCart(): CartItem[] {
  if (typeof window === "undefined") {
    return []
  }

  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_CART_KEY)
    if (!raw) {
      return []
    }

    const parsed = JSON.parse(raw) as CartItem[]
    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed
  } catch {
    return []
  }
}

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>(() => loadInitialCart())

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    try {
      window.localStorage.setItem(
        LOCAL_STORAGE_CART_KEY,
        JSON.stringify(items),
      )
    } catch {
      // ignore write errors
    }
  }, [items])

  const addToCart = (payload: Omit<CartItem, "quantity">, quantity: number) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === payload.productId,
      )

      if (existingIndex === -1) {
        return [
          ...prev,
          {
            ...payload,
            quantity,
          },
        ]
      }

      const next = [...prev]
      const existing = next[existingIndex]

      next[existingIndex] = {
        ...existing,
        quantity: existing.quantity + quantity,
      }

      return next
    })
  }

  const removeFromCart = (productId: number) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId))
  }

  const updateQuantity = (productId: number, quantity: number) => {
    setItems((prev) => {
      if (quantity <= 0) {
        return prev.filter((item) => item.productId !== productId)
      }

      return prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item,
      )
    })
  }

  const clearCart = () => {
    setItems([])
  }

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  return {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  }
}


