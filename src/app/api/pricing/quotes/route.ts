import { NextResponse } from 'next/server';
import { Quote } from '@/lib/pricing/types';

// In-memory fallback cache for quotes server side
let serverQuotesMemory: Quote[] = [];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      const quote = serverQuotesMemory.find((q) => q.id === id);
      if (!quote) {
        return NextResponse.json({ error: 'Quote not found' }, { status: 404 });
      }
      return NextResponse.json(quote);
    }

    return NextResponse.json(serverQuotesMemory);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Quote;

    if (!body || !body.id) {
      return NextResponse.json({ error: 'Invalid quote data' }, { status: 400 });
    }

    const index = serverQuotesMemory.findIndex((q) => q.id === body.id);
    if (index >= 0) {
      serverQuotesMemory[index] = { ...body, updatedAt: new Date().toISOString() };
    } else {
      serverQuotesMemory.unshift({ ...body, updatedAt: new Date().toISOString() });
    }

    return NextResponse.json({ success: true, quote: body });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Quote ID is required' }, { status: 400 });
    }

    serverQuotesMemory = serverQuotesMemory.filter((q) => q.id !== id);

    return NextResponse.json({ success: true, id });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
