import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Order } from "@/types/order"

interface OrderCardProps {
  order: Order
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value)
}

export const OrderCard = ({ order }: OrderCardProps) => {
  const createdAt = new Date(order.createdAt)
  const displayDate = createdAt.toLocaleString("vi-VN")

  const totalItems = order.items.reduce(
    (total, item) => total + item.quantity,
    0,
  )

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-base font-semibold">
          Order #{order.id.slice(0, 8)}
        </CardTitle>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium uppercase tracking-wide text-blue-800">
          {order.status}
        </span>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-gray-600">Date: {displayDate}</p>
        <p className="text-sm text-gray-600">
          Items:{" "}
          <span className="font-semibold text-gray-900">{totalItems}</span>
        </p>
        <p className="text-sm text-gray-600">
          Total:{" "}
          <span className="font-semibold text-blue-900">
            {formatCurrency(order.totalPrice)}
          </span>
        </p>
      </CardContent>
    </Card>
  )
}

