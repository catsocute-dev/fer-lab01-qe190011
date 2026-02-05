import { Button } from "@/components/ui/button"
import type { CartItem as CartItemType } from "@/types/cart"

interface CartItemProps {
  item: CartItemType
  onIncrease: () => void
  onDecrease: () => void
  onRemove: () => void
}

export const CartItem = ({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemProps) => {
  const formattedPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(item.price)

  const formattedSubtotal = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(item.price * item.quantity)

  return (
    <div className="flex gap-4 rounded-lg border bg-white p-4 shadow-sm">
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md bg-gray-100">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between gap-2">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-gray-900 line-clamp-2">
              {item.name}
            </p>
            <p className="mt-1 text-sm text-gray-500">{formattedPrice}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={onRemove}
          >
            Remove
          </Button>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center rounded-full border border-gray-300 bg-white px-3 py-1 text-sm shadow-sm">
            <button
              type="button"
              className="px-2 text-gray-600 hover:text-gray-900"
              onClick={onDecrease}
            >
              -
            </button>
            <span className="w-8 text-center text-gray-900">
              {item.quantity}
            </span>
            <button
              type="button"
              className="px-2 text-gray-600 hover:text-gray-900"
              onClick={onIncrease}
            >
              +
            </button>
          </div>

          <p className="text-sm font-semibold text-blue-900">
            {formattedSubtotal}
          </p>
        </div>
      </div>
    </div>
  )
}


