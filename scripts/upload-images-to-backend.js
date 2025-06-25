// Script to upload product images to your Render backend
const API_BASE_URL = "https://dec-tech.onrender.com"

const productImages = [
  {
    name: "solar-panel.png",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-QpzSjLckUKNYZawGbRyix2kiakkEmV.png",
    category: "solar-panels",
  },
  {
    name: "inverter.png",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-IPmgY5WNS2fjcCqfmvE1gugeFxpyHr.png",
    category: "inverters",
  },
  {
    name: "charge-controller.png",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-49ZEn1LsDsuxffq5Qr7coqgplD1FT1.png",
    category: "controllers",
  },
  {
    name: "lithium-battery.png",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-4Mif3pHJObZgqAuBHoaoqovAZ2ksvU.png",
    category: "batteries",
  },
]

async function uploadImageToBackend(imageData) {
  try {
    console.log(`📤 Uploading ${imageData.name}...`)

    // First, fetch the image
    const imageResponse = await fetch(imageData.url)
    if (!imageResponse.ok) {
      throw new Error(`Failed to fetch image: ${imageResponse.status}`)
    }

    const imageBlob = await imageResponse.blob()

    // Create FormData for upload
    const formData = new FormData()
    formData.append("image", imageBlob, imageData.name)
    formData.append("category", imageData.category)
    formData.append("originalUrl", imageData.url)

    // Upload to backend
    const uploadResponse = await fetch(`${API_BASE_URL}/api/upload/image`, {
      method: "POST",
      body: formData,
    })

    if (uploadResponse.ok) {
      const result = await uploadResponse.json()
      console.log(`✅ ${imageData.name} uploaded successfully`)
      console.log(`🔗 Backend URL: ${result.url || "URL not provided"}`)
      return result
    } else {
      console.log(`❌ Failed to upload ${imageData.name}: ${uploadResponse.status}`)
      return null
    }
  } catch (error) {
    console.log(`❌ Error uploading ${imageData.name}: ${error.message}`)
    return null
  }
}

async function uploadAllImages() {
  console.log("🖼️ Starting image upload to Render backend...")
  console.log("=".repeat(50))

  const results = []

  for (const imageData of productImages) {
    const result = await uploadImageToBackend(imageData)
    results.push({ ...imageData, uploadResult: result })

    // Wait a bit between uploads to avoid overwhelming the server
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  console.log("\n" + "=".repeat(50))
  console.log("📊 Upload Summary:")

  const successful = results.filter((r) => r.uploadResult !== null)
  const failed = results.filter((r) => r.uploadResult === null)

  console.log(`✅ Successful uploads: ${successful.length}`)
  console.log(`❌ Failed uploads: ${failed.length}`)

  if (failed.length > 0) {
    console.log("\n❌ Failed uploads:")
    failed.forEach((f) => console.log(`  - ${f.name}`))
  }

  if (successful.length > 0) {
    console.log("\n✅ Successful uploads:")
    successful.forEach((s) => console.log(`  - ${s.name}`))
  }

  return results
}

// Run the upload
uploadAllImages()
