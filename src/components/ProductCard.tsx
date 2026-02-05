import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ProductCardProps {
  name: string
  image: string
  description: string
  price: number
  onClick?: () => void
  onAddToCart?: (quantity: number) => void
}

export const ProductCard = ({
  name,
  image,
  description,
  price,
  onClick,
  onAddToCart,
}: ProductCardProps) => {
  const [quantity, setQuantity] = useState(1)

  const formattedPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price)

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
  }

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1)
  }

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()

    if (onAddToCart) {
      onAddToCart(quantity)
    }
  }

  return (
    <Card
      className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full cursor-pointer"
      onClick={onClick}
    >
      <div className="aspect-square w-full overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardHeader className="flex-1">
        <CardTitle className="line-clamp-2 min-h-[3.5rem]">{name}</CardTitle>
        <CardDescription className="line-clamp-3 text-sm text-gray-600 overflow-hidden">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-auto pt-0 space-y-3">
        <div className="flex items-center justify-between gap-4">
          <p className="text-2xl font-bold text-blue-900">{formattedPrice}</p>
          {/* Quantity selector */}
          <div
            className="flex items-center rounded-full border border-gray-300 bg-white px-3 py-1 text-sm shadow-sm"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="px-2 text-gray-600 hover:text-gray-900"
              onClick={handleDecrease}
            >
              -
            </button>
            <span className="w-8 text-center text-gray-900">{quantity}</span>
            <button
              type="button"
              className="px-2 text-gray-600 hover:text-gray-900"
              onClick={handleIncrease}
            >
              +
            </button>
          </div>
        </div>
        <Button
          className="w-full bg-blue-900 hover:bg-blue-800 text-white whitespace-nowrap"
          onClick={handleAddToCart}
        >
          Add to cart
        </Button>
      </CardContent>
    </Card>
  )
}

