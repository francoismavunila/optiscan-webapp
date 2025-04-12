'use client'
import { useState } from 'react'

export default function Retinopathy() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)

  const handleFileSubmit = async (e) => {
    e.preventDefault()
    if (!selectedFile) return

    setLoading(true)
    setError(null)
    setResult(null)

    const formData = new FormData()
    formData.append('image_file', selectedFile)

    try {
      const response = await fetch('https://optiscan-backend-s1n1.onrender.com/classify/file/retinopathy/', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      if (data.error) {
        throw new Error(data.error)
      }
      setResult(data)
      setPreviewUrl(URL.createObjectURL(selectedFile))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const getSeverityColor = (label) => {
    switch (label) {
      case 'No DR':
        return 'bg-green-500'
      case 'Mild':
        return 'bg-yellow-500'
      case 'Moderate':
        return 'bg-orange-500'
      case 'Severe':
        return 'bg-red-500'
      case 'Proliferative DR':
        return 'bg-purple-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getSeverityText = (label) => {
    switch (label) {
      case 'No DR':
        return 'No Diabetic Retinopathy'
      case 'Mild':
        return 'Mild Diabetic Retinopathy'
      case 'Moderate':
        return 'Moderate Diabetic Retinopathy'
      case 'Severe':
        return 'Severe Diabetic Retinopathy'
      case 'Proliferative DR':
        return 'Proliferative Diabetic Retinopathy'
      default:
        return label
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Diabetic Retinopathy Analysis</h1>
        <p className="mt-2 text-gray-600">Upload an eye image to analyze for diabetic retinopathy.</p>
      </div>

      {/* Upload Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
        <form onSubmit={handleFileSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Eye Image
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

      {/* Results Section */}
      {(result || error) && (
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {result && (
            <div className="space-y-6">
              {previewUrl && (
                <div className="flex justify-center">
                  <img
                    src={previewUrl}
                    alt="Analyzed"
                    className="max-h-64 rounded-lg shadow-sm"
                  />
                </div>
              )}

              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-900">Classification</h3>
                  <p className={`text-2xl font-bold mt-1 ${getSeverityColor(result.retinopathy)} text-white px-4 py-2 rounded-lg inline-block`}>
                    {getSeverityText(result.retinopathy)}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Confidence Scores</h3>
                  <div className="space-y-3">
                    {result.confidences.map(({ label, confidence }) => (
                      <div key={label} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium text-gray-700">{getSeverityText(label)}</span>
                          <span className="text-gray-500">{(confidence * 100).toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className={`${getSeverityColor(label)} h-2.5 rounded-full transition-all duration-500`}
                            style={{ width: `${confidence * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">What does this mean?</h4>
                  <p className="text-sm text-gray-600">
                    {result.retinopathy === 'No DR' ? (
                      'No signs of diabetic retinopathy were detected in the image. However, regular eye examinations are still recommended for diabetic patients.'
                    ) : result.retinopathy === 'Mild' ? (
                      'Early signs of diabetic retinopathy were detected. Regular monitoring and good blood sugar control are important.'
                    ) : result.retinopathy === 'Moderate' ? (
                      'Moderate diabetic retinopathy was detected. Consultation with an eye specialist is recommended.'
                    ) : result.retinopathy === 'Severe' ? (
                      'Severe diabetic retinopathy was detected. Immediate consultation with an eye specialist is strongly recommended.'
                    ) : (
                      'Proliferative diabetic retinopathy was detected. This is an advanced stage requiring immediate medical attention.'
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
} 