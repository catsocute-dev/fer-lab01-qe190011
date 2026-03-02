import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useCartContext } from "@/contexts/CartContext"
import { useAuth } from "@/contexts/AuthContext"
import { createOrder } from "@/services/order.service"
import { ROUTE_ORDERS } from "@/constants/routes"
import {
  MESSAGE_ORDER_CREATE_FAILED,
  MESSAGE_ORDER_EMPTY_CART,
} from "@/constants/messages"

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value)
}

export const Checkout = () => {
  const { items, getTotalPrice, clearCart } = useCartContext()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const totalPrice = getTotalPrice()

  const handlePlaceOrder = async () => {
    if (!user) {
      setErrorMessage(MESSAGE_ORDER_CREATE_FAILED)
      return
    }

    if (items.length === 0) {
      setErrorMessage(MESSAGE_ORDER_EMPTY_CART)
      return
    }

    setSubmitting(true)
    setErrorMessage(null)

    const orderItems = items.map((item) => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }))

    const result = await createOrder({
      userId: user.id,
      totalPrice,
      items: orderItems,
    })

    setSubmitting(false)

    if (!result.data) {
      setErrorMessage(result.errorMessage ?? MESSAGE_ORDER_CREATE_FAILED)
      return
    }

    clearCart()
    navigate(ROUTE_ORDERS)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mx-auto max-w-xl rounded-lg bg-white p-8 text-center shadow-sm">
            <h1 className="mb-4 text-2xl font-bold text-gray-900">
              Your cart is empty
            </h1>
            <p className="mb-6 text-gray-600">
              {MESSAGE_ORDER_EMPTY_CART}
            </p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600">
            Review your order before placing it.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
          <section className="space-y-4">
            {items.map((item) => (
              <div
                key={item.productId}
                className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {item.quantity} x {formatCurrency(item.price)}
                  </p>
                </div>
                <p className="text-sm font-semibold text-blue-900">
                  {formatCurrency(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </section>

          <aside className="h-fit rounded-lg bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Order Summary
            </h2>
            <div className="mb-4 flex items-center justify-between text-sm text-gray-700">
              <span>Subtotal</span>
              <span>{formatCurrency(totalPrice)}</span>
            </div>
            <div className="mb-6 flex items-center justify-between border-t pt-4">
              <span className="text-base font-semibold text-gray-900">
                Total
              </span>
              <span className="text-xl font-bold text-blue-900">
                {formatCurrency(totalPrice)}
              </span>
            </div>
            {errorMessage && (
              <p className="mb-3 text-sm text-red-500">{errorMessage}</p>
            )}
            <Button
              className="w-full bg-blue-900 hover:bg-blue-800 text-white"
              onClick={handlePlaceOrder}
              disabled={submitting}
            >
              {submitting ? "Placing order..." : "Place Order"}
            </Button>
          </aside>
        </div>
      </main>
    </div>
  )
}

