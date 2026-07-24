import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { partnerId, partnerFullName, signatureData, dateSigned, discoveryData } = body;

    // Log the payload locally in development server logs
    console.log('--- NEW PARTNERSHIP SUBMISSION RECEIVED ---');
    console.log(`Partner ID: ${partnerId}`);
    console.log(`Name: ${partnerFullName}`);
    console.log(`Signed Date: ${dateSigned}`);
    console.log('Discovery Data:', JSON.stringify(discoveryData, null, 2));

    const webhookUrl = process.env.PARTNERSHIP_SHEET_WEBHOOK;

    if (webhookUrl) {
      // Forward payload to Google Sheets Apps Script Webhook
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          partnerId,
          partnerFullName,
          dateSigned,
          signatureData, // Base64 signature image
          // Flatten discovery form fields
          businessName: discoveryData?.businessName || '',
          ownerName: discoveryData?.ownerName || '',
          email: discoveryData?.email || '',
          phone: discoveryData?.phone || '',
          currentWebsite: discoveryData?.currentWebsite || '',
          industry: discoveryData?.industry || '',
          primaryGoal: discoveryData?.primaryGoal || '',
          targetAudience: discoveryData?.targetAudience || '',
          keyFeatures: (discoveryData?.keyFeatures || []).join(', '),
          brandAssetsAvailable: discoveryData?.brandAssetsAvailable || '',
          additionalNotes: discoveryData?.additionalNotes || '',
          submittedAt: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        throw new Error(`Google Sheets Webhook responded with status: ${response.status}`);
      }

      return NextResponse.json({ success: true, message: 'Forwarded to Google Sheets successfully.' });
    }

    return NextResponse.json({
      success: true,
      message: 'Submission received successfully (Webhook URL not set, logged locally).',
    });
  } catch (error: any) {
    console.error('Partnership submission API error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
