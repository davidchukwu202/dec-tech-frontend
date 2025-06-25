// Test script to verify Render backend connection
const API_BASE_URL = "https://dec-tech.onrender.com"

async function testBackendConnection() {
  console.log("🧪 Testing DEC Tech Backend Connection...")
  console.log(`Backend URL: ${API_BASE_URL}`)
  console.log("=".repeat(50))

  // Test 1: Basic connectivity
  try {
    console.log("1️⃣ Testing basic connectivity...")
    const response = await fetch(API_BASE_URL)
    console.log(`✅ Backend is reachable - Status: ${response.status}`)

    if (response.ok) {
      const text = await response.text()
      console.log(`📄 Response: ${text.substring(0, 100)}...`)
    }
  } catch (error) {
    console.log(`❌ Backend connectivity failed: ${error.message}`)
    return false
  }

  // Test 2: Products API
  try {
    console.log("\n2️⃣ Testing Products API...")
    const response = await fetch(`${API_BASE_URL}/api/products`)

    if (response.ok) {
      const products = await response.json()
      console.log(`✅ Products API working - Found ${products.length} products`)
      console.log(`📦 Sample product: ${products[0]?.name || "No products"}`)
    } else {
      console.log(`⚠️ Products API returned ${response.status} - Will use fallback data`)
    }
  } catch (error) {
    console.log(`⚠️ Products API not available: ${error.message}`)
  }

  // Test 3: Contact API
  try {
    console.log("\n3️⃣ Testing Contact API...")
    const testData = {
      name: "Test User",
      email: "test@example.com",
      phone: "+1234567890",
      subject: "API Test",
      message: "This is a test message",
      type: "general_contact",
    }

    const response = await fetch(`${API_BASE_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData),
    })

    if (response.ok) {
      console.log("✅ Contact API working")
    } else {
      console.log(`⚠️ Contact API returned ${response.status}`)
    }
  } catch (error) {
    console.log(`⚠️ Contact API not available: ${error.message}`)
  }

  // Test 4: Consultation API
  try {
    console.log("\n4️⃣ Testing Consultation API...")
    const testData = {
      name: "Test User",
      phone: "+1234567890",
      location: "Test City",
      notes: "This is a test consultation request",
    }

    const response = await fetch(`${API_BASE_URL}/api/consultation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData),
    })

    if (response.ok) {
      console.log("✅ Consultation API working")
    } else {
      console.log(`⚠️ Consultation API returned ${response.status}`)
    }
  } catch (error) {
    console.log(`⚠️ Consultation API not available: ${error.message}`)
  }

  // Test 5: Image Upload API
  try {
    console.log("\n5️⃣ Testing Image Upload API...")
    const response = await fetch(`${API_BASE_URL}/api/upload`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        test: true,
        filename: "test-image.jpg",
      }),
    })

    if (response.ok) {
      console.log("✅ Image Upload API working")
    } else {
      console.log(`⚠️ Image Upload API returned ${response.status}`)
    }
  } catch (error) {
    console.log(`⚠️ Image Upload API not available: ${error.message}`)
  }

  console.log("\n" + "=".repeat(50))
  console.log("🎯 Backend test completed!")
  console.log("💡 Note: Some APIs may not be implemented yet - that's normal!")

  return true
}

// Run the test
testBackendConnection()
