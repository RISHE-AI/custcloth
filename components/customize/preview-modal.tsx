"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { RotateCcw, RotateCw, ZoomIn, ZoomOut } from "lucide-react"

interface PreviewModalProps {
  isOpen: boolean
  onClose: () => void
  customization: any
}

export default function PreviewModal({ isOpen, onClose, customization }: PreviewModalProps) {
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh]">
        <DialogHeader>
          <DialogTitle>3D Preview</DialogTitle>
        </DialogHeader>

        <div className="flex-1 relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
          {/* 3D Preview Area */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-64 h-80 bg-white rounded-lg shadow-lg flex items-center justify-center transform transition-transform"
              style={{
                transform: `rotateY(${rotation}deg) scale(${zoom})`,
                backgroundColor: customization.baseColor,
              }}
            >
              <div className="text-center space-y-4">
                <div className="text-6xl">👕</div>
                <p className="text-sm text-gray-600">3D Model Preview</p>
                <p className="text-xs text-gray-500">
                  {customization.garmentType} - {customization.fabric}
                </p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-lg">
            <Button variant="outline" size="sm" onClick={() => setRotation(rotation - 45)}>
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => setRotation(rotation + 45)}>
              <RotateCw className="w-4 h-4" />
            </Button>
            <div className="w-px h-6 bg-gray-300" />
            <Button variant="outline" size="sm" onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}>
              <ZoomOut className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => setZoom(Math.min(2, zoom + 0.1))}>
              <ZoomIn className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Info Panel */}
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <h3 className="font-semibold">Design Summary</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Garment:</span> {customization.garmentType}
            </div>
            <div>
              <span className="text-gray-600">Fabric:</span> {customization.fabric}
            </div>
            <div>
              <span className="text-gray-600">Size:</span> {customization.size}
            </div>
            <div>
              <span className="text-gray-600">Pockets:</span> {customization.pockets}
            </div>
          </div>
          {customization.notes && (
            <div>
              <span className="text-gray-600">Notes:</span> {customization.notes}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
