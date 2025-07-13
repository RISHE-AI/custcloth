"use client"

import { useState, useRef, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { CustomizationProvider, useCustomization } from "@/contexts/customization-context"
import CustomizationCanvas from "@/components/customize/customization-canvas"
import CustomizationPanel from "@/components/customize/customization-panel"
import PreviewModal from "@/components/customize/preview-modal"
import { usePDFGenerator } from "@/components/customize/pdf-generator"
import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Eye, Download, ShoppingCart, Save, Share2, Sparkles } from "lucide-react"

function CustomizePageContent() {
  const searchParams = useSearchParams()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const { state, updateGarmentType, getOrderData } = useCustomization()
  const { addItem } = useCart()
  const { generatePDF } = usePDFGenerator()

  // Get garment type from URL params (when coming from product page)
  useEffect(() => {
    const productId = searchParams.get("product")
    const garmentType = searchParams.get("type")

    if (garmentType) {
      updateGarmentType(garmentType)
    } else if (productId) {
      // Map product ID to garment type (you can expand this mapping)
      const productTypeMap: Record<string, string> = {
        "1": "t-shirt",
        "2": "hoodie",
        "3": "saree",
        "4": "pants",
      }
      const type = productTypeMap[productId] || "t-shirt"
      updateGarmentType(type)
    }
  }, [searchParams, updateGarmentType])

  const handleAddToCart = () => {
    const orderData = getOrderData()
    const cartItem = {
      id: `custom-${Date.now()}`,
      name: `Custom ${state.garmentType}`,
      price: calculatePrice(),
      quantity: 1,
      image: "/placeholder.svg?height=100&width=100",
      customization: orderData,
    }

    addItem(cartItem)

    // Show success message or redirect
    alert("Custom design added to cart!")
  }

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true)
    try {
      const success = await generatePDF(canvasRef.current)
      if (success) {
        alert("PDF downloaded successfully!")
      } else {
        alert("Failed to generate PDF. Please try again.")
      }
    } catch (error) {
      alert("Error generating PDF. Please try again.")
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const handleSaveDesign = async () => {
    setIsSaving(true)
    try {
      const orderData = getOrderData()
      // Save to localStorage for now (replace with API call)
      const savedDesigns = JSON.parse(localStorage.getItem("savedDesigns") || "[]")
      const newDesign = {
        id: `design-${Date.now()}`,
        name: `Custom ${state.garmentType}`,
        data: orderData,
        thumbnail: "/placeholder.svg?height=120&width=120",
        createdAt: new Date().toISOString(),
      }
      savedDesigns.push(newDesign)
      localStorage.setItem("savedDesigns", JSON.stringify(savedDesigns))
      alert("Design saved successfully!")
    } catch (error) {
      alert("Failed to save design. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleShare = () => {
    const orderData = getOrderData()
    const shareData = {
      title: `My Custom ${state.garmentType.replace("-", " ")} Design`,
      text: `Check out my custom ${state.garmentType.replace("-", " ")} design!`,
      url: window.location.href,
    }

    if (navigator.share) {
      navigator.share(shareData)
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert("Design link copied to clipboard!")
    }
  }

  const handleAIAssistance = () => {
    alert("AI Assistance coming soon! This would open a chat or suggestion panel.")
  }

  const calculatePrice = () => {
    let basePrice = 39.99

    // Add pricing based on garment type
    const garmentPricing: Record<string, number> = {
      "t-shirt": 39.99,
      hoodie: 59.99,
      saree: 149.99,
      pants: 49.99,
    }

    basePrice = garmentPricing[state.garmentType] || 39.99

    // Add customization costs
    const customizationCost = state.elements.length * 5 // $5 per element
    const pocketCost = state.pockets * 3 // $3 per pocket
    const premiumFabricCost = state.fabric === "silk" ? 20 : state.fabric === "premium-cotton" ? 10 : 0

    // Add cost for pant height/length if applicable (example logic)
    if (state.garmentType === "pants" && state.pantHeight < 100) {
      basePrice -= (100 - state.pantHeight) * 0.1 // Small discount for shorter pants
    }

    return basePrice + customizationCost + pocketCost + premiumFabricCost
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Design Your Perfect {state.garmentType.replace("-", " ")}
            </h1>
            <p className="text-gray-600">Use our advanced tools to create a unique design that's perfectly you</p>
          </div>
          <Button onClick={handleAIAssistance} variant="outline" className="bg-transparent">
            <Sparkles className="w-4 h-4 mr-2" />
            AI Assistance
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Canvas Area */}
          <div className="lg:col-span-2">
            <CustomizationCanvas ref={canvasRef} customization={state} onElementSelect={setSelectedElementId} />
          </div>

          {/* Customization Panel */}
          <div className="space-y-6">
            <CustomizationPanel selectedElementId={selectedElementId} />

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button onClick={() => setShowPreview(true)} className="w-full bg-purple-600 hover:bg-purple-700">
                <Eye className="w-4 h-4 mr-2" />
                3D Preview
              </Button>

              <div className="grid grid-cols-2 gap-2">
                <Button onClick={handleSaveDesign} variant="outline" className="bg-transparent" disabled={isSaving}>
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? "Saving..." : "Save"}
                </Button>

                <Button onClick={handleShare} variant="outline" className="bg-transparent">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>

              <Button
                onClick={handleDownloadPDF}
                variant="outline"
                className="w-full bg-transparent"
                disabled={isGeneratingPDF}
              >
                <Download className="w-4 h-4 mr-2" />
                {isGeneratingPDF ? "Generating PDF..." : "Download PDF"}
              </Button>

              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-2">${calculatePrice().toFixed(2)}</div>
                  <div className="text-sm text-gray-600 mb-4">
                    Includes customization and {state.elements.length} design elements
                  </div>
                  <Button onClick={handleAddToCart} className="w-full bg-green-600 hover:bg-green-700">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Preview Modal */}
      <PreviewModal isOpen={showPreview} onClose={() => setShowPreview(false)} customization={state} />
    </div>
  )
}

export default function CustomizePage() {
  return (
    <CustomizationProvider>
      <CustomizePageContent />
    </CustomizationProvider>
  )
}
