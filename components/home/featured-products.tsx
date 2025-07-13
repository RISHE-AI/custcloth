import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Star, ShoppingCart, Palette } from "lucide-react"

const featuredProducts = [
  {
    id: 1,
    name: "Classic Cotton T-Shirt",
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.8,
    reviews: 124,
    image: "/placeholder.svg?height=300&width=300",
    category: "T-Shirts",
    colors: ["#000000", "#ffffff", "#3b82f6", "#ef4444"],
  },
  {
    id: 2,
    name: "Premium Hoodie",
    price: 59.99,
    originalPrice: 79.99,
    rating: 4.9,
    reviews: 89,
    image: "/placeholder.svg?height=300&width=300",
    category: "Hoodies",
    colors: ["#374151", "#7c3aed", "#059669", "#dc2626"],
  },
  {
    id: 3,
    name: "Designer Saree",
    price: 149.99,
    originalPrice: 199.99,
    rating: 4.7,
    reviews: 56,
    image: "/placeholder.svg?height=300&width=300",
    category: "Sarees",
    colors: ["#ec4899", "#8b5cf6", "#06b6d4", "#f59e0b"],
  },
  {
    id: 4,
    name: "Casual Pants",
    price: 49.99,
    originalPrice: 69.99,
    rating: 4.6,
    reviews: 78,
    image: "/placeholder.svg?height=300&width=300",
    category: "Pants",
    colors: ["#1f2937", "#6b7280", "#0f766e", "#7c2d12"],
  },
]

export default function FeaturedProducts() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Featured Products</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our most popular ready-made clothing or customize them to your liking
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                  Sale
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4 space-y-3">
                <div className="space-y-1">
                  <p className="text-sm text-purple-600 font-medium">{product.category}</p>
                  <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                    {product.name}
                  </h3>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Colors */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Colors:</span>
                  <div className="flex space-x-1">
                    {product.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-gray-900">${product.price}</span>
                  <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                </div>

                {/* Actions */}
                <div className="flex space-x-2 pt-2">
                  <Link href={`/product/${product.id}`} className="flex-1">
                    <Button variant="outline" className="w-full text-sm bg-transparent">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Buy Now
                    </Button>
                  </Link>
                  <Link href={`/customize?product=${product.id}`} className="flex-1">
                    <Button className="w-full text-sm bg-purple-600 hover:bg-purple-700">
                      <Palette className="w-4 h-4 mr-2" />
                      Customize
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/shop">
            <Button
              variant="outline"
              className="px-8 py-3 text-lg border-purple-300 text-purple-700 hover:bg-purple-50 bg-transparent"
            >
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
