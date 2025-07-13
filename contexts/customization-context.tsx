"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export interface CustomizationElement {
  id: string
  type: "text" | "image" | "emoji" | "pocket"
  content: string
  x: number
  y: number
  width?: number
  height?: number
  rotation?: number
  zIndex: number
  side: "front" | "back"
  style?: {
    color?: string
    fontSize?: number
    fontFamily?: string
    fontWeight?: string
    fontStyle?: string
  }
}

export interface CustomizationState {
  garmentType: string
  baseColor: string
  fabric: string
  size: string
  sleeves: "short" | "long" | "sleeveless"
  collar: "none" | "round" | "v-neck" | "polo"
  pockets: number
  pantLength: "full" | "half" | "three-fourths" | "shorts" // New
  pantHeight: number // New (percentage 0-100)
  elements: CustomizationElement[]
  currentSide: "front" | "back"
  selectedElementId: string | null
  history: CustomizationState[]
  historyIndex: number
  uploadedFiles: File[]
  customColors: string[]
}

interface CustomizationContextType {
  state: CustomizationState
  updateGarmentType: (type: string) => void
  updateBaseColor: (color: string) => void
  updateFabric: (fabric: string) => void
  updateSize: (size: string) => void
  updateSleeves: (sleeves: "short" | "long" | "sleeveless") => void
  updateCollar: (collar: "none" | "round" | "v-neck" | "polo") => void
  updatePockets: (count: number) => void
  updatePantLength: (length: "full" | "half" | "three-fourths" | "shorts") => void // New
  updatePantHeight: (height: number) => void // New
  addElement: (element: Omit<CustomizationElement, "id" | "zIndex">) => void
  updateElement: (id: string, updates: Partial<CustomizationElement>) => void
  removeElement: (id: string) => void
  selectElement: (id: string | null) => void
  switchSide: () => void
  undo: () => void
  redo: () => void
  addToHistory: () => void
  uploadFile: (file: File) => void
  addCustomColor: (color: string) => void
  resetCustomization: () => void
  getOrderData: () => any
}

const CustomizationContext = createContext<CustomizationContextType | undefined>(undefined)

const initialState: CustomizationState = {
  garmentType: "t-shirt",
  baseColor: "#ffffff",
  fabric: "cotton",
  size: "M",
  sleeves: "short",
  collar: "round",
  pockets: 0,
  pantLength: "full", // Initial value
  pantHeight: 100, // Initial value
  elements: [],
  currentSide: "front",
  selectedElementId: null,
  history: [],
  historyIndex: -1,
  uploadedFiles: [],
  customColors: [],
}

export function CustomizationProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CustomizationState>(initialState)

  const addToHistory = useCallback(() => {
    setState((prev) => {
      const newHistory = prev.history.slice(0, prev.historyIndex + 1)
      newHistory.push({ ...prev })
      return {
        ...prev,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      }
    })
  }, [])

  const updateGarmentType = useCallback(
    (type: string) => {
      setState((prev) => ({ ...prev, garmentType: type, elements: [] }))
      addToHistory()
    },
    [addToHistory],
  )

  const updateBaseColor = useCallback((color: string) => {
    setState((prev) => ({ ...prev, baseColor: color }))
  }, [])

  const updateFabric = useCallback((fabric: string) => {
    setState((prev) => ({ ...prev, fabric }))
  }, [])

  const updateSize = useCallback((size: string) => {
    setState((prev) => ({ ...prev, size }))
  }, [])

  const updateSleeves = useCallback(
    (sleeves: "short" | "long" | "sleeveless") => {
      setState((prev) => ({ ...prev, sleeves }))
      addToHistory()
    },
    [addToHistory],
  )

  const updateCollar = useCallback(
    (collar: "none" | "round" | "v-neck" | "polo") => {
      setState((prev) => ({ ...prev, collar }))
      addToHistory()
    },
    [addToHistory],
  )

  const updatePockets = useCallback(
    (count: number) => {
      setState((prev) => {
        const currentPockets = prev.elements.filter((el) => el.type === "pocket")
        let newElements = prev.elements.filter((el) => el.type !== "pocket")

        // Add new pockets if count increased
        for (let i = currentPockets.length; i < count; i++) {
          const pocket: CustomizationElement = {
            id: `pocket-${Date.now()}-${i}`,
            type: "pocket",
            content: "pocket",
            x: 100 + i * 50,
            y: 200 + i * 30,
            width: 40,
            height: 30,
            rotation: 0,
            zIndex: 1,
            side: prev.currentSide,
          }
          newElements.push(pocket)
        }

        // Keep existing pockets if count decreased
        if (count < currentPockets.length) {
          newElements = [...newElements, ...currentPockets.slice(0, count)]
        } else {
          newElements = [...newElements, ...currentPockets]
        }

        return { ...prev, pockets: count, elements: newElements }
      })
      addToHistory()
    },
    [addToHistory],
  )

  // New: Update pant length
  const updatePantLength = useCallback(
    (length: "full" | "half" | "three-fourths" | "shorts") => {
      setState((prev) => ({ ...prev, pantLength: length }))
      addToHistory()
    },
    [addToHistory],
  )

  // New: Update pant height
  const updatePantHeight = useCallback(
    (height: number) => {
      setState((prev) => ({ ...prev, pantHeight: height }))
      addToHistory()
    },
    [addToHistory],
  )

  const addElement = useCallback(
    (element: Omit<CustomizationElement, "id" | "zIndex">) => {
      setState((prev) => {
        const maxZ = Math.max(0, ...prev.elements.map((el) => el.zIndex))
        const newElement: CustomizationElement = {
          ...element,
          id: `${element.type}-${Date.now()}`,
          zIndex: maxZ + 1,
        }
        return { ...prev, elements: [...prev.elements, newElement] }
      })
      addToHistory()
    },
    [addToHistory],
  )

  const updateElement = useCallback((id: string, updates: Partial<CustomizationElement>) => {
    setState((prev) => ({
      ...prev,
      elements: prev.elements.map((el) => (el.id === id ? { ...el, ...updates } : el)),
    }))
  }, [])

  const removeElement = useCallback(
    (id: string) => {
      setState((prev) => ({
        ...prev,
        elements: prev.elements.filter((el) => el.id !== id),
        selectedElementId: prev.selectedElementId === id ? null : prev.selectedElementId,
      }))
      addToHistory()
    },
    [addToHistory],
  )

  const selectElement = useCallback((id: string | null) => {
    setState((prev) => ({ ...prev, selectedElementId: id }))
  }, [])

  const switchSide = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentSide: prev.currentSide === "front" ? "back" : "front",
      selectedElementId: null,
    }))
  }, [])

  const undo = useCallback(() => {
    setState((prev) => {
      if (prev.historyIndex > 0) {
        const previousState = prev.history[prev.historyIndex - 1]
        return { ...previousState, historyIndex: prev.historyIndex - 1, history: prev.history }
      }
      return prev
    })
  }, [])

  const redo = useCallback(() => {
    setState((prev) => {
      if (prev.historyIndex < prev.history.length - 1) {
        const nextState = prev.history[prev.historyIndex + 1]
        return { ...nextState, historyIndex: prev.historyIndex + 1, history: prev.history }
      }
      return prev
    })
  }, [])

  const uploadFile = useCallback((file: File) => {
    setState((prev) => ({ ...prev, uploadedFiles: [...prev.uploadedFiles, file] }))
  }, [])

  const addCustomColor = useCallback((color: string) => {
    setState((prev) => ({
      ...prev,
      customColors: prev.customColors.includes(color) ? prev.customColors : [...prev.customColors, color],
    }))
  }, [])

  const resetCustomization = useCallback(() => {
    setState(initialState)
  }, [])

  const getOrderData = useCallback(() => {
    return {
      garmentType: state.garmentType,
      baseColor: state.baseColor,
      fabric: state.fabric,
      size: state.size,
      sleeves: state.sleeves,
      collar: state.collar,
      pockets: state.pockets,
      pantLength: state.pantLength, // New
      pantHeight: state.pantHeight, // New
      elements: state.elements,
      uploadedFiles: state.uploadedFiles,
      customColors: state.customColors,
      timestamp: new Date().toISOString(),
    }
  }, [state])

  return (
    <CustomizationContext.Provider
      value={{
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
        selectElement,
        switchSide,
        undo,
        redo,
        addToHistory,
        uploadFile,
        addCustomColor,
        resetCustomization,
        getOrderData,
      }}
    >
      {children}
    </CustomizationContext.Provider>
  )
}

export function useCustomization() {
  const context = useContext(CustomizationContext)
  if (context === undefined) {
    throw new Error("useCustomization must be used within a CustomizationProvider")
  }
  return context
}
