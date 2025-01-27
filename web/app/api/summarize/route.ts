import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import formidable, { Fields, Files } from 'formidable'
import fs from 'fs'
import FormData from 'form-data'

const BACKEND_URL = process.env.BACKEND_URL || 'https://80.225.193.58:8000';

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const form = formidable({
      multiples: false,
      uploadDir: '/tmp',
      keepExtensions: true,
    })

    // Properly typed promise resolution
    const [fields, files] = await new Promise<[Fields, Files]>(
      (resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) reject(err)
          else resolve([fields, files])
        })
      }
    )

    // Type-safe file access
    const file = files.file?.[0] as formidable.File | undefined
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }

    // Handle page ranges with proper type checking
    const fromPage = fields.from_page?.[0]
    const toPage = fields.to_page?.[0]

    const filename = file.originalFilename || 'uploaded-file'
    const formData = new FormData()
    formData.append('file', fs.createReadStream(file.filepath), filename)
    if (fromPage) formData.append('from_page', fromPage)
    if (toPage) formData.append('to_page', toPage)

    const response = await axios.post(
      `${BACKEND_URL}/api/summarize`,
      formData,
      { headers: formData.getHeaders() }
    )

    res.status(200).json({ summary: response.data.summary })
  } catch (error) {
    console.error('Proxy error:', error)
    res.status(500).json({
      message: axios.isAxiosError(error)
        ? error.response?.data?.message || 'Internal server error'
        : 'Internal server error'
    })
  }
}