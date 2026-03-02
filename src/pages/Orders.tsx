import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { OrderCard } from "@/components/OrderCard"
import { useAuth } from "@/contexts/AuthContext"
import { getOrdersByUser } from "@/services/order.service"
import type { Order } from "@/types/order"
import { MESSAGE_ORDER_HISTORY_EMPTY } from "@/constants/messages"
import { ROUTE_HOME } from "@/constants/routes"
import { Button } from "@/components/ui/button"

export const Orders = () => {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!user) {
      return
    }

    let isMounted = true

    const fetchOrders = async () => {
      const result = await getOrdersByUser(user.id)

      if (!isMounted) {
        return
      }

      if (!result.data && result.errorMessage) {
        setErrorMessage(result.errorMessage)
      } else if (result.data) {
        setOrders(result.data)
      }

      setLoading(false)
    }

    void fetchOrders()

    return () => {
      isMounted = false
    }
  }, [user])

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Order History
            </h1>
            <p className="text-gray-600">
              View your previous orders and their details.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white"
          >
            <Link to={ROUTE_HOME}>Back to home</Link>
          </Button>
        </header>

        {loading && (
          <p className="text-sm text-gray-600">Loading orders...</p>
        )}

        {!loading && errorMessage && (
          <p className="text-sm text-red-500">{errorMessage}</p>
        )}

        {!loading && !errorMessage && orders.length === 0 && (
          <p className="text-sm text-gray-600">
            {MESSAGE_ORDER_HISTORY_EMPTY}
          </p>
        )}

        {!loading && !errorMessage && orders.length > 0 && (
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

