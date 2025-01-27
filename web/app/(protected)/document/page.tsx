'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/hooks/use-toast'
import { Copy, FileText, Loader2, UploadCloud } from 'lucide-react'

interface SummaryResponse {
  summary: string
}

// Create axios instance with base URL
const apiClient = axios.create({
  baseURL: process.env.BACKEND_URL || 'https://80.225.193.58:8000',
  timeout: 30000, // 30 seconds timeout
})

export default function DocumentSummarizer() {
  const [file, setFile] = useState<File | null>(null)
  const [summary, setSummary] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [pageRange, setPageRange] = useState({ from: '', to: '' })
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0])
    setError(null)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    onError: (err) => setError(err.message)
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return
  
    try {
      setLoading(true)
      setError(null)
      setSummary('')
  
      const formData = new FormData()
      formData.append('file', file)
      if (pageRange.from) formData.append('from_page', pageRange.from)
      if (pageRange.to) formData.append('to_page', pageRange.to)
  
      // Request is now sent to local API route
      const response = await apiClient.post<SummaryResponse>('/api/summarize', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
  
      setSummary(response.data.summary)
      toast({
        title: 'Summary Generated',
        description: 'Your document summary is ready!',
      })
    } catch (error) {
      console.error('Summarization error:', error)
      setError('Failed to generate summary. Please try again.')

      toast({
        title: 'Error',
        description: axios.isAxiosError(error)
          ? error.response?.data?.message || 'Failed to generate summary'
          : 'Something went wrong',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(summary)
      toast({
        title: 'Copied!',
        description: 'Summary copied to clipboard'
      })
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to copy text',
        variant: 'destructive'
      })
    }
  }

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50/20 p-8 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
        <div className="absolute inset-0 animate-gradient-shift bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
  
        <div className="max-w-4xl mx-auto space-y-8 relative">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-slate-900 bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 inline-block">
              Document Summarizer
            </h1>
            <p className="text-slate-600 text-lg font-medium">
              Transform lengthy PDFs into concise summaries with AI
            </p>
          </div>
  
          {/* Upload Card */}
          <Card className="shadow-lg border border-gray-100 bg-white/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Dropzone Section */}
                <div
                  {...getRootProps()}
                  className={`group border-3 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300
                    ${isDragActive ? 'border-blue-500 bg-blue-50/50' : 'border-gray-200 hover:border-blue-400'}
                    ${error ? 'border-red-500 bg-red-50' : ''}`}
                >
                  <input {...getInputProps()} />
                  <div className="space-y-4">
                    <div className="inline-flex justify-center items-center relative">
                      <UploadCloud className="h-14 w-14 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                      <div className="absolute -right-2 -top-2 bg-white p-1.5 rounded-full shadow-sm border border-gray-100">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-gray-600 font-medium text-lg">
                        {isDragActive ? 'Drop to analyze' : 'Select PDF document'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {file ? file.name : 'Drag & drop or click to browse'}
                      </p>
                      {error && (
                        <p className="text-sm text-red-500 mt-2 font-medium">{error}</p>
                      )}
                    </div>
                  </div>
                </div>
  
                {/* Page Range Inputs */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-medium" htmlFor="from-page">
                      Start Page
                    </Label>
                    <Input
                      id="from-page"
                      type="number"
                      placeholder="Optional"
                      className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={pageRange.from}
                      onChange={(e) => setPageRange({ ...pageRange, from: e.target.value })}
                      min={1}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-medium" htmlFor="to-page">
                      End Page
                    </Label>
                    <Input
                      id="to-page"
                      type="number"
                      placeholder="Optional"
                      className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={pageRange.to}
                      onChange={(e) => setPageRange({ ...pageRange, to: e.target.value })}
                      min={1}
                    />
                  </div>
                </div>
  
                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-12 text-lg font-semibold transition-all duration-300 hover:shadow-lg hover:scale-[1.005]"
                  disabled={!file || loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                      Analyzing Document...
                    </>
                  ) : (
                    <>
                      <UploadCloud className="mr-3 h-5 w-5" />
                      Generate Summary
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
  
          {/* Results Section */}
          {summary && (
            <Card className="shadow-xl border border-gray-100 bg-white/70 backdrop-blur-sm">
              <CardHeader className="pb-0 px-6 pt-6">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl font-bold text-slate-800">
                    AI Summary
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyToClipboard}
                    className="text-slate-600 hover:bg-slate-100/50 rounded-lg"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Summary
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="prose prose-slate max-w-none text-slate-700 text-lg leading-relaxed">
                  {summary.split('\n').map((line, i) => (
                    <p key={i} className="mb-4 last:mb-0">{line}</p>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
  
          {/* Loading State */}
          {loading && !summary && (
            <div className="space-y-6 animate-pulse">
              <div className="h-8 bg-gray-100 rounded-full w-1/2 mx-auto"></div>
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-4 bg-gray-100 rounded-full" style={{ width: `${100 - (i * 15)}%` }}></div>
                ))}
                <div className="h-4 bg-gray-100 rounded-full w-3/4"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  
}