import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { CartItem } from "@/components/CartItem"
import { useCartContext } from "@/contexts/CartContext"

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value)
}

export const Cart = () => {
  const {
    items,
    updateQuantity,
    removeFromCart,
    getTotalItems,
    getTotalPrice,
  } = useCartContext()

  const totalItems = getTotalItems()
  const totalPrice = getTotalPrice()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mx-auto max-w-xl rounded-lg bg-white p-8 text-center shadow-sm">
            <h1 className="mb-4 text-2xl font-bold text-gray-900">
              Your cart is empty
            </h1>
            <p className="mb-6 text-gray-600">
              Looks like you have not added anything to your cart yet.
            </p>
            <Button asChild className="bg-blue-900 hover:bg-blue-800 text-white">
              <Link to="/home">Continue shopping</Link>
            </Button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
            <p className="text-gray-600">
              You have {totalItems} item{totalItems > 1 ? "s" : ""} in your cart.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white"
          >
            <Link to="/home">Continue shopping</Link>
          </Button>
        </header>

        <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
          {/* Cart items list */}
          <section className="space-y-4">
            {items.map((item) => (
              <CartItem
                key={item.productId}
                item={item}
                onIncrease={() =>
                  updateQuantity(item.productId, item.quantity + 1)
                }
                onDecrease={() =>
                  updateQuantity(item.productId, item.quantity - 1)
                }
                onRemove={() => removeFromCart(item.productId)}
              />
            ))}
          </section>

          {/* Summary */}
          <aside className="h-fit rounded-lg bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Order Summary
            </h2>
            <div className="mb-4 flex items-center justify-between text-sm text-gray-700">
              <span>Items</span>
              <span>{totalItems}</span>
            </div>
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
            <Button className="w-full bg-blue-900 hover:bg-blue-800 text-white">
              Checkout
            </Button>
          </aside>
        </div>
      </main>
    </div>
  )
}


