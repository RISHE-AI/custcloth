import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, Palette } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-purple-50 to-purple-100 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-purple-600">
                <Sparkles className="w-5 h-5" />
                <span className="text-sm font-medium">Design Your Perfect Style</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Customize your clothes with <span className="text-purple-600">ease</span> and preview them in{" "}
                <span className="text-purple-600">3D</span> before ordering
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Create unique clothing designs with our advanced customization tools. Upload images, add text, choose
                fabrics, and see your creation come to life with realistic 3D previews.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/customize">
                <Button className="btn-primary text-lg px-8 py-4 w-full sm:w-auto">
                  <Palette className="w-5 h-5 mr-2" />
                  Start Customizing
                </Button>
              </Link>
              <Link href="/shop">
                <Button
                  variant="outline"
                  className="text-lg px-8 py-4 w-full sm:w-auto border-purple-300 text-purple-700 hover:bg-purple-50 bg-transparent"
                >
                  Shop Now
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-purple-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">50K+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">100+</div>
                <div className="text-sm text-gray-600">Design Options</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">24/7</div>
                <div className="text-sm text-gray-600">Support</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative bg-white rounded-2xl shadow-2xl p-8">
              <div className="aspect-square bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-32 h-32 bg-purple-600 rounded-full mx-auto flex items-center justify-center">
                    <span className="text-white text-4xl font-bold">3D</span>
                  </div>
                  <p className="text-purple-700 font-medium">Live Preview</p>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-yellow-400 rounded-full p-3 shadow-lg">
              <Sparkles className="w-6 h-6 text-yellow-800" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-pink-400 rounded-full p-3 shadow-lg">
              <Palette className="w-6 h-6 text-pink-800" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
