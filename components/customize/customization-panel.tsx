"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useCustomization } from "@/contexts/customization-context"
import { Upload, Plus, Minus, Trash2, Layers, Palette } from "lucide-react"

interface EnhancedPanelProps {
  selectedElementId?: string | null
}

const garmentTypes = [
  { value: "t-shirt", label: "T-Shirt" },
  { value: "hoodie", label: "Hoodie" },
  { value: "pants", label: "Pants" },
  { value: "saree", label: "Saree" },
]

const fabricTypes = [
  { value: "cotton", label: "Cotton" },
  { value: "polyester", label: "Polyester" },
  { value: "blend", label: "Cotton-Polyester Blend" },
  { value: "premium-cotton", label: "Premium Cotton" },
  { value: "silk", label: "Silk" },
]

const sizes = ["XS", "S", "M", "L", "XL", "XXL"]

const predefinedColors = [
  "#ffffff",
  "#000000",
  "#ef4444",
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
  "#6b7280",
  "#f97316",
]

const fontFamilies = [
  "Arial",
  "Helvetica",
  "Times New Roman",
  "Georgia",
  "Verdana",
  "Comic Sans MS",
  "Impact",
  "Trebuchet MS",
]

export default function EnhancedPanel({ selectedElementId }: EnhancedPanelProps) {
  const [activeTab, setActiveTab] = useState("garment")
  const [customColor, setCustomColor] = useState("#000000")
  const [showColorPicker, setShowColorPicker] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    state,
    updateGarmentType,
    updateBaseColor,
    updateFabric,
    updateSize,
    updateSleeves,
    updateCollar,
    updatePockets,
    updatePantLength, // New
    updatePantHeight, // New
    addElement,
    updateElement,
    removeElement,
    uploadFile,
    addCustomColor,
    undo,
    redo,
  } = useCustomization()

  const tabs = [
    { id: "garment", label: "Garment" },
    { id: "design", label: "Design" },
    { id: "text", label: "Text" },
    { id: "layers", label: "Layers" },
  ]

  const selectedElement = selectedElementId ? state.elements.find((el) => el.id === selectedElementId) : null

  const handleColorChange = (color: string) => {
    updateBaseColor(color)
  }

  const handleCustomColorAdd = () => {
    addCustomColor(customColor)
    updateBaseColor(customColor)
    setShowColorPicker(false)
  }

  const handlePocketChange = (increment: boolean) => {
    const newCount = Math.max(0, Math.min(6, state.pockets + (increment ? 1 : -1)))
    updatePockets(newCount)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      uploadFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        addElement({
          type: "image",
          content: e.target?.result as string,
          x: 150,
          y: 180,
          width: 100,
          height: 100,
          rotation: 0,
          side: state.currentSide,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleTextStyleUpdate = (property: string, value: any) => {
    if (selectedElement && selectedElement.type === "text") {
      updateElement(selectedElement.id, {
        style: { ...selectedElement.style, [property]: value },
      })
    }
  }

  const handleElementTransform = (property: string, value: number) => {
    if (selectedElement) {
      updateElement(selectedElement.id, { [property]: value })
    }
  }

  const bringToFront = (elementId: string) => {
    const maxZ = Math.max(0, ...state.elements.map((el) => el.zIndex))
    updateElement(elementId, { zIndex: maxZ + 1 })
  }

  const sendToBack = (elementId: string) => {
    const minZ = Math.min(...state.elements.map((el) => el.zIndex))
    updateElement(elementId, { zIndex: minZ - 1 })
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-purple-500 text-purple-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6 space-y-6">
        {/* History Controls */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={undo}
              disabled={state.historyIndex <= 0}
              className="bg-transparent"
            >
              Undo
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={redo}
              disabled={state.historyIndex >= state.history.length - 1}
              className="bg-transparent"
            >
              Redo
            </Button>
          </div>
          {selectedElement && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => removeElement(selectedElement.id)}
              className="text-red-600 hover:text-red-700 bg-transparent"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>

        {activeTab === "garment" && (
          <>
            {/* Garment Type */}
            <div className="space-y-2">
              <Label>Garment Type</Label>
              <Select value={state.garmentType} onValueChange={updateGarmentType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {garmentTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sleeves (for t-shirts and hoodies) */}
            {(state.garmentType === "t-shirt" || state.garmentType === "hoodie") && (
              <div className="space-y-2">
                <Label>Sleeves</Label>
                <div className="grid grid-cols-3 gap-2">
                  {["sleeveless", "short", "long"].map((sleeve) => (
                    <Button
                      key={sleeve}
                      variant={state.sleeves === sleeve ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateSleeves(sleeve as any)}
                      className={state.sleeves !== sleeve ? "bg-transparent" : ""}
                    >
                      {sleeve === "sleeveless" ? "No Sleeves" : `${sleeve} Sleeves`}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Collar (for t-shirts) */}
            {state.garmentType === "t-shirt" && (
              <div className="space-y-2">
                <Label>Collar</Label>
                <div className="grid grid-cols-2 gap-2">
                  {["none", "round", "v-neck", "polo"].map((collar) => (
                    <Button
                      key={collar}
                      variant={state.collar === collar ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateCollar(collar as any)}
                      className={state.collar !== collar ? "bg-transparent" : ""}
                    >
                      {collar === "none" ? "No Collar" : collar.replace("-", " ")}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Pants Length & Height (for pants) */}
            {state.garmentType === "pants" && (
              <>
                <div className="space-y-2">
                  <Label>Pant Length</Label>
                  <Select value={state.pantLength} onValueChange={updatePantLength}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {["full", "half", "three-fourths", "shorts"].map((length) => (
                        <SelectItem key={length} value={length}>
                          {length.replace("-", " ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Pant Height: {state.pantHeight}%</Label>
                  <Slider
                    value={[state.pantHeight]}
                    onValueChange={([value]) => updatePantHeight(value)}
                    min={0}
                    max={100}
                    step={1}
                  />
                </div>
              </>
            )}

            {/* Base Color */}
            <div className="space-y-2">
              <Label>Base Color</Label>
              <div className="grid grid-cols-5 gap-2 mb-2">
                {[...predefinedColors, ...state.customColors].map((color) => (
                  <button
                    key={color}
                    className={`w-10 h-10 rounded-lg border-2 ${
                      state.baseColor === color ? "border-purple-500" : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorChange(color)}
                  />
                ))}
              </div>
              <div className="flex space-x-2">
                <Input
                  type="color"
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                  className="w-16 h-8 p-1"
                />
                <Button variant="outline" size="sm" onClick={handleCustomColorAdd} className="bg-transparent">
                  <Palette className="w-4 h-4 mr-1" />
                  Add
                </Button>
              </div>
            </div>

            {/* Fabric Type */}
            <div className="space-y-2">
              <Label>Fabric Type</Label>
              <Select value={state.fabric} onValueChange={updateFabric}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fabricTypes.map((fabric) => (
                    <SelectItem key={fabric.value} value={fabric.value}>
                      {fabric.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Size */}
            <div className="space-y-2">
              <Label>Size</Label>
              <div className="grid grid-cols-3 gap-2">
                {sizes.map((size) => (
                  <Button
                    key={size}
                    variant={state.size === size ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateSize(size)}
                    className={state.size !== size ? "bg-transparent" : ""}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Number of Pockets */}
            <div className="space-y-2">
              <Label>Number of Pockets</Label>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePocketChange(false)}
                  disabled={state.pockets <= 0}
                  className="bg-transparent"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="text-lg font-medium w-8 text-center">{state.pockets}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePocketChange(true)}
                  disabled={state.pockets >= 6}
                  className="bg-transparent"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        )}

        {activeTab === "design" && (
          <>
            {/* Upload Images */}
            <div className="space-y-2">
              <Label>Upload Images</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">Upload high-resolution images</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  multiple
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-transparent"
                >
                  Choose Files
                </Button>
              </div>
            </div>

            {/* Emojis */}
            <div className="space-y-2">
              <Label>Add Emojis</Label>
              <div className="grid grid-cols-6 gap-2">
                {["😀", "❤️", "🔥", "⭐", "🌈", "🎵", "🏆", "🎨", "👑", "💎", "🚀", "⚡"].map((emoji) => (
                  <Button
                    key={emoji}
                    variant="outline"
                    className="aspect-square text-xl bg-transparent"
                    onClick={() => {
                      addElement({
                        type: "emoji",
                        content: emoji,
                        x: 200,
                        y: 250,
                        side: state.currentSide,
                      })
                    }}
                  >
                    {emoji}
                  </Button>
                ))}
              </div>
            </div>

            {/* Uploaded Files */}
            {state.uploadedFiles.length > 0 && (
              <div className="space-y-2">
                <Label>Uploaded Files</Label>
                <div className="space-y-2">
                  {state.uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm truncate">{file.name}</span>
                      <Button variant="outline" size="sm" className="bg-transparent">
                        Use
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === "text" && (
          <>
            {/* Add Text */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Add Text</Label>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter your text"
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && e.currentTarget.value.trim()) {
                        addElement({
                          type: "text",
                          content: e.currentTarget.value,
                          x: 200,
                          y: 200,
                          side: state.currentSide,
                          style: {
                            color: "#000000",
                            fontSize: 16,
                            fontFamily: "Arial",
                            fontWeight: "normal",
                            fontStyle: "normal",
                          },
                        })
                        e.currentTarget.value = ""
                      }
                    }}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      addElement({
                        type: "text",
                        content: "Sample Text",
                        x: 200,
                        y: 200,
                        side: state.currentSide,
                        style: {
                          color: "#000000",
                          fontSize: 16,
                          fontFamily: "Arial",
                          fontWeight: "normal",
                          fontStyle: "normal",
                        },
                      })
                    }}
                    className="bg-transparent"
                  >
                    Add
                  </Button>
                </div>
              </div>

              {/* Text Styling (only show if text element is selected) */}
              {selectedElement && selectedElement.type === "text" && (
                <>
                  <div className="space-y-2">
                    <Label>Text Content</Label>
                    <Input
                      value={selectedElement.content}
                      onChange={(e) => updateElement(selectedElement.id, { content: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Font Family</Label>
                      <Select
                        value={selectedElement.style?.fontFamily || "Arial"}
                        onValueChange={(value) => handleTextStyleUpdate("fontFamily", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {fontFamilies.map((font) => (
                            <SelectItem key={font} value={font}>
                              {font}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Font Size: {selectedElement.style?.fontSize || 16}px</Label>
                      <Slider
                        value={[selectedElement.style?.fontSize || 16]}
                        onValueChange={([value]) => handleTextStyleUpdate("fontSize", value)}
                        min={8}
                        max={72}
                        step={1}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Text Color</Label>
                    <div className="flex space-x-2">
                      <Input
                        type="color"
                        value={selectedElement.style?.color || "#000000"}
                        onChange={(e) => handleTextStyleUpdate("color", e.target.value)}
                        className="w-16 h-8 p-1"
                      />
                      <div className="grid grid-cols-5 gap-1 flex-1">
                        {predefinedColors.map((color) => (
                          <button
                            key={color}
                            className="w-6 h-6 rounded border border-gray-300"
                            style={{ backgroundColor: color }}
                            onClick={() => handleTextStyleUpdate("color", color)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant={selectedElement.style?.fontWeight === "bold" ? "default" : "outline"}
                      size="sm"
                      onClick={() =>
                        handleTextStyleUpdate(
                          "fontWeight",
                          selectedElement.style?.fontWeight === "bold" ? "normal" : "bold",
                        )
                      }
                      className={selectedElement.style?.fontWeight !== "bold" ? "bg-transparent" : ""}
                    >
                      Bold
                    </Button>
                    <Button
                      variant={selectedElement.style?.fontStyle === "italic" ? "default" : "outline"}
                      size="sm"
                      onClick={() =>
                        handleTextStyleUpdate(
                          "fontStyle",
                          selectedElement.style?.fontStyle === "italic" ? "normal" : "italic",
                        )
                      }
                      className={selectedElement.style?.fontStyle !== "italic" ? "bg-transparent" : ""}
                    >
                      Italic
                    </Button>
                  </div>
                </>
              )}
            </div>
          </>
        )}

        {activeTab === "layers" && (
          <>
            <div className="space-y-2">
              <Label>Layer Management</Label>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {state.elements
                  .filter((el) => el.side === state.currentSide)
                  .sort((a, b) => b.zIndex - a.zIndex)
                  .map((element) => (
                    <div
                      key={element.id}
                      className={`flex items-center justify-between p-2 rounded border ${
                        selectedElementId === element.id ? "border-purple-500 bg-purple-50" : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <Layers className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium">
                          {element.type} - {element.content.substring(0, 20)}
                          {element.content.length > 20 ? "..." : ""}
                        </span>
                      </div>
                      <div className="flex space-x-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => bringToFront(element.id)}
                          className="bg-transparent"
                        >
                          ↑
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => sendToBack(element.id)}
                          className="bg-transparent"
                        >
                          ↓
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeElement(element.id)}
                          className="text-red-600 hover:text-red-700 bg-transparent"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Transform Controls for Selected Element */}
            {selectedElement && (
              <div className="space-y-4 pt-4 border-t">
                <Label>Transform Selected Element</Label>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>X Position: {Math.round(selectedElement.x)}</Label>
                    <Slider
                      value={[selectedElement.x]}
                      onValueChange={([value]) => handleElementTransform("x", value)}
                      min={0}
                      max={400}
                      step={1}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Y Position: {Math.round(selectedElement.y)}</Label>
                    <Slider
                      value={[selectedElement.y]}
                      onValueChange={([value]) => handleElementTransform("y", value)}
                      min={0}
                      max={500}
                      step={1}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Rotation: {selectedElement.rotation || 0}°</Label>
                  <Slider
                    value={[selectedElement.rotation || 0]}
                    onValueChange={([value]) => handleElementTransform("rotation", value)}
                    min={-180}
                    max={180}
                    step={1}
                  />
                </div>

                {(selectedElement.type === "image" || selectedElement.type === "pocket") && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Width: {selectedElement.width || 100}</Label>
                      <Slider
                        value={[selectedElement.width || 100]}
                        onValueChange={([value]) => handleElementTransform("width", value)}
                        min={20}
                        max={200}
                        step={1}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Height: {selectedElement.height || 100}</Label>
                      <Slider
                        value={[selectedElement.height || 100]}
                        onValueChange={([value]) => handleElementTransform("height", value)}
                        min={20}
                        max={200}
                        step={1}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
