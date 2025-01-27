import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

const BACKEND_URL = process.env.BACKEND_URL || 'https://80.225.193.58:8000';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Forward the request to the backend server
    const response = await axios.post(`${BACKEND_URL}/api/chat`, req.body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Send the backend response back to the client
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Proxy error:', error);
    if (axios.isAxiosError(error)) {
      res.status(error.response?.status || 500).json(error.response?.data);
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}