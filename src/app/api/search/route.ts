import { NextRequest, NextResponse } from 'next/server';
import { searchProducts } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');

    if (!query || query.trim().length === 0) {
      return NextResponse.json({ products: [] }, { status: 200 });
    }

    const products = await searchProducts(query);

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

