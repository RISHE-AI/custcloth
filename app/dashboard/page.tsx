"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/contexts/auth-context"
import { User, Package, Heart, Settings, Crown, Edit, Trash2, Eye, Download, Plus } from "lucide-react"

const mockOrders = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    status: "Delivered",
    total: 79.99,
    items: 2,
    image: "/placeholder.svg?height=80&width=80",
    trackingNumber: "TRK123456789",
  },
  {
    id: "ORD-002",
    date: "2024-01-10",
    status: "In Production",
    total: 129.99,
    items: 1,
    image: "/placeholder.svg?height=80&width=80",
    estimatedDelivery: "2024-01-25",
  },
  {
    id: "ORD-003",
    date: "2024-01-05",
    status: "Shipped",
    total: 49.99,
    items: 1,
    image: "/placeholder.svg?height=80&width=80",
    trackingNumber: "TRK987654321",
  },
]

const mockSavedDesigns = [
  {
    id: "DES-001",
    name: "Custom Logo Tee",
    type: "T-Shirt",
    lastModified: "2024-01-14",
    image: "/placeholder.svg?height=120&width=120",
    status: "Draft",
  },
  {
    id: "DES-002",
    name: "Wedding Saree Design",
    type: "Saree",
    lastModified: "2024-01-12",
    image: "/placeholder.svg?height=120&width=120",
    status: "Completed",
  },
  {
    id: "DES-003",
    name: "Team Hoodie",
    type: "Hoodie",
    lastModified: "2024-01-08",
    image: "/placeholder.svg?height=120&width=120",
    status: "Draft",
  },
]

export default function DashboardPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")
  const [editingProfile, setEditingProfile] = useState(false)
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    country: "",
    bio: "",
  })

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "orders", label: "Orders", icon: Package },
    { id: "designs", label: "My Designs", icon: Heart },
    { id: "profile", label: "Profile", icon: Settings },
  ]

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "text-green-600 bg-green-100"
      case "shipped":
        return "text-blue-600 bg-blue-100"
      case "in production":
        return "text-yellow-600 bg-yellow-100"
      case "cancelled":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const handleProfileSave = () => {
    // Save profile logic here
    setEditingProfile(false)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to access your dashboard</h2>
          <Link href="/login">
            <Button className="bg-purple-600 hover:bg-purple-700">Go to Login</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
              <p className="text-gray-600 mt-1">Manage your orders, designs, and account settings</p>
            </div>
            {user.role === "free" && (
              <Link href="/premium">
                <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800">
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade to Premium
                </Button>
              </Link>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{user.name}</h3>
                  <p className="text-sm text-gray-600 capitalize">{user.role} Member</p>
                </div>
              </div>

              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id ? "bg-purple-100 text-purple-700" : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Orders</p>
                        <p className="text-2xl font-bold text-gray-900">12</p>
                      </div>
                      <Package className="w-8 h-8 text-purple-600" />
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Saved Designs</p>
                        <p className="text-2xl font-bold text-gray-900">8</p>
                      </div>
                      <Heart className="w-8 h-8 text-purple-600" />
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Spent</p>
                        <p className="text-2xl font-bold text-gray-900">$459.97</p>
                      </div>
                      <Crown className="w-8 h-8 text-purple-600" />
                    </div>
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
                    <Link href="#" onClick={() => setActiveTab("orders")}>
                      <Button variant="outline" size="sm" className="bg-transparent">
                        View All
                      </Button>
                    </Link>
                  </div>

                  <div className="space-y-4">
                    {mockOrders.slice(0, 3).map((order) => (
                      <div key={order.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                        <Image
                          src={order.image || "/placeholder.svg"}
                          alt="Order"
                          width={60}
                          height={60}
                          className="rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-gray-900">{order.id}</h3>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                            >
                              {order.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">
                            {order.date} • {order.items} items
                          </p>
                          <p className="text-sm font-medium text-gray-900">${order.total}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link href="/customize">
                      <Button className="w-full justify-start bg-purple-600 hover:bg-purple-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Create New Design
                      </Button>
                    </Link>
                    <Link href="/shop">
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Package className="w-4 h-4 mr-2" />
                        Browse Products
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Order History</h2>

                <div className="space-y-6">
                  {mockOrders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <Image
                            src={order.image || "/placeholder.svg"}
                            alt="Order"
                            width={80}
                            height={80}
                            className="rounded-lg"
                          />
                          <div>
                            <h3 className="font-semibold text-gray-900">{order.id}</h3>
                            <p className="text-sm text-gray-600">Placed on {order.date}</p>
                            <p className="text-sm text-gray-600">
                              {order.items} items • ${order.total}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 mt-4 md:mt-0">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}
                          >
                            {order.status}
                          </span>
                          <Button variant="outline" size="sm" className="bg-transparent">
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        </div>
                      </div>

                      {order.trackingNumber && (
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Tracking Number:</span> {order.trackingNumber}
                          </p>
                        </div>
                      )}

                      {order.estimatedDelivery && (
                        <div className="bg-blue-50 rounded-lg p-3">
                          <p className="text-sm text-blue-700">
                            <span className="font-medium">Estimated Delivery:</span> {order.estimatedDelivery}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "designs" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">My Designs</h2>
                  <Link href="/customize">
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Plus className="w-4 h-4 mr-2" />
                      New Design
                    </Button>
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockSavedDesigns.map((design) => (
                    <div
                      key={design.id}
                      className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="aspect-square bg-gray-100">
                        <Image
                          src={design.image || "/placeholder.svg"}
                          alt={design.name}
                          width={200}
                          height={200}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-gray-900 truncate">{design.name}</h3>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              design.status === "Draft"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {design.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{design.type}</p>
                        <p className="text-xs text-gray-500 mb-4">Modified {design.lastModified}</p>

                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline" className="bg-transparent">
                            <Download className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700 bg-transparent"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "profile" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Profile Settings</h2>
                  <Button
                    onClick={() => setEditingProfile(!editingProfile)}
                    variant="outline"
                    className="bg-transparent"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    {editingProfile ? "Cancel" : "Edit Profile"}
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Profile Picture */}
                  <div className="flex items-center space-x-6">
                    <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center">
                      <User className="w-10 h-10 text-purple-600" />
                    </div>
                    {editingProfile && (
                      <Button variant="outline" className="bg-transparent">
                        Change Photo
                      </Button>
                    )}
                  </div>

                  {/* Profile Form */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        disabled={!editingProfile}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        disabled={!editingProfile}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        disabled={!editingProfile}
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Select
                        value={profileData.country}
                        onValueChange={(value) => setProfileData({ ...profileData, country: value })}
                        disabled={!editingProfile}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                          <SelectItem value="au">Australia</SelectItem>
                          <SelectItem value="in">India</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={profileData.address}
                        onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                        disabled={!editingProfile}
                        placeholder="Enter your address"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={profileData.city}
                        onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                        disabled={!editingProfile}
                        placeholder="Enter your city"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={profileData.bio}
                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                        disabled={!editingProfile}
                        placeholder="Tell us about yourself..."
                        rows={4}
                      />
                    </div>
                  </div>

                  {editingProfile && (
                    <div className="flex space-x-4">
                      <Button onClick={handleProfileSave} className="bg-purple-600 hover:bg-purple-700">
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={() => setEditingProfile(false)} className="bg-transparent">
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>

                {/* Account Settings */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Email Notifications</h4>
                        <p className="text-sm text-gray-600">Receive updates about your orders and designs</p>
                      </div>
                      <Button variant="outline" size="sm" className="bg-transparent">
                        Manage
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Privacy Settings</h4>
                        <p className="text-sm text-gray-600">Control who can see your designs and profile</p>
                      </div>
                      <Button variant="outline" size="sm" className="bg-transparent">
                        Manage
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-red-900">Delete Account</h4>
                        <p className="text-sm text-red-600">Permanently delete your account and all data</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-300 hover:bg-red-50 bg-transparent"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
