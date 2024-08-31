"use client"
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa'
import "./globals.css"
export default function Component() {
  const [email, setEmail] = useState('')
  const [showThankYou, setShowThankYou] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [loading ,setLoading]=useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true)
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/sheet', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        throw new Error('Failed to add email to waitlist')
      }

      setShowThankYou(true)
      setEmail('')
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error('Error:', err)
    } finally {
      setLoading(false);
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-teal-700 to-purple-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-4xl w-full relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white via-transparent to-transparent opacity-10 z-0"></div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-12">
            <motion.h1 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-3xl font-bold text-cyan-300"
            >
              AI.co
            </motion.h1>
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex space-x-4"
            >
              <span className="text-sm text-cyan-300">Follow us</span>
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="w-5 h-5 text-cyan-300 cursor-pointer"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <FaFacebookF className="w-5 h-5" />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="w-5 h-5 text-cyan-300 cursor-pointer"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <FaInstagram className="w-5 h-5" />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="w-5 h-5 text-cyan-300 cursor-pointer"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <FaTwitter className="w-5 h-5" />
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl font-bold mb-4 text-teal-200">AI Coders At Work</h2>
            <p className="text-xl text-purple-200 opacity-80">-Coming Soon-</p>
          </motion.div>

          <div className="flex justify-center space-x-12 mb-16">
            {['Chip', 'Robot', 'Brain'].map((item, index) => (
              <motion.div
                key={item}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1, type: 'spring', stiffness: 500, damping: 15 }}
                className="relative"
              >
                <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <motion.svg
                    className="w-16 h-16 text-teal-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </motion.svg>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.form
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            onSubmit={handleSubmit}
            className="flex justify-center"
          >
            <div className="flex w-full max-w-md items-center space-x-2">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-grow px-4 py-2 rounded-l-full bg-teal-800 text-teal-100 placeholder-teal-300 placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-teal-200"
              />
              <button
                type="submit"
                className="px-6 py-2 rounded-r-full bg-teal-400 text-purple-900 font-semibold hover:bg-opacity-90 transition duration-300"
              >
                Join Waitlist
              </button>
            </div>
          </motion.form>
        </div>
      </motion.div>

      <AnimatePresence>
        {showThankYou && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full text-center"
            >
              <h2 className="text-3xl font-bold mb-4 text-teal-600">Thank You!</h2>
              <p className="text-gray-600 mb-6">
                We&#39;ve added you to our waitlist. We&#39;ll notify you as soon as we launch!
              </p>
              <button
                onClick={() => setShowThankYou(false)}
                className="px-6 py-2 rounded-full bg-teal-600 text-white font-semibold hover:bg-teal-700 transition duration-300"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {
          loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="bg-white rounded-2xl p-8 max-w-md w-full text-center"
              >
                <h2 className="text-3xl font-bold mb-4 text-teal-600">Loading...</h2>
                
                
              </motion.div>
            </motion.div>
          )

        }
      </AnimatePresence>
    </div>
  )
}
