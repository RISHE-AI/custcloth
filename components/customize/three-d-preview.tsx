"use client"

import { useState, useRef, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, Text, Html } from "@react-three/drei"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useCustomization } from "@/contexts/customization-context"
import { RotateCcw, RotateCw, ZoomIn, ZoomOut, Download } from "lucide-react"
import type * as THREE from "three"

interface ThreeDPreviewProps {
  isOpen: boolean
  onClose: () => void
}

function GarmentModel({ garmentType, baseColor, elements }: any) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  const getGarmentGeometry = () => {
    switch (garmentType) {
      case "hoodie":
        return <boxGeometry args={[3, 3.5, 0.4]} /> // Increased size
      case "pants":
        return <cylinderGeometry args={[1.2, 1.5, 4, 8]} /> // Increased size
      case "saree":
        return <planeGeometry args={[3.5, 4.5]} /> // Increased size
      default: // t-shirt
        return <boxGeometry args={[2.5, 3, 0.3]} /> // Increased size
    }
  }

  return (
    <group>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.05 : 1}
      >
        {getGarmentGeometry()}
        <meshStandardMaterial color={baseColor} />
      </mesh>

      {/* Render text elements in 3D */}
      {elements
        .filter((el: any) => el.type === "text")
        .map((element: any, index: number) => (
          <Text
            key={element.id}
            position={[(element.x - 200) / 100, -(element.y - 250) / 100, 0.16]} // Adjusted Z for visibility
            fontSize={element.style?.fontSize / 100 || 0.16}
            color={element.style?.color || "#000000"}
            anchorX="center"
            anchorY="middle"
          >
            {element.content}
          </Text>
        ))}

      {/* Render emoji elements */}
      {elements
        .filter((el: any) => el.type === "emoji")
        .map((element: any) => (
          <Html key={element.id} position={[(element.x - 200) / 100, -(element.y - 250) / 100, 0.16]} transform occlude>
            <div style={{ fontSize: "24px", userSelect: "none" }}>{element.content}</div>
          </Html>
        ))}
    </group>
  )
}

function Scene({ customization }: any) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />

      <GarmentModel
        garmentType={customization.garmentType}
        baseColor={customization.baseColor}
        elements={customization.elements}
      />

      <Environment preset="studio" />
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} minDistance={3} maxDistance={10} />
    </>
  )
}

export default function ThreeDPreview({ isOpen, onClose }: ThreeDPreviewProps) {
  const { state, getOrderData } = useCustomization()
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)

  const handleDownload = () => {
    // Create a download of the 3D preview
    const orderData = getOrderData()
    const dataStr = JSON.stringify(orderData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `custom-design-${Date.now()}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        {" "}
        {/* Added flex-col */}
        <DialogHeader>
          <DialogTitle>3D Preview - {state.garmentType}</DialogTitle>
        </DialogHeader>
        <div className="flex-1 relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <Suspense
              fallback={
                <Html center>
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-2"></div>
                    <p className="text-sm text-gray-600">Loading 3D Model...</p>
                  </div>
                </Html>
              }
            >
              <Scene customization={state} />
            </Suspense>
          </Canvas>

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
            <div className="w-px h-6 bg-gray-300" />
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>
        {/* Design Summary */}
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <h3 className="font-semibold">Design Summary</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Garment:</span> {state.garmentType}
            </div>
            <div>
              <span className="text-gray-600">Fabric:</span> {state.fabric}
            </div>
            <div>
              <span className="text-gray-600">Size:</span> {state.size}
            </div>
            <div>
              <span className="text-gray-600">Color:</span>
              <span
                className="inline-block w-4 h-4 rounded ml-2 border border-gray-300"
                style={{ backgroundColor: state.baseColor }}
              />
            </div>
            {state.garmentType === "t-shirt" && (
              <>
                <div>
                  <span className="text-gray-600">Sleeves:</span> {state.sleeves}
                </div>
                <div>
                  <span className="text-gray-600">Collar:</span> {state.collar}
                </div>
              </>
            )}
            {state.garmentType === "pants" && (
              <>
                <div>
                  <span className="text-gray-600">Length:</span> {state.pantLength}
                </div>
                <div>
                  <span className="text-gray-600">Height:</span> {state.pantHeight}%
                </div>
              </>
            )}
            <div>
              <span className="text-gray-600">Pockets:</span> {state.pockets}
            </div>
            <div>
              <span className="text-gray-600">Elements:</span> {state.elements.length}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
