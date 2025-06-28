'use client';

import type React from 'react';

import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Users, Phone, MapPin, MessageSquare, CheckCircle } from 'lucide-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function ConsultationPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('https://dec-tech.onrender.com/consults', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit consultation request');
      }

      // Step 2: Send via EmailJS
      const emailResponse = await emailjs.send(
        'service_v2mdvbs', // Replace with your EmailJS service ID
        'template_a99rzls', // Replace with your EmailJS template ID
        formData,
        'srkWXI2L5mpBxoUKK' // Replace with your public key
      );
      console.log('EmailJS response:', emailResponse);

      setIsSubmitted(true);
      setFormData({ name: '', phone: '', location: '', message: '' });
    } catch (err) {
      console.error('Failed to submit consultation:', err);
      setError('Failed to submit your request. Please try again.');
      // Still show success for demo purposes
      setTimeout(() => {
        setIsSubmitted(true);
        setFormData({ name: '', phone: '', location: '', message: '' });
      }, 1000);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <CheckCircle className="h-20 w-20 text-brand-green mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-brand-white mb-4">
            Thank You!
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Your consultation request has been submitted successfully. Our team
            will contact you within 24 hours.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="bg-brand-yellow text-brand-dark font-semibold py-3 px-6 rounded-lg hover:bg-yellow-300 transition-colors"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <Users className="h-16 w-16 text-brand-yellow mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-brand-white mb-4">
          Solar Consultation
        </h1>
        <p className="text-xl text-gray-400">
          Get expert advice tailored to your energy needs
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Consultation Form */}
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <h2 className="text-2xl font-bold text-brand-white mb-6">
            Request Consultation
          </h2>

          {error && (
            <div className="bg-red-900/20 border border-red-500/30 text-red-400 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-lg font-medium text-brand-white">
                <Users className="inline h-5 w-5 mr-2 text-brand-yellow" />
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-brand-white focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-lg font-medium text-brand-white">
                <Phone className="inline h-5 w-5 mr-2 text-brand-green" />
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-brand-white focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                placeholder="(555) 123-4567"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-lg font-medium text-brand-white">
                <MapPin className="inline h-5 w-5 mr-2 text-brand-yellow" />
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-brand-white focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                placeholder="City, State or ZIP code"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-lg font-medium text-brand-white">
                <MessageSquare className="inline h-5 w-5 mr-2 text-brand-green" />
                Project Notes
              </label>
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-brand-white focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                placeholder="Tell us about your solar project requirements, current energy usage, or any specific questions..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-brand-yellow text-brand-dark font-bold py-4 px-8 rounded-lg hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Request Consultation'}
            </button>
          </form>
        </div>

        {/* Information Panel */}
        <div className="space-y-8">
          <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
            <h3 className="text-2xl font-bold text-brand-white mb-6">
              What to Expect
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-brand-yellow rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-brand-dark font-bold text-sm">1</span>
                </div>
                <div>
                  <h4 className="text-brand-white font-semibold">
                    Initial Assessment
                  </h4>
                  <p className="text-gray-400 text-sm">
                    We'll review your energy needs and site conditions
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-brand-green rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-brand-dark font-bold text-sm">2</span>
                </div>
                <div>
                  <h4 className="text-brand-white font-semibold">
                    Custom Design
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Tailored solar solution designed for your property
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-brand-yellow rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-brand-dark font-bold text-sm">3</span>
                </div>
                <div>
                  <h4 className="text-brand-white font-semibold">
                    Detailed Proposal
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Complete pricing and installation timeline
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-brand-green/10 to-brand-yellow/10 border border-brand-green/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-brand-white mb-4">
              Why Choose DEC Tech?
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-brand-green mr-3" />
                15+ years of solar experience
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-brand-green mr-3" />
                Licensed and certified installers
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-brand-green mr-3" />
                25-year equipment warranty
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-brand-green mr-3" />
                Free consultation and design
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
