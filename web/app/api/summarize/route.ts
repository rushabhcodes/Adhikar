// app/api/summarize/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import FormData from "form-data";
import https from "https";

const BACKEND_URL = process.env.BACKEND_URL || "https://80.225.193.58:8000";
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const fromPage = formData.get("from_page");
    const toPage = formData.get("to_page");

    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 }
      );
    }

    // Convert Web API File to Node.js readable stream
    const buffer = Buffer.from(await file.arrayBuffer());
    const formDataForBackend = new FormData();
    formDataForBackend.append("file", buffer, file.name);
    if (fromPage) formDataForBackend.append("from_page", fromPage.toString());
    if (toPage) formDataForBackend.append("to_page", toPage.toString());

    const response = await axios.post(
      `${BACKEND_URL}/api/summarize`,
      formDataForBackend,
      {
        headers: formDataForBackend.getHeaders(),
        httpsAgent: httpsAgent,
      }
    );

    return NextResponse.json({ summary: response.data.summary });
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      {
        message: axios.isAxiosError(error)
          ? error.response?.data?.message || "Internal server error"
          : "Internal server error",
      },
      { status: 500 }
    );
  }
}