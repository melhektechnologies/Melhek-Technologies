import { NextResponse } from 'next/server';
import type { Quote } from '@/lib/pricing/types';
import { hasPricingSessionInCookieHeader, PRIVATE_RESPONSE_HEADERS } from '@/lib/pricing/auth';

// In-memory fallback cache for quotes server side
let serverQuotesMemory: Quote[] = [];

function privateJson(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: PRIVATE_RESPONSE_HEADERS });
}

function unauthorized() {
  return privateJson({ error: 'Unauthorized' }, 401);
}

export async function GET(request: Request) {
  if (!hasPricingSessionInCookieHeader(request.headers.get('cookie'))) return unauthorized();

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      const quote = serverQuotesMemory.find((q) => q.id === id);
      if (!quote) {
        return privateJson({ error: 'Quote not found' }, 404);
      }
      return privateJson(quote);
    }

    return privateJson(serverQuotesMemory);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return privateJson({ error: errorMessage }, 500);
  }
}

export async function POST(request: Request) {
  if (!hasPricingSessionInCookieHeader(request.headers.get('cookie'))) return unauthorized();

  try {
    const body = (await request.json()) as Quote;

    if (!body || !body.id) {
      return privateJson({ error: 'Invalid quote data' }, 400);
    }

    const index = serverQuotesMemory.findIndex((q) => q.id === body.id);
    if (index >= 0) {
      serverQuotesMemory[index] = { ...body, updatedAt: new Date().toISOString() };
    } else {
      serverQuotesMemory.unshift({ ...body, updatedAt: new Date().toISOString() });
    }

    return privateJson({ success: true, quote: body });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return privateJson({ error: errorMessage }, 500);
  }
}

export async function DELETE(request: Request) {
  if (!hasPricingSessionInCookieHeader(request.headers.get('cookie'))) return unauthorized();

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return privateJson({ error: 'Quote ID is required' }, 400);
    }

    serverQuotesMemory = serverQuotesMemory.filter((q) => q.id !== id);

    return privateJson({ success: true, id });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return privateJson({ error: errorMessage }, 500);
  }
}
