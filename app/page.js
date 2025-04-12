'use client'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="space-y-12 md:space-y-16">
      {/* Hero Section */}
      <div className="text-center py-12 md:py-20">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
          Advanced Eye Health Analysis
        </h1>
        <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-gray-500 max-w-3xl mx-auto px-4">
          Detect eyes and analyze diabetic retinopathy with our state-of-the-art AI technology.
          Get instant results and professional-grade analysis.
        </p>
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-4 px-4">
          <Link 
            href="/eye-detection" 
            className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center"
          >
            Try Eye Detection
          </Link>
          <Link 
            href="/retinopathy" 
            className="w-full sm:w-auto bg-white text-blue-600 px-6 py-3 rounded-lg font-medium border border-blue-600 hover:bg-blue-50 transition-colors text-center"
          >
            Analyze Retinopathy
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-4">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Eye Detection</h3>
          <p className="text-gray-500">Upload an image or provide a URL to detect if it contains a human eye with high accuracy.</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Retinopathy Analysis</h3>
          <p className="text-gray-500">Get detailed analysis of diabetic retinopathy with confidence scores for each classification.</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast Results</h3>
          <p className="text-gray-500">Receive instant analysis results with our optimized AI models and cloud infrastructure.</p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 rounded-2xl p-6 md:p-8 text-center text-white mx-4 md:mx-0">
        <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="mb-6 max-w-2xl mx-auto">Join thousands of users who trust OptiScan for accurate eye health analysis.</p>
        <Link 
          href="/eye-detection" 
          className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
        >
          Start Free Analysis
        </Link>
      </div>
    </div>
  )
} 