"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Star, Search, Filter, Grid, List, ShoppingCart, Palette } from "lucide-react"

const products = [
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
    sizes: ["S", "M", "L", "XL"],
    fabric: "Cotton",
    inStock: true,
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
    sizes: ["S", "M", "L", "XL", "XXL"],
    fabric: "Cotton Blend",
    inStock: true,
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
    sizes: ["One Size"],
    fabric: "Silk",
    inStock: true,
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
    sizes: ["28", "30", "32", "34", "36"],
    fabric: "Cotton",
    inStock: false,
  },
  // Add more products...
]

const categories = ["All", "T-Shirts", "Hoodies", "Pants", "Sarees"]
const fabrics = ["All", "Cotton", "Polyester", "Cotton Blend", "Silk"]
const priceRanges = [
  { label: "All", min: 0, max: Number.POSITIVE_INFINITY },
  { label: "Under $30", min: 0, max: 30 },
  { label: "$30 - $60", min: 30, max: 60 },
  { label: "$60 - $100", min: 60, max: 100 },
  { label: "Over $100", min: 100, max: Number.POSITIVE_INFINITY },
]

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedFabric, setSelectedFabric] = useState("All")
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0])
  const [sortBy, setSortBy] = useState("newest")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    const matchesFabric = selectedFabric === "All" || product.fabric === selectedFabric
    const matchesPrice = product.price >= selectedPriceRange.min && product.price <= selectedPriceRange.max

    return matchesSearch && matchesCategory && matchesFabric && matchesPrice
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "popular":
        return b.reviews - a.reviews
      default:
        return b.id - a.id // newest first
    }
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shop Our Collection</h1>
          <p className="text-gray-600">Discover our premium clothing collection or customize any item to your liking</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>

              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          {(showFilters || window.innerWidth >= 1024) && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Fabric</label>
                  <Select value={selectedFabric} onValueChange={setSelectedFabric}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {fabrics.map((fabric) => (
                        <SelectItem key={fabric} value={fabric}>
                          {fabric}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Price Range</label>
                  <Select
                    value={selectedPriceRange.label}
                    onValueChange={(value) => {
                      const range = priceRanges.find((r) => r.label === value)
                      if (range) setSelectedPriceRange(range)
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {priceRanges.map((range) => (
                        <SelectItem key={range.label} value={range.label}>
                          {range.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Availability</label>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="in-stock" />
                    <label htmlFor="in-stock" className="text-sm">
                      In Stock Only
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing {sortedProducts.length} of {products.length} products
          </p>
        </div>

        {/* Products Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
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
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white font-medium">Out of Stock</span>
                    </div>
                  )}
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
                      {product.colors.slice(0, 4).map((color, index) => (
                        <div
                          key={index}
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                      {product.colors.length > 4 && (
                        <span className="text-xs text-gray-500">+{product.colors.length - 4}</span>
                      )}
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
                      <Button variant="outline" className="w-full text-sm bg-transparent" disabled={!product.inStock}>
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {product.inStock ? "Buy Now" : "Out of Stock"}
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
        ) : (
          <div className="space-y-4">
            {sortedProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Product Image */}
                  <div className="relative w-full md:w-48 aspect-square overflow-hidden bg-gray-100 rounded-lg">
                    <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <p className="text-sm text-purple-600 font-medium">{product.category}</p>
                      <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
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
                        {product.rating} ({product.reviews} reviews)
                      </span>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div>
                        <span className="text-sm text-gray-600">Fabric: </span>
                        <span className="font-medium">{product.fabric}</span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Sizes: </span>
                        <span className="font-medium">{product.sizes.join(", ")}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                        <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                      </div>

                      <div className="flex space-x-3">
                        <Link href={`/product/${product.id}`}>
                          <Button variant="outline" disabled={!product.inStock}>
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            {product.inStock ? "Buy Now" : "Out of Stock"}
                          </Button>
                        </Link>
                        <Link href={`/customize?product=${product.id}`}>
                          <Button className="bg-purple-600 hover:bg-purple-700">
                            <Palette className="w-4 h-4 mr-2" />
                            Customize
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("All")
                setSelectedFabric("All")
                setSelectedPriceRange(priceRanges[0])
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
