import { Palette, Eye, ShoppingCart, Truck } from "lucide-react"

const steps = [
  {
    icon: Palette,
    title: "Design & Customize",
    description:
      "Choose your garment, upload images, add text, select colors and fabrics. Our intuitive tools make customization easy.",
    step: "01",
  },
  {
    icon: Eye,
    title: "Preview in 3D",
    description: "See your design come to life with our realistic 3D preview. View from all angles before you order.",
    step: "02",
  },
  {
    icon: ShoppingCart,
    title: "Place Your Order",
    description:
      "Review your design, choose size and quantity, then proceed to secure checkout with multiple payment options.",
    step: "03",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Track your order in real-time. Premium members get priority manufacturing and free shipping.",
    step: "04",
  },
]

export default function HowItWorks() {
  return (
    <section className="py-16 bg-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From design to delivery, we've made the process simple and enjoyable
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-purple-200 transform translate-x-4 -translate-y-1/2" />
              )}

              <div className="text-center space-y-4">
                {/* Step Number */}
                <div className="relative">
                  <div className="w-32 h-32 mx-auto bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-purple-200">
                    <step.icon className="w-12 h-12 text-purple-600" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
