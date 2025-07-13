import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-purple-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-purple-900 font-bold text-sm">CW</span>
              </div>
              <span className="text-xl font-bold">CustomWear</span>
            </div>
            <p className="text-purple-200 text-sm">
              Design your perfect clothing with our advanced customization tools and 3D preview technology.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-purple-300 hover:text-white cursor-pointer" />
              <Twitter className="w-5 h-5 text-purple-300 hover:text-white cursor-pointer" />
              <Instagram className="w-5 h-5 text-purple-300 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/shop" className="block text-purple-200 hover:text-white text-sm">
                Shop
              </Link>
              <Link href="/customize" className="block text-purple-200 hover:text-white text-sm">
                Customize
              </Link>
              <Link href="/premium" className="block text-purple-200 hover:text-white text-sm">
                Premium
              </Link>
              <Link href="/track-order" className="block text-purple-200 hover:text-white text-sm">
                Track Order
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <div className="space-y-2">
              <Link href="/contact" className="block text-purple-200 hover:text-white text-sm">
                Contact Us
              </Link>
              <Link href="/faq" className="block text-purple-200 hover:text-white text-sm">
                FAQ
              </Link>
              <Link href="/size-guide" className="block text-purple-200 hover:text-white text-sm">
                Size Guide
              </Link>
              <Link href="/returns" className="block text-purple-200 hover:text-white text-sm">
                Returns
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-purple-300" />
                <span className="text-purple-200 text-sm">support@customwear.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-purple-300" />
                <span className="text-purple-200 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-purple-300" />
                <span className="text-purple-200 text-sm">123 Fashion St, NY 10001</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-purple-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-purple-300 text-sm">© 2024 CustomWear. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-purple-300 hover:text-white text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-purple-300 hover:text-white text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
