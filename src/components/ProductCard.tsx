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
}

export const ProductCard = ({
  name,
  image,
  description,
  price,
  onClick,
}: ProductCardProps) => {
  const formattedPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price)

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
      <CardContent className="mt-auto pt-0">
        <div className="flex items-center justify-between gap-4">
          <p className="text-2xl font-bold text-blue-900">{formattedPrice}</p>
          <Button 
            className="bg-blue-900 hover:bg-blue-800 text-white whitespace-nowrap"
            onClick={(e) => e.stopPropagation()}
          >
            Buy
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

