"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Calculator, Users, Package, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface Product {
  id: number
  name: string
  voltage: number
  category: string
  price: number
}

interface BatteryCalculation {
  load: number
  hours: number
  voltage: number
  dod: number
  result?: number
}

interface ConsultationRequest {
  name: string
  phone: string
  notes: string
}

export default function DECTechDashboard() {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Solar Panel 300W", voltage: 24, category: "Solar Panels", price: 299.99 },
    { id: 2, name: "Lithium Battery 100Ah", voltage: 12, category: "Batteries", price: 899.99 },
    { id: 3, name: "MPPT Charge Controller", voltage: 12, category: "Controllers", price: 199.99 },
    { id: 4, name: "Pure Sine Wave Inverter", voltage: 24, category: "Inverters", price: 449.99 },
  ])

  const [newProduct, setNewProduct] = useState({
    name: "",
    voltage: "",
    category: "",
    price: "",
  })

  const [batteryCalc, setBatteryCalc] = useState<BatteryCalculation>({
    load: 0,
    hours: 0,
    voltage: 12,
    dod: 50,
  })

  const [consultation, setConsultation] = useState<ConsultationRequest>({
    name: "",
    phone: "",
    notes: "",
  })

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault()
    if (newProduct.name && newProduct.voltage && newProduct.category && newProduct.price) {
      const product: Product = {
        id: products.length + 1,
        name: newProduct.name,
        voltage: Number.parseInt(newProduct.voltage),
        category: newProduct.category,
        price: Number.parseFloat(newProduct.price),
      }
      setProducts([...products, product])
      setNewProduct({ name: "", voltage: "", category: "", price: "" })
    }
  }

  const calculateBattery = () => {
    // Battery capacity calculation: (Load × Hours) / (Voltage × DoD/100)
    const result = (batteryCalc.load * batteryCalc.hours) / (batteryCalc.voltage * (batteryCalc.dod / 100))
    setBatteryCalc({ ...batteryCalc, result })
  }

  const handleConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send to a backend
    alert(`Consultation request submitted for ${consultation.name}`)
    setConsultation({ name: "", phone: "", notes: "" })
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Solar Panels": "bg-yellow-100 text-yellow-800",
      Batteries: "bg-green-100 text-green-800",
      Controllers: "bg-blue-100 text-blue-800",
      Inverters: "bg-purple-100 text-purple-800",
    }
    return colors[category] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-3xl font-bold text-gray-900">DEC Tech</h1>
                <p className="text-sm text-gray-600">Solar Solutions Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="h-4 w-4 mr-1" />
                (555) 123-4567
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="h-4 w-4 mr-1" />
                info@dectech.com
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Products Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="h-5 w-5 mr-2" />
                  Product Inventory
                </CardTitle>
                <CardDescription>Manage your solar products and equipment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product Name</TableHead>
                        <TableHead>Voltage</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>{product.voltage}V</TableCell>
                          <TableCell>
                            <Badge className={getCategoryColor(product.category)}>{product.category}</Badge>
                          </TableCell>
                          <TableCell>${product.price.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Add Product Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="h-5 w-5 mr-2" />
                  Add New Product
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddProduct} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="productName">Product Name</Label>
                      <Input
                        id="productName"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        placeholder="Enter product name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="voltage">Voltage</Label>
                      <Input
                        id="voltage"
                        type="number"
                        value={newProduct.voltage}
                        onChange={(e) => setNewProduct({ ...newProduct, voltage: e.target.value })}
                        placeholder="12, 24, 48"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={newProduct.category}
                        onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Solar Panels">Solar Panels</SelectItem>
                          <SelectItem value="Batteries">Batteries</SelectItem>
                          <SelectItem value="Controllers">Controllers</SelectItem>
                          <SelectItem value="Inverters">Inverters</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="price">Price ($)</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        placeholder="0.00"
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full">
                    Add Product
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Calculator and Consultation */}
          <div className="space-y-6">
            {/* Battery Calculator */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="h-5 w-5 mr-2" />
                  Battery Calculator
                </CardTitle>
                <CardDescription>Calculate required battery capacity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="load">Load (Watts)</Label>
                  <Input
                    id="load"
                    type="number"
                    value={batteryCalc.load || ""}
                    onChange={(e) => setBatteryCalc({ ...batteryCalc, load: Number.parseFloat(e.target.value) || 0 })}
                    placeholder="Enter load in watts"
                  />
                </div>
                <div>
                  <Label htmlFor="hours">Hours of Operation</Label>
                  <Input
                    id="hours"
                    type="number"
                    value={batteryCalc.hours || ""}
                    onChange={(e) => setBatteryCalc({ ...batteryCalc, hours: Number.parseFloat(e.target.value) || 0 })}
                    placeholder="Hours per day"
                  />
                </div>
                <div>
                  <Label htmlFor="systemVoltage">System Voltage</Label>
                  <Select
                    value={batteryCalc.voltage.toString()}
                    onValueChange={(value) => setBatteryCalc({ ...batteryCalc, voltage: Number.parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12">12V</SelectItem>
                      <SelectItem value="24">24V</SelectItem>
                      <SelectItem value="48">48V</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="dod">Depth of Discharge (%)</Label>
                  <Input
                    id="dod"
                    type="number"
                    value={batteryCalc.dod || ""}
                    onChange={(e) => setBatteryCalc({ ...batteryCalc, dod: Number.parseFloat(e.target.value) || 50 })}
                    placeholder="50"
                    max="100"
                    min="1"
                  />
                </div>
                <Button onClick={calculateBattery} className="w-full">
                  Calculate
                </Button>
                {batteryCalc.result && (
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-700">Required Battery Capacity:</p>
                    <p className="text-2xl font-bold text-green-800">{batteryCalc.result.toFixed(1)} Ah</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Consultation Request Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Solar Consultation
                </CardTitle>
                <CardDescription>Request a consultation with our experts</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleConsultationSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="clientName">Full Name</Label>
                    <Input
                      id="clientName"
                      value={consultation.name}
                      onChange={(e) => setConsultation({ ...consultation, name: e.target.value })}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={consultation.phone}
                      onChange={(e) => setConsultation({ ...consultation, phone: e.target.value })}
                      placeholder="(555) 123-4567"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="notes">Project Notes</Label>
                    <Textarea
                      id="notes"
                      value={consultation.notes}
                      onChange={(e) => setConsultation({ ...consultation, notes: e.target.value })}
                      placeholder="Tell us about your solar project requirements..."
                      rows={4}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Request Consultation
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
