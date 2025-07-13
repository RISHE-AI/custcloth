"use client"

import type React from "react"

import { useRef, useEffect, useState, useCallback, createRef, forwardRef, useImperativeHandle } from "react"
import { Button } from "@/components/ui/button"
import { useCustomization } from "@/contexts/customization-context"
import { RotateCcw, Move, Type, ImageIcon, FlipHorizontal } from "lucide-react"
import Draggable from "react-draggable"

interface AdvancedCanvasProps {
  onElementSelect?: (elementId: string | null) => void
}

const AdvancedCanvas = forwardRef<HTMLCanvasElement, AdvancedCanvasProps>(function AdvancedCanvas(
  { onElementSelect }: AdvancedCanvasProps,
  externalRef,
) {
  // local ref that points to the real <canvas>
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // expose the DOM node to the parent (PDF generator, etc.)
  useImperativeHandle(externalRef, () => canvasRef.current as HTMLCanvasElement | null)

  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedTool, setSelectedTool] = useState<"move" | "text" | "image" | null>(null)
  const [isFlipping, setIsFlipping] = useState(false)
  const [draggedElement, setDraggedElement] = useState<string | null>(null)

  const { state, updateElement, addElement, selectElement, switchSide, removeElement } = useCustomization()

  // -- refs for each draggable node --------------------------------------------
  /**
   * A map that keeps one ref per element id.
   * We DON'T create refs with hooks in a loop – that would violate the
   * Rules of Hooks and caused the previous crash.
   */
  const nodeRefs = useRef(new Map<string, React.RefObject<HTMLDivElement>>())

  const getNodeRef = (id: string) => {
    if (!nodeRefs.current.has(id)) {
      nodeRefs.current.set(id, createRef<HTMLDivElement>())
    }
    // non-null assertion is safe because we just ensured the key exists
    return nodeRefs.current.get(id)!
  }

  const garmentTemplates = {
    "t-shirt": {
      front: "/placeholder.svg?height=400&width=300&text=T-Shirt+Front",
      back: "/placeholder.svg?height=400&width=300&text=T-Shirt+Back",
    },
    hoodie: {
      front: "/placeholder.svg?height=400&width=300&text=Hoodie+Front",
      back: "/placeholder.svg?height=400&width=300&text=Hoodie+Back",
    },
    saree: {
      front: "/placeholder.svg?height=400&width=300&text=Saree+Front",
      back: "/placeholder.svg?height=400&width=300&text=Saree+Back",
    },
    pants: {
      front: "/placeholder.svg?height=400&width=300&text=Pants+Front",
      back: "/placeholder.svg?height=400&width=300&text=Pants+Back",
    },
  }

  const drawGarmentTemplate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw garment silhouette based on type
    ctx.fillStyle = state.baseColor
    ctx.strokeStyle = "#e5e7eb"
    ctx.lineWidth = 2

    switch (state.garmentType) {
      case "t-shirt":
        drawTShirt(ctx)
        break
      case "hoodie":
        drawHoodie(ctx)
        break
      case "saree":
        drawSaree(ctx)
        break
      case "pants":
        drawPants(ctx)
        break
      default:
        drawTShirt(ctx)
    }
  }, [state.garmentType, state.baseColor, state.sleeves, state.collar, state.pantLength, state.pantHeight]) // Added pantLength, pantHeight

  const drawTShirt = (ctx: CanvasRenderingContext2D) => {
    // Main body
    ctx.beginPath()
    ctx.roundRect(50, 100, 300, 250, 10)
    ctx.fill()
    ctx.stroke()

    // Sleeves based on selection
    if (state.sleeves === "short") {
      // Short sleeves
      ctx.beginPath()
      ctx.roundRect(20, 120, 60, 80, 10)
      ctx.fill()
      ctx.stroke()

      ctx.beginPath()
      ctx.roundRect(320, 120, 60, 80, 10)
      ctx.fill()
      ctx.stroke()
    } else if (state.sleeves === "long") {
      // Long sleeves
      ctx.beginPath()
      ctx.roundRect(20, 120, 60, 150, 10)
      ctx.fill()
      ctx.stroke()

      ctx.beginPath()
      ctx.roundRect(320, 120, 60, 150, 10)
      ctx.fill()
      ctx.stroke()
    }
    // If state.sleeves is "sleeveless", no sleeves are drawn.
    // This is handled by the absence of an else if for "sleeveless".

    // Collar based on selection
    if (state.collar === "round") {
      ctx.beginPath()
      ctx.arc(200, 100, 30, 0, Math.PI)
      ctx.fillStyle = "#ffffff"
      ctx.fill()
      ctx.stroke()
    } else if (state.collar === "v-neck") {
      ctx.beginPath()
      ctx.moveTo(170, 100)
      ctx.lineTo(200, 130)
      ctx.lineTo(230, 100)
      ctx.fillStyle = "#ffffff"
      ctx.fill()
      ctx.stroke()
    } else if (state.collar === "polo") {
      ctx.beginPath()
      ctx.rect(180, 100, 40, 50)
      ctx.fillStyle = "#ffffff"
      ctx.fill()
      ctx.stroke()
    }
  }

  const drawHoodie = (ctx: CanvasRenderingContext2D) => {
    // Main body
    ctx.beginPath()
    ctx.roundRect(50, 120, 300, 280, 10)
    ctx.fill()
    ctx.stroke()

    // Hood
    ctx.beginPath()
    ctx.arc(200, 80, 80, 0, Math.PI)
    ctx.fill()
    ctx.stroke()

    // Pocket (kangaroo pocket)
    ctx.beginPath()
    ctx.roundRect(120, 200, 160, 80, 10)
    ctx.strokeStyle = "#cccccc"
    ctx.stroke()
  }

  const drawSaree = (ctx: CanvasRenderingContext2D) => {
    // Blouse
    ctx.beginPath()
    ctx.roundRect(100, 100, 200, 120, 10)
    ctx.fill()
    ctx.stroke()

    // Saree drape
    ctx.beginPath()
    ctx.moveTo(50, 220)
    ctx.quadraticCurveTo(200, 180, 350, 220)
    ctx.lineTo(350, 400)
    ctx.lineTo(50, 400)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
  }

  const drawPants = (ctx: CanvasRenderingContext2D) => {
    const baseHeight = 270 // Max height for full pants
    const legWidth = 110
    const waistY = 100
    const legY = waistY + 30 // Below waistband

    // Calculate actual leg height based on pantLength and pantHeight
    let currentLegHeight = baseHeight
    if (state.pantLength === "half") {
      currentLegHeight = baseHeight * 0.5
    } else if (state.pantLength === "three-fourths") {
      currentLegHeight = baseHeight * 0.75
    } else if (state.pantLength === "shorts") {
      currentLegHeight = baseHeight * 0.3
    }
    // Apply customizable height percentage
    currentLegHeight = currentLegHeight * (state.pantHeight / 100)

    // Waistband
    ctx.beginPath()
    ctx.rect(80, waistY, 240, 30)
    ctx.fill()
    ctx.stroke()

    // Left leg
    ctx.beginPath()
    ctx.rect(80, legY, legWidth, currentLegHeight)
    ctx.fill()
    ctx.stroke()

    // Right leg
    ctx.beginPath()
    ctx.rect(210, legY, legWidth, currentLegHeight)
    ctx.fill()
    ctx.stroke()
  }

  useEffect(() => {
    drawGarmentTemplate()
  }, [drawGarmentTemplate])

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!selectedTool) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    if (selectedTool === "text") {
      addElement({
        type: "text",
        content: "Sample Text",
        x,
        y,
        side: state.currentSide,
        style: {
          color: "#000000",
          fontSize: 16,
          fontFamily: "Arial",
          fontWeight: "normal",
          fontStyle: "normal",
        },
      })
    }
  }

  const handleFlip = () => {
    setIsFlipping(true)
    setTimeout(() => {
      switchSide()
      setIsFlipping(false)
    }, 150)
  }

  const handleDrag = (elementId: string, data: any) => {
    updateElement(elementId, { x: data.x, y: data.y })
  }

  const handleElementClick = (elementId: string, event: React.MouseEvent) => {
    event.stopPropagation()
    selectElement(elementId)
    onElementSelect?.(elementId)
  }

  const currentElements = state.elements.filter((el) => el.side === state.currentSide)

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Canvas Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Button
            variant={selectedTool === "move" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedTool("move")}
          >
            <Move className="w-4 h-4 mr-2" />
            Move
          </Button>
          <Button
            variant={selectedTool === "text" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedTool("text")}
          >
            <Type className="w-4 h-4 mr-2" />
            Text
          </Button>
          <Button
            variant={selectedTool === "image" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedTool("image")}
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            Image
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant={state.currentSide === "front" ? "default" : "outline"}
            size="sm"
            onClick={() => !isFlipping && state.currentSide === "back" && handleFlip()}
            disabled={isFlipping}
          >
            Front
          </Button>
          <Button variant="outline" size="sm" onClick={handleFlip} disabled={isFlipping} className="bg-transparent">
            <FlipHorizontal className="w-4 h-4" />
          </Button>
          <Button
            variant={state.currentSide === "back" ? "default" : "outline"}
            size="sm"
            onClick={() => !isFlipping && state.currentSide === "front" && handleFlip()}
            disabled={isFlipping}
          >
            Back
          </Button>
          <Button variant="outline" size="sm" className="bg-transparent">
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Canvas Container */}
      <div className="flex justify-center">
        <div
          ref={containerRef}
          className={`relative transition-transform duration-300 ${isFlipping ? "scale-x-0" : "scale-x-100"}`}
          style={{ perspective: "1000px" }}
        >
          <canvas
            ref={canvasRef}
            width={400}
            height={500}
            className="border border-gray-300 rounded-lg cursor-crosshair relative z-0"
            onClick={handleCanvasClick}
          />

          {/* Draggable Elements Overlay */}
          <div className="absolute inset-0 pointer-events-auto">
            {" "}
            {/* Changed to pointer-events-auto */}
            {currentElements.map((element) => {
              const nodeRef = getNodeRef(element.id)
              return (
                <Draggable
                  key={element.id}
                  nodeRef={nodeRef}
                  position={{ x: element.x, y: element.y }}
                  onDrag={(e, data) => handleDrag(element.id, data)}
                  onStart={() => setDraggedElement(element.id)}
                  onStop={() => setDraggedElement(null)}
                >
                  <div
                    ref={nodeRef}
                    className={`absolute pointer-events-auto cursor-move ${state.selectedElementId === element.id ? "ring-2 ring-purple-500" : ""} ${draggedElement === element.id ? "z-50" : ""}`}
                    style={{
                      transform: `rotate(${element.rotation || 0}deg)`,
                      zIndex: element.zIndex,
                    }}
                    onClick={(e) => handleElementClick(element.id, e)}
                  >
                    {element.type === "text" && (
                      <div
                        style={{
                          color: element.style?.color || "#000000",
                          fontSize: `${element.style?.fontSize || 16}px`,
                          fontFamily: element.style?.fontFamily || "Arial",
                          fontWeight: element.style?.fontWeight || "normal",
                          fontStyle: element.style?.fontStyle || "normal",
                          userSelect: "none",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {element.content}
                      </div>
                    )}

                    {element.type === "emoji" && (
                      <div
                        style={{
                          fontSize: "24px",
                          userSelect: "none",
                        }}
                      >
                        {element.content}
                      </div>
                    )}

                    {element.type === "pocket" && (
                      <div
                        className="border-2 border-gray-400 bg-gray-100 rounded"
                        style={{
                          width: element.width || 40,
                          height: element.height || 30,
                        }}
                      />
                    )}

                    {element.type === "image" && (
                      <div
                        className="border border-gray-300 bg-gray-100 rounded flex items-center justify-center"
                        style={{
                          width: element.width || 100,
                          height: element.height || 100,
                        }}
                      >
                        <span className="text-xs text-gray-500">Image</span>
                      </div>
                    )}

                    {/* Selection handles */}
                    {state.selectedElementId === element.id && (
                      <>
                        <div className="absolute -top-1 -left-1 w-2 h-2 bg-purple-500 rounded-full" />
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full" />
                        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-purple-500 rounded-full" />
                        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-purple-500 rounded-full" />
                      </>
                    )}
                  </div>
                </Draggable>
              )
            })}
          </div>
        </div>
      </div>

      {/* Canvas Info */}
      <div className="mt-4 text-center text-sm text-gray-600">
        {selectedTool === "text" && "Click on the canvas to add text"}
        {selectedTool === "image" && "Click on the canvas to add an image"}
        {selectedTool === "move" && "Click and drag elements to move them"}
        {!selectedTool && "Select a tool to start customizing"}
        <div className="mt-2">
          Viewing: <span className="font-medium capitalize">{state.currentSide}</span> side of{" "}
          <span className="font-medium">{state.garmentType}</span>
        </div>
      </div>
    </div>
  )
})

export default AdvancedCanvas
