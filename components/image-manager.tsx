"use client"

import { useState } from "react"
import { Upload, ImageIcon, Check, X, Loader2 } from "lucide-react"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"

interface ImageUploadResult {
  success: boolean
  url?: string
  error?: string
}

export default function ImageManager() {
  const [uploading, setUploading] = useState(false)
  const [results, setResults] = useState<ImageUploadResult[]>([])

  const productImages = [
    {
      name: "Solar Panel",
      file: "solar-panel.png",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-QpzSjLckUKNYZawGbRyix2kiakkEmV.png",
      category: "solar-panels",
    },
    {
      name: "Inverter",
      file: "inverter.png",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-IPmgY5WNS2fjcCqfmvE1gugeFxpyHr.png",
      category: "inverters",
    },
    {
      name: "Charge Controller",
      file: "charge-controller.png",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-49ZEn1LsDsuxffq5Qr7coqgplD1FT1.png",
      category: "controllers",
    },
    {
      name: "Lithium Battery",
      file: "lithium-battery.png",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-4Mif3pHJObZgqAuBHoaoqovAZ2ksvU.png",
      category: "batteries",
    },
  ]

  const uploadImageToBackend = async (imageData: (typeof productImages)[0]) => {
    try {
      // Fetch the image
      const imageResponse = await fetch(imageData.url)
      if (!imageResponse.ok) {
        throw new Error(`Failed to fetch image: ${imageResponse.status}`)
      }

      const imageBlob = await imageResponse.blob()

      // Create FormData
      const formData = new FormData()
      formData.append("image", imageBlob, imageData.file)
      formData.append("category", imageData.category)
      formData.append("name", imageData.name)

      // Upload to backend
      const uploadResponse = await fetch(`${API_BASE_URL}/api/upload/image`, {
        method: "POST",
        body: formData,
      })

      if (uploadResponse.ok) {
        const result = await uploadResponse.json()
        return { success: true, url: result.url }
      } else {
        return { success: false, error: `Upload failed: ${uploadResponse.status}` }
      }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
    }
  }

  const handleUploadAll = async () => {
    setUploading(true)
    setResults([])

    const uploadResults: ImageUploadResult[] = []

    for (const imageData of productImages) {
      const result = await uploadImageToBackend(imageData)
      uploadResults.push(result)
      setResults([...uploadResults])

      // Small delay between uploads
      await new Promise((resolve) => setTimeout(resolve, 500))
    }

    setUploading(false)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 rounded-2xl border border-gray-800">
      <div className="text-center mb-8">
        <ImageIcon className="h-12 w-12 text-brand-yellow mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-brand-white mb-2">Image Manager</h2>
        <p className="text-gray-400">Upload product images to your Render backend</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {productImages.map((image, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center space-x-4">
              <img
                src={image.url || "/placeholder.svg"}
                alt={image.name}
                className="w-16 h-16 object-contain bg-white rounded p-2"
              />
              <div className="flex-1">
                <h3 className="text-brand-white font-semibold">{image.name}</h3>
                <p className="text-gray-400 text-sm">{image.category}</p>
              </div>
              <div className="flex-shrink-0">
                {uploading && index < results.length ? (
                  <Loader2 className="h-5 w-5 animate-spin text-brand-yellow" />
                ) : results[index] ? (
                  results[index].success ? (
                    <Check className="h-5 w-5 text-brand-green" />
                  ) : (
                    <X className="h-5 w-5 text-red-500" />
                  )
                ) : null}
              </div>
            </div>
            {results[index] && !results[index].success && (
              <p className="text-red-400 text-xs mt-2">{results[index].error}</p>
            )}
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={handleUploadAll}
          disabled={uploading}
          className="bg-brand-yellow text-brand-dark font-semibold py-3 px-8 rounded-lg hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mx-auto"
        >
          {uploading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Uploading Images...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" />
              Upload All Images to Backend
            </>
          )}
        </button>
      </div>

      {results.length > 0 && !uploading && (
        <div className="mt-8 p-4 bg-gray-800 rounded-lg border border-gray-700">
          <h3 className="text-brand-white font-semibold mb-2">Upload Results:</h3>
          <div className="text-sm">
            <p className="text-brand-green">✅ Successful: {results.filter((r) => r.success).length}</p>
            <p className="text-red-400">❌ Failed: {results.filter((r) => !r.success).length}</p>
          </div>
        </div>
      )}
    </div>
  )
}
