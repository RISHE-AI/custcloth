import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Fashion Designer",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    content:
      "CustomWear has revolutionized how I create prototypes. The 3D preview feature is incredibly accurate, and the customization tools are intuitive. My clients love seeing their designs come to life!",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Small Business Owner",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    content:
      "We use CustomWear for our company merchandise. The bulk ordering feature and premium support have saved us so much time. The quality is consistently excellent.",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Fashion Enthusiast",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    content:
      "I love being able to design my own clothes! The platform is so easy to use, and the 3D preview helps me perfect every detail. My custom sarees always get compliments.",
  },
]

export default function Testimonials() {
  return (
    <section className="py-16 bg-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">What Our Customers Say</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied customers who love creating with CustomWear
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-xl shadow-sm border border-purple-100 p-6 relative">
              <Quote className="absolute top-4 right-4 w-8 h-8 text-purple-200" />

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 leading-relaxed mb-6">"{testimonial.content}"</p>

              {/* Author */}
              <div className="flex items-center space-x-4">
                <Image
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-4">Ready to create your perfect design?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/customize">
              <Button className="btn-primary px-8 py-3">Start Designing</Button>
            </Link>
            <Link href="/shop">
              <Button
                variant="outline"
                className="px-8 py-3 border-purple-300 text-purple-700 hover:bg-purple-50 bg-transparent"
              >
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
