import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      partnerId,
      partnerFullName,
      companyName,
      position,
      email,
      phone,
      signatureData,
      dateSigned,
      confirmations,
      discoveryData,
    } = body;

    // Log the payload locally in development server logs
    console.log('--- NEW PARTNERSHIP SUBMISSION RECEIVED ---');
    console.log(`Partner ID: ${partnerId}`);
    console.log(`Name: ${partnerFullName}`);
    console.log(`Company: ${companyName}`);
    console.log(`Position: ${position}`);
    console.log(`Email: ${email}`);
    console.log(`Phone: ${phone}`);
    console.log(`Signed Date: ${dateSigned}`);
    console.log('Confirmations:', confirmations);
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
          companyName: companyName || discoveryData?.businessName || '',
          position: position || '',
          email: email || discoveryData?.email || '',
          phone: phone || discoveryData?.phone || '',
          dateSigned,
          signatureData, // Base64 signature image
          confirmations: confirmations ? JSON.stringify(confirmations) : '',
          businessName: companyName || discoveryData?.businessName || '',
          ownerName: partnerFullName || discoveryData?.ownerName || '',
          industry: discoveryData?.industry || '',
          primaryGoal: discoveryData?.primaryGoal || '',
          targetAudience: discoveryData?.targetAudience || '',
          pagesNeeded: discoveryData?.pagesNeeded || '',
          inScopeFeatures: (discoveryData?.inScopeFeatures || discoveryData?.keyFeatures || []).join(', '),
          growthInterest: (discoveryData?.growthInterest || []).join(', '),
          successOutcome: discoveryData?.successOutcome || '',
          brandAssetsAvailable: discoveryData?.brandAssets || discoveryData?.brandAssetsAvailable || '',
          additionalNotes: discoveryData?.notes || discoveryData?.additionalNotes || '',
          submittedAt: new Date().toISOString(),
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

