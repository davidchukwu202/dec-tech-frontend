"use client"

import { Users, Award, Zap, Shield, CheckCircle, Target, Eye, Heart } from "lucide-react"

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Quality First",
      description: "We never compromise on quality, using only premium components and certified installers.",
    },
    {
      icon: Eye,
      title: "Transparency",
      description: "Clear pricing, honest communication, and no hidden fees in all our dealings.",
    },
    {
      icon: Heart,
      title: "Customer Care",
      description: "Your satisfaction is our priority, with 24/7 support and comprehensive warranties.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Staying ahead with the latest solar technology and energy storage solutions.",
    },
  ]

  const milestones = [
    { year: "2009", event: "DEC Tech founded with a vision for clean energy" },
    { year: "2012", event: "Reached 100 successful installations" },
    { year: "2015", event: "Expanded to commercial solar solutions" },
    { year: "2018", event: "Launched battery storage division" },
    { year: "2021", event: "Achieved 1000+ satisfied customers" },
    { year: "2024", event: "Leading solar provider with 50MW+ installed" },
  ]

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/about%20team.jpg-rHgbhILUshQx0v28inbLZCKkzf7kFR.png"
            alt="DEC Tech professional installation team working on solar project"
            className="w-full h-full object-cover object-center opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 to-brand-dark/70"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-brand-white">About</span>
            <span className="text-brand-yellow"> DEC Tech</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Leading the solar revolution since 2009 with innovative technology, exceptional service, and a commitment to
            sustainable energy solutions.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
              <Target className="h-12 w-12 text-brand-yellow mb-6" />
              <h2 className="text-3xl font-bold text-brand-white mb-4">Our Mission</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                To accelerate the world's transition to sustainable energy by providing reliable, efficient, and
                affordable solar solutions that empower individuals and businesses to take control of their energy
                future.
              </p>
            </div>

            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
              <Eye className="h-12 w-12 text-brand-green mb-6" />
              <h2 className="text-3xl font-bold text-brand-white mb-4">Our Vision</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                To be the most trusted solar energy partner, recognized for innovation, quality, and customer
                satisfaction, while contributing to a cleaner, more sustainable planet for future generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-brand-white mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Founded in 2009 by Chukwuebuka Chuwku, DEC Tech began as a small solar installation company with a big
                  vision: to make clean energy accessible to everyone. What started in a garage has grown into one of
                  the region's most trusted solar providers.
                </p>
                <p>
                  Over the years, we've expanded our services to include commercial installations, battery storage
                  solutions, and comprehensive energy management systems. Our commitment to quality and customer
                  satisfaction has earned us thousands of satisfied customers and numerous industry awards.
                </p>
                <p>
                  Today, DEC Tech continues to lead the industry with innovative solutions, cutting-edge technology, and
                  a team of dedicated professionals who share our passion for sustainable energy.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/story.jpg-6JFiQeqNkTDDSPBTT6lbkuu3Rta1do.png"
                alt="DEC Tech journey from 2009 workshop to modern solar facility"
                className="rounded-2xl shadow-2xl w-full h-auto object-cover max-h-96"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-brand-white mb-4">Our Values</h2>
            <p className="text-xl text-gray-400">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-brand-yellow/50 transition-colors">
                  <value.icon className="h-12 w-12 text-brand-yellow mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-brand-white mb-3">{value.title}</h3>
                  <p className="text-gray-400">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-brand-white mb-4">Our Journey</h2>
            <p className="text-xl text-gray-400">Key milestones in our growth</p>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-center space-x-6">
                <div className="flex-shrink-0 w-20 h-20 bg-brand-yellow rounded-full flex items-center justify-center">
                  <span className="text-brand-dark font-bold text-lg">{milestone.year}</span>
                </div>
                <div className="flex-1 bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <p className="text-brand-white font-medium">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Award className="h-16 w-16 text-brand-yellow mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-brand-white mb-4">Certifications & Awards</h2>
            <p className="text-xl text-gray-400">Recognition for our commitment to excellence</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <Shield className="h-12 w-12 text-brand-green mx-auto mb-3" />
                <h3 className="text-brand-white font-semibold">NABCEP Certified</h3>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <Award className="h-12 w-12 text-brand-yellow mx-auto mb-3" />
                <h3 className="text-brand-white font-semibold">Better Business Bureau A+</h3>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <CheckCircle className="h-12 w-12 text-brand-green mx-auto mb-3" />
                <h3 className="text-brand-white font-semibold">Licensed & Insured</h3>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <Users className="h-12 w-12 text-brand-yellow mx-auto mb-3" />
                <h3 className="text-brand-white font-semibold">Customer Choice Award</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
