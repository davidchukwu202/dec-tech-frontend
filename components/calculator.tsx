"use client"

import type React from "react"

import { useState } from "react"
import { Calculator, Battery, Zap } from "lucide-react"

export default function CalculatorPage() {
  const [formData, setFormData] = useState({
    load: "",
    hours: "",
    batteryType: "Lithium",
    voltage: "12",
  })

  const [result, setResult] = useState<{
    capacity: number
    dod: number
    batteryType: string
    voltage: string
  } | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const load = Number.parseFloat(formData.load)
    const hours = Number.parseFloat(formData.hours)
    const voltage = Number.parseInt(formData.voltage)
    const dod = formData.batteryType === "Lithium" ? 0.95 : 0.5

    if (load && hours && voltage) {
      const capacity = (load * hours) / (voltage * dod)
      setResult({
        capacity: Math.ceil(capacity),
        dod: dod * 100,
        batteryType: formData.batteryType,
        voltage: formData.voltage,
      })
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <Calculator className="h-16 w-16 text-brand-yellow mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-brand-white mb-4">Battery Calculator</h1>
        <p className="text-xl text-gray-400">Calculate the exact battery capacity you need for your solar system</p>
      </div>

      <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-lg font-medium text-brand-white">
                <Zap className="inline h-5 w-5 mr-2 text-brand-yellow" />
                Load (Watts)
              </label>
              <input
                type="number"
                value={formData.load}
                onChange={(e) => setFormData({ ...formData, load: e.target.value })}
                className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-lg text-brand-white text-lg focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                placeholder="Enter total load in watts"
                required
              />
              <p className="text-sm text-gray-400">Total power consumption of all devices</p>
            </div>

            <div className="space-y-2">
              <label className="block text-lg font-medium text-brand-white">
                <Battery className="inline h-5 w-5 mr-2 text-brand-green" />
                Backup Hours
              </label>
              <input
                type="number"
                value={formData.hours}
                onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-lg text-brand-white text-lg focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                placeholder="Hours of backup needed"
                required
              />
              <p className="text-sm text-gray-400">How long you need power during outages</p>
            </div>

            <div className="space-y-2">
              <label className="block text-lg font-medium text-brand-white">Battery Type</label>
              <select
                value={formData.batteryType}
                onChange={(e) => setFormData({ ...formData, batteryType: e.target.value })}
                className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-lg text-brand-white text-lg focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
              >
                <option value="Lithium">Lithium (DoD: 95%)</option>
                <option value="Lead-Acid">Lead-Acid (DoD: 50%)</option>
                <option value="AGM">AGM (DoD: 50%)</option>
                <option value="Gel">Gel (DoD: 50%)</option>
              </select>
              <p className="text-sm text-gray-400">Different battery types have different discharge depths</p>
            </div>

            <div className="space-y-2">
              <label className="block text-lg font-medium text-brand-white">System Voltage</label>
              <select
                value={formData.voltage}
                onChange={(e) => setFormData({ ...formData, voltage: e.target.value })}
                className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-lg text-brand-white text-lg focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
              >
                <option value="12">12V System</option>
                <option value="24">24V System</option>
                <option value="48">48V System</option>
              </select>
              <p className="text-sm text-gray-400">Your solar system's operating voltage</p>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-brand-yellow text-brand-dark font-bold py-4 px-8 rounded-lg text-xl hover:bg-yellow-300 transition-colors"
          >
            Calculate Battery Capacity
          </button>
        </form>

        {result && (
          <div className="mt-12 p-8 bg-gradient-to-r from-brand-green/10 to-brand-yellow/10 border border-brand-green/20 rounded-xl">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-brand-white mb-6">Calculation Results</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <p className="text-brand-green font-semibold">Battery Type</p>
                  <p className="text-xl text-brand-white">{result.batteryType}</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <p className="text-brand-green font-semibold">System Voltage</p>
                  <p className="text-xl text-brand-white">{result.voltage}V</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <p className="text-brand-green font-semibold">Depth of Discharge</p>
                  <p className="text-xl text-brand-white">{result.dod}%</p>
                </div>
              </div>

              <div className="bg-brand-yellow/10 border border-brand-yellow/30 p-6 rounded-lg">
                <p className="text-brand-yellow font-semibold text-lg mb-2">Recommended Battery Capacity:</p>
                <p className="text-5xl font-bold text-brand-white">{result.capacity} Ah</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
