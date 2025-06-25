"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Calculator, ArrowRight, Zap, Shield, Leaf, Award, CheckCircle, Star } from "lucide-react"

export default function HomePage() {
  const [quickCalc, setQuickCalc] = useState({
    load: "",
    hours: "",
    batteryType: "Lithium",
    voltage: "12",
  })

  const [result, setResult] = useState<number | null>(null)

  const handleQuickCalculate = (e: React.FormEvent) => {
    e.preventDefault()
    const load = Number.parseFloat(quickCalc.load)
    const hours = Number.parseFloat(quickCalc.hours)
    const voltage = Number.parseInt(quickCalc.voltage)
    const dod = quickCalc.batteryType === "Lithium" ? 0.95 : 0.5

    if (load && hours && voltage) {
      const capacity = (load * hours) / (voltage * dod)
      setResult(Math.ceil(capacity))
    }
  }

  const features = [
    {
      icon: Zap,
      title: "High Efficiency",
      description: "Up to 22% efficiency solar panels with advanced PERC technology",
    },
    {
      icon: Shield,
      title: "25-Year Warranty",
      description: "Industry-leading warranty on all solar panels and equipment",
    },
    {
      icon: Leaf,
      title: "Eco-Friendly",
      description: "Reduce your carbon footprint with clean, renewable energy",
    },
    {
      icon: Award,
      title: "Certified Quality",
      description: "All products meet international quality and safety standards",
    },
  ]

  const testimonials = [
    {
      name: "Esinna Chisom",
      location: "Enugu State, Nigeria",
      rating: 5,
      text: "DEC Tech transformed our home with an amazing solar system. Our electricity bills are now practically zero!",
    },
    {
      name: "Israel Jackson",
      location: "Port-harcourt, Nigeria",
      rating: 5,
      text: "Professional installation and excellent customer service. Highly recommend DEC Tech for solar solutions.",
    },
    {
      name: "Adioleaba Arinze",
      location: "Delta, Nigeria",
      rating: 5,
      text: "The battery backup system has been a game-changer during power outages. Great investment!",
    },
  ]

  const stats = [
    { number: "5000+", label: "Happy Customers" },
    { number: "15+", label: "Years Experience" },
    { number: "50MW+", label: "Solar Installed" },
    { number: "99%", label: "Customer Satisfaction" },
  ]

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/modern%20home.jpg-AlAbzeG8m70ptVePb5xPn2U0nyg42H.png"
            alt="Modern home with solar panels at dusk"
            className="w-full h-full object-cover object-center opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 to-brand-dark/70"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-brand-white">Power Your Future</span>
            <br />
            <span className="text-brand-yellow">Sustainably</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
            Transform your home or business with cutting-edge solar technology. Clean energy, reliable power, and
            significant savings await.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/contact"
              className="bg-brand-yellow text-brand-dark font-bold py-4 px-8 rounded-lg text-lg hover:bg-yellow-300 transition-colors"
            >
              Get Free Quote
            </Link>
            <Link
              href="/calculator"
              className="bg-transparent border-2 border-brand-green text-brand-green font-bold py-4 px-8 rounded-lg text-lg hover:bg-brand-green hover:text-brand-dark transition-colors"
            >
              Calculate Savings
            </Link>
          </div>

          {/* Feature Icons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <feature.icon className="h-12 w-12 text-brand-yellow mx-auto mb-3" />
                <h3 className="text-brand-white font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-brand-yellow mb-2">{stat.number}</div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-brand-white mb-6">Leading Solar Innovation Since 2009</h2>
              <p className="text-lg text-gray-300 mb-6">
                DEC Tech has been at the forefront of solar technology, providing reliable, efficient, and affordable
                solar solutions to thousands of satisfied customers across the country.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-brand-green" />
                  <span className="text-gray-300">Licensed and certified installers</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-brand-green" />
                  <span className="text-gray-300">Premium quality equipment</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-brand-green" />
                  <span className="text-gray-300">Comprehensive warranty coverage</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-brand-green" />
                  <span className="text-gray-300">24/7 customer support</span>
                </div>
              </div>
              <Link
                href="/about"
                className="inline-flex items-center text-brand-yellow hover:text-yellow-300 font-semibold"
              >
                Learn More About Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="relative">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/team%201.jpg-jrfVbbavCsKDU5btt1jC8FyjncuMpq.png"
                alt="DEC Tech team installing solar panels"
                className="rounded-2xl shadow-2xl w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Battery Calculator */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
            <div className="text-center mb-8">
              <Calculator className="h-12 w-12 text-brand-yellow mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-brand-white mb-2">Quick Battery Calculator</h2>
              <p className="text-gray-400">Get an instant estimate for your battery backup needs</p>
            </div>

            <form onSubmit={handleQuickCalculate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-brand-white mb-2">Load (Watts)</label>
                  <input
                    type="number"
                    value={quickCalc.load}
                    onChange={(e) => setQuickCalc({ ...quickCalc, load: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-brand-white focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                    placeholder="Enter load in watts"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-white mb-2">Backup Hours</label>
                  <input
                    type="number"
                    value={quickCalc.hours}
                    onChange={(e) => setQuickCalc({ ...quickCalc, hours: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-brand-white focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                    placeholder="Hours of backup needed"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-white mb-2">Battery Type</label>
                  <select
                    value={quickCalc.batteryType}
                    onChange={(e) => setQuickCalc({ ...quickCalc, batteryType: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-brand-white focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                  >
                    <option value="Lithium">Lithium</option>
                    <option value="Lead-Acid">Lead-Acid</option>
                    <option value="AGM">AGM</option>
                    <option value="Gel">Gel</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-white mb-2">Voltage</label>
                  <select
                    value={quickCalc.voltage}
                    onChange={(e) => setQuickCalc({ ...quickCalc, voltage: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-brand-white focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                  >
                    <option value="12">12V</option>
                    <option value="24">24V</option>
                    <option value="48">48V</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-brand-yellow text-brand-dark font-semibold py-3 px-6 rounded-lg hover:bg-yellow-300 transition-colors"
                >
                  Calculate Now
                </button>
                <Link
                  href="/calculator"
                  className="flex-1 bg-brand-green text-brand-white font-semibold py-3 px-6 rounded-lg hover:bg-green-600 transition-colors text-center flex items-center justify-center"
                >
                  Full Calculator
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </form>

            {result && (
              <div className="mt-8 p-6 bg-brand-green/10 border border-brand-green/20 rounded-lg">
                <div className="text-center">
                  <p className="text-brand-green font-semibold mb-2">Recommended Battery Capacity:</p>
                  <p className="text-3xl font-bold text-brand-white">{result} Ah</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Based on {quickCalc.batteryType} battery with {quickCalc.batteryType === "Lithium" ? "95%" : "50%"}{" "}
                    DoD
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-brand-white mb-4">Our Premium Products</h2>
            <p className="text-xl text-gray-400">High-quality solar equipment for every need</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-brand-yellow/50 transition-colors">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-QpzSjLckUKNYZawGbRyix2kiakkEmV.png"
                alt="Monocrystalline Solar Panel"
                className="w-full h-48 object-contain bg-white rounded-lg mb-4 p-4"
              />
              <h3 className="text-xl font-bold text-brand-white mb-2">Solar Panels</h3>
              <p className="text-gray-400 mb-4">High-efficiency monocrystalline panels with 21% efficiency rating</p>
              <div className="text-brand-yellow font-semibold">12/24/48V System</div>
            </div>

            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-brand-yellow/50 transition-colors">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-IPmgY5WNS2fjcCqfmvE1gugeFxpyHr.png"
                alt="Pure Sine Wave Inverter"
                className="w-full h-48 object-contain bg-white rounded-lg mb-4 p-4"
              />
              <h3 className="text-xl font-bold text-brand-white mb-2">Inverters</h3>
              <p className="text-gray-400 mb-4">Pure sine wave inverters with 95% efficiency and low THD</p>
              <div className="text-brand-yellow font-semibold">12/24/48V System</div>
            </div>

            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-brand-yellow/50 transition-colors">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-4Mif3pHJObZgqAuBHoaoqovAZ2ksvU.png"
                alt="Lithium Battery"
                className="w-full h-48 object-contain bg-white rounded-lg mb-4 p-4"
              />
              <h3 className="text-xl font-bold text-brand-white mb-2">Batteries</h3>
              <p className="text-gray-400 mb-4">Premium lithium batteries with 6000+ cycle life and built-in BMS</p>
              <div className="text-brand-yellow font-semibold">12/24/48V System</div>
            </div>

            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-brand-yellow/50 transition-colors">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-49ZEn1LsDsuxffq5Qr7coqgplD1FT1.png"
                alt="MPPT Charge Controller"
                className="w-full h-48 object-contain bg-white rounded-lg mb-4 p-4"
              />
              <h3 className="text-xl font-bold text-brand-white mb-2">Controllers</h3>
              <p className="text-gray-400 mb-4">Advanced MPPT charge controllers with LCD display and protection</p>
              <div className="text-brand-yellow font-semibold">12/24/48V System</div>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/products"
              className="bg-brand-green text-brand-white font-semibold py-3 px-8 rounded-lg hover:bg-green-600 transition-colors inline-flex items-center"
            >
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-brand-white mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-400">Real experiences from satisfied customers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-brand-yellow fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold text-brand-white">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-brand-yellow/10 to-brand-green/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-brand-white mb-4">Ready to Go Solar?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of satisfied customers who have made the switch to clean, renewable energy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-brand-yellow text-brand-dark font-bold py-4 px-8 rounded-lg text-lg hover:bg-yellow-300 transition-colors"
            >
              Get Your Free Quote
            </Link>
            <Link
              href="/consultation"
              className="bg-transparent border-2 border-brand-green text-brand-green font-bold py-4 px-8 rounded-lg text-lg hover:bg-brand-green hover:text-brand-dark transition-colors"
            >
              Schedule Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
