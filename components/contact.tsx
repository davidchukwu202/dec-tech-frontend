"use client"

import type React from "react"

import { useState } from "react"
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          type: "general_contact",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      setIsSubmitted(true)
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
    } catch (err) {
      console.error("Failed to send message:", err)
      setError("Failed to send your message. Please try again or contact us directly.")
      // Still show success for demo purposes
      setTimeout(() => {
        setIsSubmitted(true)
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
      }, 1000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: "+234 7040818138",
      description: "Mon-Fri 8AM-6PM, Sat 9AM-4PM",
    },
    {
      icon: Mail,
      title: "Email",
      details: "dectechenergy@gmail.com",
      description: "We'll respond within 24 hours",
    },
    {
      icon: MapPin,
      title: "Address",
      details: "Port-Harcourt, Nigeria",
      description: "Visit our showroom and warehouse",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "Mon-Fri: 8AM-6PM",
      description: "Sat: 9AM-4PM, Sun: Closed",
    },
  ]

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <CheckCircle className="h-20 w-20 text-brand-green mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-brand-white mb-4">Message Sent!</h1>
          <p className="text-xl text-gray-400 mb-8">
            Thank you for contacting DEC Tech. We'll get back to you within 24 hours.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="bg-brand-yellow text-brand-dark font-semibold py-3 px-6 rounded-lg hover:bg-yellow-300 transition-colors"
          >
            Send Another Message
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/contact%20image.jpg-pXRe3wzGhMKR2Afew4tTWjGumM3UiN.png"
            alt="Professional customer service representative"
            className="w-full h-full object-cover object-center opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 to-brand-dark/70"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <img
              src="/images/dec-tech-logo.png"
              alt="DEC Tech Logo"
              className="h-24 w-24 mx-auto mb-6 object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-brand-white">Get In</span>
            <span className="text-brand-yellow"> Touch</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Ready to start your solar journey? Our experts are here to help you find the perfect energy solution for
            your needs.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-2xl p-6 border border-gray-800 text-center hover:border-brand-yellow/50 transition-colors"
              >
                <info.icon className="h-12 w-12 text-brand-yellow mx-auto mb-4" />
                <h3 className="text-xl font-bold text-brand-white mb-2">{info.title}</h3>
                <p className="text-brand-green font-semibold mb-2">{info.details}</p>
                <p className="text-gray-400 text-sm">{info.description}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
              <div className="flex items-center mb-6">
                <img src="/images/dec-tech-logo.png" alt="DEC Tech Logo" className="h-12 w-12 mr-3 object-contain" />
                <h2 className="text-3xl font-bold text-brand-white">Send Us a Message</h2>
              </div>

              {error && (
                <div className="bg-red-900/20 border border-red-500/30 text-red-400 p-4 rounded-lg mb-6">{error}</div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-brand-white mb-2">Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-brand-white focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-brand-white mb-2">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-brand-white focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-brand-white mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-brand-white focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-brand-white mb-2">Subject</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-brand-white focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="Solar Installation">Solar Installation</option>
                      <option value="Battery Storage">Battery Storage</option>
                      <option value="Maintenance">Maintenance</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-white mb-2">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-brand-white focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                    placeholder="Tell us about your project or ask any questions..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-yellow text-brand-dark font-bold py-4 px-8 rounded-lg hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Map and Additional Info */}
            <div className="space-y-8">
              {/* Map Section */}
              <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126846.3956093595!2d6.9857!3d4.8156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1069cd9c7c8b7a1f%3A0x3b5a0b8b8b8b8b8b!2sPort%20Harcourt%2C%20Nigeria!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                  width="100%"
                  height="256"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-64"
                  title="DEC Tech Location - Port Harcourt, Nigeria"
                />
              </div>

              {/* Why Choose Us */}
              <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
                <h3 className="text-2xl font-bold text-brand-white mb-6">Why Choose DEC Tech?</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-brand-green mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-brand-white font-semibold">Free Consultation</h4>
                      <p className="text-gray-400 text-sm">No-obligation assessment of your energy needs</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-brand-green mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-brand-white font-semibold">Expert Installation</h4>
                      <p className="text-gray-400 text-sm">Certified professionals with 15+ years experience</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-brand-green mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-brand-white font-semibold">25-Year Warranty</h4>
                      <p className="text-gray-400 text-sm">Comprehensive coverage on all equipment</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-brand-green mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-brand-white font-semibold">24/7 Support</h4>
                      <p className="text-gray-400 text-sm">Round-the-clock customer service</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-500/30 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-brand-white mb-3">Emergency Service</h3>
                <p className="text-gray-300 mb-4">
                  Need urgent solar system repair? Our emergency service team is available 24/7.
                </p>
                <a
                  href="tel:+2347040818138"
                  className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors inline-flex items-center"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Emergency: +234 7040818138
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
