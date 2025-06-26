'use client';

import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const backendRes = await fetch('https://dec-tech.onrender.com/consults', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!backendRes.ok) throw new Error('Backend save failed');

      await emailjs.send(
        'service_v2mdvbs', // Your EmailJS service ID
        'template_a99rzls', // Your EmailJS template ID
        formData,
        'srkWXI2L5mpBxoUKK' // Your EmailJS public API key
      );

      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: '+234 7040818138',
      description: 'Mon-Fri 8AM-6PM, Sat 9AM-4PM',
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'dectechenergy@gmail.com',
      description: "We'll respond within 24 hours",
    },
    {
      icon: MapPin,
      title: 'Address',
      details: 'Port-Harcourt, Nigeria',
      description: 'Visit our showroom and warehouse',
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: 'Mon-Fri: 8AM-6PM',
      description: 'Sat: 9AM-4PM, Sun: Closed',
    },
  ];

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-white mb-4">Message Sent!</h1>
        <p className="text-xl text-gray-400 mb-8">
          Thank you for contacting DEC Tech. We'll get back to you soon.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="bg-yellow-400 text-black font-semibold py-3 px-6 rounded-lg hover:bg-yellow-300 transition"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/contact%20image.jpg-pXRe3wzGhMKR2Afew4tTWjGumM3UiN.png"
            alt="Contact"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/70" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <img
            src="/images/dec-tech-logo.png"
            alt="Logo"
            className="h-24 mx-auto mb-6 hover:scale-105 transition"
          />
          <h1 className="text-6xl font-bold text-white mb-6">
            Get In <span className="text-yellow-400">Touch</span>
          </h1>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
            Our experts are ready to guide your solar journey.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, idx) => (
              <div
                key={idx}
                className="bg-gray-900 p-6 border border-gray-800 rounded-2xl text-center hover:border-yellow-400/50"
              >
                <info.icon className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">
                  {info.title}
                </h3>
                <p className="text-green-500 font-semibold mb-2">
                  {info.details}
                </p>
                <p className="text-gray-400 text-sm">{info.description}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-gray-900 p-8 border border-gray-800 rounded-2xl">
              <h2 className="text-3xl font-bold text-white mb-6">
                Send Us a Message
              </h2>
              {error && (
                <p className="bg-red-700 text-white p-3 rounded mb-4">
                  {error}
                </p>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white"
                  />
                  <select
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    required
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white"
                  >
                    <option value="">Select a subject</option>
                    <option value="Solar Installation">
                      Solar Installation
                    </option>
                    <option value="Battery Storage">Battery Storage</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>
                <textarea
                  rows="6"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white"
                />
                <button
                  disabled={isSubmitting}
                  className="w-full bg-yellow-400 text-black font-bold py-4 px-8 rounded hover:bg-yellow-300 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            <div className="bg-gray-900 p-8 border border-gray-800 rounded-2xl">
              <h3 className="text-2xl font-bold text-white mb-6">
                Why Choose DEC Tech?
              </h3>
              {[
                'Free Consultation',
                'Expert Installation',
                '25-Year Warranty',
                '24/7 Support',
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-3 mb-4">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                  <p className="text-gray-400">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
