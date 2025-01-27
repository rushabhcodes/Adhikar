import { NextResponse } from 'next/server'
import axios from 'axios'

const BACKEND_URL = process.env.BACKEND_URL || 'https://80.225.193.58:8000'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const response = await axios.post(`${BACKEND_URL}/api/chat`, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return NextResponse.json(response.data, {
      status: response.status
    })
    
  } catch (error) {
    console.error('Proxy error:', error)
    
    if (axios.isAxiosError(error)) {
      return NextResponse.json(error.response?.data || { error: 'Backend error' }, {
        status: error.response?.status || 500
      })
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Optional: Configure route segment behavior
export const dynamic = 'force-dynamic' // Disable static optimization