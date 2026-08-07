import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

type PartnerPayload = {
  agencyName?: string
  website?: string
  contactName?: string
  email?: string
  phone?: string
  partnershipModel?: string
  primaryInterest?: string
  yearsInBusiness?: string
  monthlyClients?: string
}

async function persistSubmission(submission: Record<string, unknown>) {
  const filePath = path.join(process.cwd(), 'submissions.json')
  let current: unknown[] = []
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8')
    current = JSON.parse(fileContent)
  } catch {
    // start fresh
  }
  current.push(submission)
  await fs.writeFile(filePath, JSON.stringify(current, null, 2), 'utf-8')
}

async function notifyDiscord(submission: Record<string, unknown>) {
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL
  if (!webhookUrl) return

  const fields = Object.entries(submission)
    .filter(([key]) => !['id', 'timestamp', 'type'].includes(key))
    .map(([key, val]) => ({
      name: key.replace(/([A-Z])/g, ' $1').trim().toUpperCase(),
      value: typeof val === 'string' ? val || '—' : JSON.stringify(val),
      inline: true,
    }))

  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: 'Melhek Partner Notifier',
      embeds: [
        {
          title: 'New Agency Partner Application',
          color: 8366591,
          fields,
          timestamp: submission.timestamp,
        },
      ],
    }),
  })
}

async function notifySheet(submission: Record<string, unknown>) {
  const webhookUrl =
    process.env.PARTNERS_SHEET_WEBHOOK || process.env.PARTNERSHIP_SHEET_WEBHOOK
  if (!webhookUrl) return

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(submission),
  })

  if (!response.ok) {
    throw new Error(`Sheet webhook responded with status: ${response.status}`)
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as PartnerPayload
    const {
      agencyName,
      website,
      contactName,
      email,
      phone,
      partnershipModel,
      primaryInterest,
      yearsInBusiness,
      monthlyClients,
    } = body

    if (!agencyName?.trim() || !contactName?.trim() || !email?.trim() || !partnershipModel) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields.' },
        { status: 400 }
      )
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Enter a valid work email.' },
        { status: 400 }
      )
    }

    const submission = {
      id: Date.now().toString(),
      type: 'agency_partner_application',
      timestamp: new Date().toISOString(),
      agencyName: agencyName.trim(),
      website: website?.trim() || '',
      contactName: contactName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || '',
      partnershipModel,
      primaryInterest: primaryInterest?.trim() || '',
      yearsInBusiness: yearsInBusiness?.trim() || '',
      monthlyClients: monthlyClients?.trim() || '',
    }

    console.log('--- NEW AGENCY PARTNER APPLICATION ---')
    console.log(JSON.stringify(submission, null, 2))

    await persistSubmission(submission)

    try {
      await notifyDiscord(submission)
    } catch (err) {
      console.error('Discord partner webhook failed:', err)
    }

    try {
      await notifySheet(submission)
    } catch (err) {
      console.error('Sheet partner webhook failed:', err)
    }

    return NextResponse.json({
      success: true,
      message: 'Application received.',
      reference: `AP-${submission.id.slice(-6)}`,
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal Server Error'
    console.error('Partners submission API error:', error)
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
