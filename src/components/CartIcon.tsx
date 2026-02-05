import { ShoppingCart } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useCartContext } from "@/contexts/CartContext"

export const CartIcon = () => {
  const { getTotalItems } = useCartContext()
  const totalItems = getTotalItems()

  return (
    <Button
      asChild
      variant="ghost"
      className="relative flex items-center gap-2 text-blue-900 hover:text-blue-900 hover:bg-blue-50"
    >
      <Link to="/cart">
        <ShoppingCart className="h-5 w-5" />
        {totalItems > 0 && (
          <span className="absolute -right-2 -top-2 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-semibold text-white">
            {totalItems}
          </span>
        )}
      </Link>
    </Button>
  )
}


