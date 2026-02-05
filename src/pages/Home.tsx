import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { ProductCard } from "@/components/ProductCard"
import { products, type Product } from "@/data/products"
import { CartIcon } from "@/components/CartIcon"
import { useCartContext } from "@/contexts/CartContext"

export const Home = () => {
  const { addToCart } = useCartContext()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setIsDialogOpen(true)
  }

  const formattedPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/home" className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-blue-900">Your logo</h1>
            </Link>

            {/* Navigation Buttons + Cart */}
            <div className="flex items-center gap-4">
              <Button
                asChild
                variant="outline"
                className="border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white"
              >
                <Link to="/login">Login</Link>
              </Button>
              <Button
                asChild
                className="bg-blue-900 hover:bg-blue-800 text-white"
              >
                <Link to="/register">Register</Link>
              </Button>
              <CartIcon />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Our Products
          </h2>
          <p className="text-gray-600">
            Discover our amazing collection of products
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              image={product.image}
              description={product.description}
              price={product.price}
              onClick={() => handleProductClick(product)}
              onAddToCart={(quantity) =>
                addToCart(
                  {
                    productId: product.id,
                    name: product.name,
                    image: product.image,
                    price: product.price,
                  },
                  quantity,
                )
              }
            />
          ))}
        </div>
      </main>

      {/* Product Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedProduct && (
            <div className="space-y-6">
              {/* Product Image - Top */}
              <div className="w-full aspect-video overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Information */}
              <div className="space-y-4">
                {/* Title and Basic Info */}
                <div>
                  <DialogTitle className="text-3xl font-bold mb-2">
                    {selectedProduct.name}
                  </DialogTitle>
                  <DialogDescription className="text-base text-gray-600">
                    {selectedProduct.description}
                  </DialogDescription>
                </div>

                {/* Brand, Category, Rating, Stock */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2 border-t">
                  {selectedProduct.brand && (
                    <div>
                      <p className="text-sm text-gray-500">Brand</p>
                      <p className="font-semibold">{selectedProduct.brand}</p>
                    </div>
                  )}
                  {selectedProduct.category && (
                    <div>
                      <p className="text-sm text-gray-500">Category</p>
                      <p className="font-semibold">{selectedProduct.category}</p>
                    </div>
                  )}
                  {selectedProduct.rating && (
                    <div>
                      <p className="text-sm text-gray-500">Rating</p>
                      <p className="font-semibold">
                        {selectedProduct.rating} ⭐
                      </p>
                    </div>
                  )}
                  {selectedProduct.stock !== undefined && (
                    <div>
                      <p className="text-sm text-gray-500">Stock</p>
                      <p className="font-semibold">
                        {selectedProduct.stock} units
                      </p>
                    </div>
                  )}
                </div>

                {/* Specifications */}
                {selectedProduct.specifications && selectedProduct.specifications.length > 0 && (
                  <div className="pt-4 border-t">
                    <h3 className="text-lg font-semibold mb-3">Specifications</h3>
                    <ul className="space-y-2">
                      {selectedProduct.specifications.map((spec, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-900 mr-2">•</span>
                          <span className="text-gray-700">{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Features */}
                {selectedProduct.features && selectedProduct.features.length > 0 && (
                  <div className="pt-4 border-t">
                    <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                    <ul className="space-y-2">
                      {selectedProduct.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-900 mr-2">✓</span>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Price and Buy Button */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Price</p>
                    <p className="text-3xl font-bold text-blue-900">
                      {formattedPrice(selectedProduct.price)}
                    </p>
                  </div>
                  <Button
                    className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-6 text-lg"
                    onClick={() =>
                      addToCart(
                        {
                          productId: selectedProduct.id,
                          name: selectedProduct.name,
                          image: selectedProduct.image,
                          price: selectedProduct.price,
                        },
                        1,
                      )
                    }
                  >
                    Add to cart
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

