import { NextResponse } from "next/server"

// Kind Codex webhook URL can be configured via environment variables.
const KIND_CODEX_WEBHOOK_URL = process.env.KIND_CODEX_WEBHOOK_URL || "https://api.kindcodex.com/v1/webhook/amana-lofts"

export async function POST(req: Request) {
  try {
    const data = await req.json()

    // We format the payload according to standard webhook practices, 
    // ensuring the "kind: codex" identifier is present as often required 
    // by these automation tools.
    const payload = {
      kind: "codex",
      source: "Amana Lofts Eligibility Screener",
      timestamp: new Date().toISOString(),
      data: data,
    }

    // In a real environment, you would await this fetch. 
    // For now, if the env variable isn't set, we mock the success.
    if (process.env.KIND_CODEX_WEBHOOK_URL) {
      const response = await fetch(KIND_CODEX_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add any specific API keys here
          // "Authorization": `Bearer ${process.env.KIND_CODEX_API_KEY}`
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        console.error("Failed to send data to Kind Codex", await response.text())
        return NextResponse.json(
          { error: "Failed to sync with CRM" },
          { status: 502 }
        )
      }
    } else {
      console.log("No KIND_CODEX_WEBHOOK_URL provided. Mocking success.")
      console.log("Payload would be:", payload)
    }

    return NextResponse.json({ success: true, message: "Added to interest list" })
  } catch (error) {
    console.error("Screener API Error:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
