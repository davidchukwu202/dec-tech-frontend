"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Phone, Mail, MapPin, Instagram } from "lucide-react"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname()

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Calculator", href: "/calculator" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <div className="min-h-screen bg-brand-dark text-brand-white">
      {/* Navigation */}
      <nav className="bg-brand-dark/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo - Much Larger */}
            <Link href="/" className="flex items-center space-x-3">
              <img
                src="/images/dec-tech-logo.png"
                alt="DEC Tech Logo"
                className="h-14 w-14 object-contain hover:scale-105 transition-transform duration-200"
              />
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-brand-white">DEC Tech</span>
                <span className="text-xs text-brand-yellow font-medium">Solar Solutions</span>
              </div>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex space-x-8">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-brand-yellow text-brand-dark"
                        : "text-brand-white hover:bg-gray-800 hover:text-brand-yellow"
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              })}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="text-brand-white hover:text-brand-yellow">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <img src="/images/dec-tech-logo.png" alt="DEC Tech Logo" className="h-12 w-12 object-contain" />
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-brand-white">DEC Tech</span>
                  <span className="text-sm text-brand-yellow">Solar Solutions</span>
                </div>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Leading the solar revolution with cutting-edge technology and sustainable energy solutions. We power
                your future sustainably with reliable, efficient solar systems.
              </p>
              <div className="flex space-x-4">
                <a href="https://www.instagram.com/dec.technologies/" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-5 w-5 text-gray-400 hover:text-brand-yellow cursor-pointer transition-colors" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-brand-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-gray-400 hover:text-brand-yellow transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-brand-white font-semibold mb-4">Contact Info</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-brand-green" />
                  <a href="tel:+2347040818138" className="text-gray-400 hover:text-brand-yellow transition-colors">
                    +234 7040818138
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-brand-green" />
                  <a
                    href="mailto:dectechenergy@gmail.com"
                    className="text-gray-400 hover:text-brand-yellow transition-colors"
                  >
                    dectechenergy@gmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-brand-green" />
                  <span className="text-gray-400">Nigeria</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">© 2025 DEC Tech. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
