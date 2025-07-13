"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, Crown, Zap, Headphones, Star, Users, Palette, Truck, Shield } from "lucide-react"

const plans = [
  {
    name: "Free",
    price: 0,
    period: "forever",
    description: "Perfect for getting started with basic customization",
    features: [
      "Basic customization tools",
      "Standard fabric options (Cotton, Polyester)",
      "Regular delivery (7-10 days)",
      "Email support",
      "Basic design templates (10)",
      "2D preview only",
      "Standard quality images",
    ],
    limitations: ["Limited fabric choices", "No priority support", "Standard shipping only", "Basic templates only"],
    buttonText: "Current Plan",
    buttonVariant: "outline" as const,
    popular: false,
  },
  {
    name: "Premium",
    price: 19,
    period: "month",
    description: "Everything you need for professional designs",
    features: [
      "Advanced customization tools",
      "Premium fabric collection (Silk, Premium Cotton, Blends)",
      "Priority manufacturing (3-5 days)",
      "Live chat & video support",
      "Exclusive design templates (100+)",
      "3D preview with realistic rendering",
      "High-resolution image uploads",
      "Free shipping on all orders",
      "Design consultation sessions (2/month)",
      "Bulk order discounts (10%)",
      "Early access to new features",
      "Custom color matching",
    ],
    buttonText: "Upgrade to Premium",
    buttonVariant: "default" as const,
    popular: true,
  },
  {
    name: "Pro",
    price: 49,
    period: "month",
    description: "For businesses and professional designers",
    features: [
      "Everything in Premium",
      "Unlimited design consultations",
      "White-label solutions",
      "API access for integrations",
      "Dedicated account manager",
      "Custom fabric sourcing",
      "Bulk manufacturing (50+ pieces)",
      "Priority customer support",
      "Advanced analytics dashboard",
      "Team collaboration tools",
      "Custom branding options",
    ],
    buttonText: "Contact Sales",
    buttonVariant: "outline" as const,
    popular: false,
  },
]

const features = [
  {
    icon: Zap,
    title: "Priority Manufacturing",
    description: "Get your custom orders processed first with 3-5 day turnaround time",
    free: false,
    premium: true,
  },
  {
    icon: Headphones,
    title: "Live Support",
    description: "Get instant help with chat, audio, and video support from our design experts",
    free: false,
    premium: true,
  },
  {
    icon: Star,
    title: "Premium Fabrics",
    description: "Access to silk, premium cotton, and exclusive fabric collections",
    free: false,
    premium: true,
  },
  {
    icon: Palette,
    title: "Advanced Tools",
    description: "Professional-grade customization tools with advanced features",
    free: false,
    premium: true,
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free shipping on all orders, no minimum purchase required",
    free: false,
    premium: true,
  },
  {
    icon: Shield,
    title: "Quality Guarantee",
    description: "100% satisfaction guarantee with free remakes if not perfect",
    free: true,
    premium: true,
  },
]

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Fashion Designer",
    avatar: "/placeholder.svg?height=60&width=60",
    content:
      "Premium membership has transformed my design process. The 3D preview and premium fabrics are game-changers!",
    plan: "Premium",
  },
  {
    name: "Michael Chen",
    role: "Small Business Owner",
    avatar: "/placeholder.svg?height=60&width=60",
    content:
      "The bulk discounts and priority manufacturing have saved our company thousands. Best investment we've made.",
    plan: "Pro",
  },
  {
    name: "Emily Rodriguez",
    role: "Fashion Enthusiast",
    avatar: "/placeholder.svg?height=60&width=60",
    content: "I love the design consultations! The experts helped me create the perfect wedding saree.",
    plan: "Premium",
  },
]

export default function PremiumPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly")

  const handleUpgrade = (planName: string) => {
    // Handle upgrade logic
    console.log(`Upgrading to ${planName}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-purple-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Crown className="w-8 h-8 text-yellow-400" />
            <span className="text-sm font-medium uppercase tracking-wide">Premium Membership</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">Unlock Your Creative Potential</h1>
          <p className="text-xl lg:text-2xl text-purple-100 max-w-3xl mx-auto mb-8">
            Get access to premium fabrics, advanced tools, priority support, and exclusive features that take your
            designs to the next level
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>50,000+ Premium Members</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span>4.9/5 Average Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Billing Toggle */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
            <p className="text-gray-600 mb-8">Start free and upgrade anytime. No hidden fees.</p>

            <div className="inline-flex items-center bg-gray-100 rounded-lg p-1">
              <button
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  billingPeriod === "monthly" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => setBillingPeriod("monthly")}
              >
                Monthly
              </button>
              <button
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  billingPeriod === "yearly" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => setBillingPeriod("yearly")}
              >
                Yearly
                <span className="ml-1 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Save 20%</span>
              </button>
            </div>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-white rounded-2xl shadow-sm border-2 p-8 ${
                  plan.popular ? "border-purple-500 shadow-purple-100" : "border-gray-200"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">
                      ${billingPeriod === "yearly" && plan.price > 0 ? Math.round(plan.price * 0.8) : plan.price}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-gray-600">/{billingPeriod === "yearly" ? "month" : plan.period}</span>
                    )}
                  </div>
                  {billingPeriod === "yearly" && plan.price > 0 && (
                    <p className="text-sm text-green-600">Billed ${Math.round(plan.price * 0.8 * 12)} yearly</p>
                  )}
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-purple-600 hover:bg-purple-700"
                      : plan.buttonVariant === "outline"
                        ? "border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                        : ""
                  }`}
                  variant={plan.popular ? "default" : plan.buttonVariant}
                  onClick={() => handleUpgrade(plan.name)}
                >
                  {plan.buttonText}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Feature Comparison</h2>
            <p className="text-gray-600">See what's included in each plan</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <feature.icon className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
                <div className="flex justify-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <span className="text-gray-500">Free:</span>
                    {feature.free ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <span className="text-gray-400">×</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-gray-500">Premium:</span>
                    <Check className="w-4 h-4 text-green-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Premium Members Say</h2>
            <p className="text-gray-600">Join thousands of satisfied premium users</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-purple-100 p-6">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6">"{testimonial.content}"</p>
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-xs text-purple-600 font-medium">{testimonial.plan} Member</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-8">
            {[
              {
                question: "Can I cancel my premium subscription anytime?",
                answer:
                  "Yes, you can cancel your premium subscription at any time. You'll continue to have access to premium features until the end of your billing period.",
              },
              {
                question: "What happens to my designs if I downgrade?",
                answer:
                  "All your designs remain saved in your account. However, you won't be able to edit designs that use premium-only features until you upgrade again.",
              },
              {
                question: "Do you offer refunds?",
                answer:
                  "We offer a 30-day money-back guarantee for premium subscriptions. If you're not satisfied, contact our support team for a full refund.",
              },
              {
                question: "Can I upgrade or downgrade my plan?",
                answer:
                  "Yes, you can change your plan at any time. Upgrades take effect immediately, while downgrades take effect at the end of your current billing period.",
              },
            ].map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Crown className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Ready to Upgrade Your Design Experience?</h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of designers who've upgraded to premium and transformed their creative process
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3"
              onClick={() => handleUpgrade("Premium")}
            >
              Start Premium Trial
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3 bg-transparent"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
