"use client"

import type React from "react"

import { useCustomization } from "@/contexts/customization-context"
import jsPDF from "jspdf"

export function usePDFGenerator() {
  const { state, getOrderData } = useCustomization()

  const generatePDF = async (canvasRef: React.RefObject<HTMLCanvasElement>) => {
    try {
      const pdf = new jsPDF("p", "mm", "a4")
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()

      // Title
      pdf.setFontSize(20)
      pdf.setTextColor(107, 70, 193) // Purple color
      pdf.text("Custom Design Order", 20, 30)

      // Order details
      pdf.setFontSize(12)
      pdf.setTextColor(0, 0, 0)

      let yPosition = 50
      const orderData = getOrderData()

      const details = [
        `Order Date: ${new Date().toLocaleDateString()}`,
        `Garment Type: ${orderData.garmentType}`,
        `Base Color: ${orderData.baseColor}`,
        `Fabric: ${orderData.fabric}`,
        `Size: ${orderData.size}`,
        `Sleeves: ${orderData.sleeves}`,
        `Collar: ${orderData.collar}`,
        `Number of Pockets: ${orderData.pockets}`,
        `Design Elements: ${orderData.elements.length}`,
      ]

      details.forEach((detail) => {
        pdf.text(detail, 20, yPosition)
        yPosition += 8
      })

      // Design elements details
      if (orderData.elements.length > 0) {
        yPosition += 10
        pdf.setFontSize(14)
        pdf.text("Design Elements:", 20, yPosition)
        yPosition += 10

        pdf.setFontSize(10)
        orderData.elements.forEach((element: any, index: number) => {
          const elementText = `${index + 1}. ${element.type.toUpperCase()}: "${element.content}" (${element.side} side)`
          pdf.text(elementText, 25, yPosition)
          yPosition += 6
        })
      }

      // Capture canvas as image
      if (canvasRef.current) {
        const canvas = canvasRef.current
        const canvasImage = canvas.toDataURL("image/png")

        // Add canvas image to PDF
        const imgWidth = 80
        const imgHeight = (canvas.height * imgWidth) / canvas.width

        pdf.addImage(canvasImage, "PNG", pageWidth - imgWidth - 20, 50, imgWidth, imgHeight)
      }

      // Add specifications
      yPosition = Math.max(yPosition + 20, 180)
      pdf.setFontSize(14)
      pdf.text("Manufacturing Specifications:", 20, yPosition)
      yPosition += 10

      pdf.setFontSize(10)
      const specs = [
        "• High-quality printing with fade-resistant inks",
        "• Pre-shrunk fabric to maintain size and shape",
        "• Double-stitched seams for durability",
        "• Care instructions: Machine wash cold, tumble dry low",
        "• Estimated production time: 3-5 business days",
        "• Quality guarantee: 100% satisfaction or remake",
      ]

      specs.forEach((spec) => {
        pdf.text(spec, 25, yPosition)
        yPosition += 6
      })

      // Footer
      pdf.setFontSize(8)
      pdf.setTextColor(128, 128, 128)
      pdf.text("CustomWear - Design Your Perfect Clothing", 20, pageHeight - 20)
      pdf.text(`Generated on ${new Date().toLocaleString()}`, 20, pageHeight - 15)

      // Save the PDF
      pdf.save(`custom-design-${Date.now()}.pdf`)

      return true
    } catch (error) {
      console.error("Error generating PDF:", error)
      return false
    }
  }

  return { generatePDF }
}
