'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from '@/hooks/use-toast'
import { Copy, FileText, Loader2, UploadCloud } from 'lucide-react'

interface SummaryResponse {
  summary: string
}

// Create axios instance with base URL
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8000',
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">Document Summarizer</h1>
          <p className="text-gray-600">Upload a PDF document to generate an AI-powered summary</p>
        </div>

        <Card className="shadow-lg border-0">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors
                  ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}
                  ${error ? 'border-red-500 bg-red-50' : ''}`}
              >
                <input {...getInputProps()} />
                <div className="space-y-3">
                  <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                  <div>
                    <p className="text-gray-600">
                      {isDragActive ? 'Drop PDF here' : 'Drag & drop PDF, or click to select'}
                    </p>
                    {file && (
                      <p className="text-sm text-gray-500 mt-2">
                        <FileText className="inline mr-2 h-4 w-4" />
                        {file.name}
                      </p>
                    )}
                    {error && (
                      <p className="text-sm text-red-500 mt-2">{error}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="from-page">From Page (optional)</Label>
                  <Input
                    id="from-page"
                    type="number"
                    value={pageRange.from}
                    onChange={(e) => setPageRange({ ...pageRange, from: e.target.value })}
                    min={1}
                  />
                </div>
                <div>
                  <Label htmlFor="to-page">To Page (optional)</Label>
                  <Input
                    id="to-page"
                    type="number"
                    value={pageRange.to}
                    onChange={(e) => setPageRange({ ...pageRange, to: e.target.value })}
                    min={1}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={!file || loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Summary...
                  </>
                ) : (
                  'Generate Summary'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {summary && (
          <Card className="shadow-lg border-0 relative">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Document Summary</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyToClipboard}
                  className="text-gray-600 hover:bg-gray-100"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none text-gray-700">
                {summary.split('\n').map((line, i) => (
                  <p key={i} className="mb-4">{line}</p>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {loading && !summary && (
          <div className="space-y-4">
            <Skeleton className="h-8 w-1/2 mx-auto" />
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}