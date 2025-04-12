'use client'
import { useState } from 'react'

export default function EyeDetection() {
  const [imageUrl, setImageUrl] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)

  const handleRetry = () => {
    setError(null)
    setResult(null)
    setLoading(false)
  }

  const handleUrlSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('https://optiscan-backend-s1n1.onrender.com/classify/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image_url: imageUrl }),
      })

      if (!response.ok) {
        throw new Error('Failed to analyze image. Please check the URL and try again.')
      }

      const data = await response.json()
      if (data.error) {
        throw new Error(data.error)
      }
      setResult(data)
      setPreviewUrl(imageUrl)
    } catch (err) {
      setError(err.message || 'An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleFileSubmit = async (e) => {
    e.preventDefault()
    if (!selectedFile) return

    setLoading(true)
    setError(null)
    setResult(null)

    const formData = new FormData()
    formData.append('image_file', selectedFile)

    try {
      const response = await fetch('https://optiscan-backend-s1n1.onrender.com/classify/file/', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to analyze image. Please check the file and try again.')
      }

      const data = await response.json()
      if (data.error) {
        throw new Error(data.error)
      }
      setResult(data)
      setPreviewUrl(URL.createObjectURL(selectedFile))
    } catch (err) {
      setError(err.message || 'An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('File size exceeds 5MB limit. Please choose a smaller file.')
        return
      }
      setSelectedFile(file)
      setPreviewUrl(URL.createObjectURL(file))
      setError(null)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Eye Detection</h1>
        <p className="mt-2 text-gray-600">Upload an image or provide a URL to detect if it contains a human eye.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* URL Input */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Analyze from URL</h2>
          <form onSubmit={handleUrlSubmit} className="space-y-4">
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="url"
                id="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://example.com/image.jpg"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Analyzing...' : 'Analyze URL'}
            </button>
          </form>
        </div>

        {/* File Upload */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
          <form onSubmit={handleFileSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image File
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading || !selectedFile}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Analyzing...' : 'Analyze Image'}
            </button>
          </form>
        </div>
      </div>

      {/* Results Section */}
      {(result || error) && (
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <p className="mt-1 text-sm text-red-700">{error}</p>
                  <button
                    onClick={handleRetry}
                    className="mt-2 text-sm font-medium text-red-600 hover:text-red-500"
                  >
                    Try Again →
                  </button>
                </div>
              </div>
            </div>
          )}

          {result && (
            <div className="space-y-4">
              {previewUrl && (
                <div className="flex justify-center">
                  <img
                    src={previewUrl}
                    alt="Analyzed"
                    className="max-h-64 rounded-lg shadow-sm"
                  />
                </div>
              )}
              <div className={`text-center text-lg font-medium ${result.is_eye ? 'text-green-600' : 'text-red-600'}`}>
                {result.is_eye ? '✅ Eye detected' : '❌ No eye detected'}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
} 