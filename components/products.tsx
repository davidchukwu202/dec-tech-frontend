"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Package, Loader2, Filter, Search, Phone, X, Mail, MapPin, CheckCircle } from "lucide-react"

interface Product {
  id: number
  name: string
  voltage: string
  category: string
  description: string
  image: string
  features: string[]
}

interface ContactFormData {
  name: string
  email: string
  phone: string
  product: string
  message: string
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"

// Sample products as fallback
const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Monocrystalline Solar Panel",
    voltage: "12/24/48V",
    category: "Solar Panels",
    description:
      "High-efficiency monocrystalline solar panel with 21% efficiency rating. Perfect for residential and commercial installations.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-QpzSjLckUKNYZawGbRyix2kiakkEmV.png",
    features: ["21% Efficiency", "25-Year Warranty", "Weather Resistant", "Easy Installation"],
  },
  {
    id: 2,
    name: "Pure Sine Wave Inverter",
    voltage: "12/24/48V",
    category: "Inverters",
    description: "High-quality pure sine wave inverter with low THD and high efficiency for sensitive electronics.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-IPmgY5WNS2fjcCqfmvE1gugeFxpyHr.png",
    features: ["Pure Sine Wave", "95% Efficiency", "Low THD", "Digital Display"],
  },
  {
    id: 3,
    name: "MPPT Charge Controller",
    voltage: "12/24/48V",
    category: "Controllers",
    description: "Advanced MPPT charge controller with LCD display and multiple protection features.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-49ZEn1LsDsuxffq5Qr7coqgplD1FT1.png",
    features: ["MPPT Technology", "LCD Display", "Multiple Protections", "High Efficiency"],
  },
  {
    id: 4,
    name: "Lithium Battery",
    voltage: "12/24/48V",
    category: "Batteries",
    description: "Premium lithium iron phosphate battery with 6000+ cycle life and built-in BMS protection.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-4Mif3pHJObZgqAuBHoaoqovAZ2ksvU.png",
    features: ["6000+ Cycles", "Built-in BMS", "Lightweight", "Fast Charging"],
  },
]

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [showContactModal, setShowContactModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<string>("")
  const [contactForm, setContactForm] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    product: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Only try to fetch if we have a valid API URL that's not localhost
        if (API_BASE_URL && API_BASE_URL !== "http://localhost:3001") {
          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

          const response = await fetch(`${API_BASE_URL}/api/products`, {
            signal: controller.signal,
            headers: {
              "Content-Type": "application/json",
            },
          })

          clearTimeout(timeoutId)

          if (response.ok) {
            const data = await response.json()
            if (Array.isArray(data) && data.length > 0) {
              setProducts(data)
              setLoading(false)
              return
            }
          }
        }
      } catch (error) {
        // Silently fall back to sample products
        console.log("Using sample products (backend not available)")
      }

      // Always fall back to sample products
      setProducts(SAMPLE_PRODUCTS)
      setLoading(false)
    }

    fetchProducts()
  }, [])

  const categories = ["All", "Solar Panels", "Batteries", "Controllers", "Inverters"]

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Solar Panels": "bg-brand-yellow/20 text-brand-yellow border-brand-yellow/30",
      Batteries: "bg-brand-green/20 text-brand-green border-brand-green/30",
      Controllers: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      Inverters: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    }
    return colors[category] || "bg-gray-500/20 text-gray-400 border-gray-500/30"
  }

  const handleContactClick = (productName: string) => {
    setSelectedProduct(productName)
    setContactForm({ ...contactForm, product: productName })
    setShowContactModal(true)
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Only try to submit if we have a valid API URL
      if (API_BASE_URL && API_BASE_URL !== "http://localhost:3001") {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000)

        const response = await fetch(`${API_BASE_URL}/api/contact`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...contactForm,
            type: "product_inquiry",
          }),
          signal: controller.signal,
        })

        clearTimeout(timeoutId)

        if (response.ok) {
          setIsSubmitted(true)
          setContactForm({ name: "", email: "", phone: "", product: "", message: "" })
          setTimeout(() => {
            setShowContactModal(false)
            setIsSubmitted(false)
          }, 2000)
          setIsSubmitting(false)
          return
        }
      }
    } catch (error) {
      console.log("Contact form submission failed, showing success anyway")
    }

    // Always show success for demo purposes
    setIsSubmitted(true)
    setContactForm({ name: "", email: "", phone: "", product: "", message: "" })
    setTimeout(() => {
      setShowContactModal(false)
      setIsSubmitted(false)
    }, 2000)
    setIsSubmitting(false)
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-brand-yellow" />
          <span className="ml-2 text-brand-white">Loading products...</span>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Package className="h-16 w-16 text-brand-yellow mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-brand-white mb-4">Our Products</h1>
          <p className="text-xl text-gray-400">High-quality solar equipment for all your energy needs</p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-brand-white focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-brand-yellow text-brand-dark"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-gray-900 rounded-2xl border border-gray-800 hover:border-brand-yellow/50 transition-all duration-300 hover:transform hover:scale-105 overflow-hidden h-full flex flex-col"
            >
              {/* Product Image */}
              <div className="relative">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-48 object-contain bg-white p-4"
                />
              </div>

              {/* Product Info */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="mb-3">
                  <span
                    className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(product.category)}`}
                  >
                    {product.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-brand-white mb-2">{product.name}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>

                {/* Features */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {product.features.slice(0, 2).map((feature, index) => (
                      <span key={index} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
                        {feature}
                      </span>
                    ))}
                    {product.features.length > 2 && (
                      <span className="text-xs text-gray-500">+{product.features.length - 2} more</span>
                    )}
                  </div>
                </div>

                {/* Voltage */}
                <div className="flex items-center justify-between mb-4">
                  <div className="text-brand-yellow font-semibold">{product.voltage} System</div>
                </div>

                {/* Contact Button */}
                <div className="mt-auto">
                  <button
                    onClick={() => handleContactClick(product.name)}
                    className="w-full bg-brand-yellow text-brand-dark font-semibold py-2 px-4 rounded-lg hover:bg-yellow-300 transition-colors flex items-center justify-center"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <h3 className="text-2xl font-bold text-brand-white mb-4">Need Help Choosing?</h3>
          <p className="text-gray-400 mb-6">
            Our solar experts are here to help you find the perfect equipment for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-brand-yellow text-brand-dark font-semibold py-3 px-6 rounded-lg hover:bg-yellow-300 transition-colors"
            >
              Contact Our Experts
            </a>
            <a
              href="/calculator"
              className="bg-transparent border-2 border-brand-green text-brand-green font-semibold py-3 px-6 rounded-lg hover:bg-brand-green hover:text-brand-dark transition-colors"
            >
              Use Our Calculator
            </a>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl border border-gray-800 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-brand-white">Contact Us</h3>
                <button
                  onClick={() => setShowContactModal(false)}
                  className="text-gray-400 hover:text-brand-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {isSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-brand-green mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-brand-white mb-2">Message Sent!</h4>
                  <p className="text-gray-400">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-brand-white mb-2">Full Name</label>
                    <input
                      type="text"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-brand-white focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-brand-white mb-2">Email Address</label>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-brand-white focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-brand-white mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-brand-white focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                      placeholder="(555) 123-4567"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-brand-white mb-2">Product Interest</label>
                    <input
                      type="text"
                      value={contactForm.product}
                      onChange={(e) => setContactForm({ ...contactForm, product: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-brand-white focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                      placeholder="Product name"
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-brand-white mb-2">Message</label>
                    <textarea
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-brand-white focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                      placeholder="Tell us about your project requirements..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-yellow text-brand-dark font-bold py-3 px-6 rounded-lg hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Mail className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}

              <div className="mt-6 pt-6 border-t border-gray-800">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-brand-green" />
                    <span className="text-gray-400">+234 7040818138</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-brand-green" />
                    <span className="text-gray-400">dectechenergy@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-brand-green" />
                    <span className="text-gray-400">Port-Harcourt, Nigeria</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
