import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      agencyName,
      website,
      contactName,
      email,
      phone,
      partnershipModel,
      primaryInterest,
    } = body

    if (!agencyName || !contactName || !email || !partnershipModel) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields.' },
        { status: 400 }
      )
    }

    console.log('--- NEW AGENCY PARTNER APPLICATION ---')
    console.log(
      JSON.stringify(
        {
          agencyName,
          website,
          contactName,
          email,
          phone,
          partnershipModel,
          primaryInterest,
          submittedAt: new Date().toISOString(),
        },
        null,
        2
      )
    )

    const webhookUrl = process.env.PARTNERS_SHEET_WEBHOOK || process.env.PARTNERSHIP_SHEET_WEBHOOK

    if (webhookUrl) {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'agency_partner',
          agencyName,
          website: website || '',
          contactName,
          email,
          phone: phone || '',
          partnershipModel,
          primaryInterest: primaryInterest || '',
          submittedAt: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        throw new Error(`Webhook responded with status: ${response.status}`)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Application received.',
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal Server Error'
    console.error('Partners submission API error:', error)
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
