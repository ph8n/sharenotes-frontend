import { NextResponse } from 'next/server';

const AXUM_BACKEND_URL = process.env.AXUM_BACKEND_URL || 'http://localhost:3001';

export async function POST(request: Request) {
  console.log('Next.js API Register: Received POST request.');
  try {
    const body = await request.json();
    console.log('Next.js API Register: Received request body:', body);

    const axumUrl = `${AXUM_BACKEND_URL}/api/auth/register`;
    console.log('Next.js API Register: Attempting to fetch Axum at:', axumUrl);

    const axumResponse = await fetch(axumUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    console.log('Next.js API Register: Received response status from Axum:', axumResponse.status);
    console.log('Next.js API Register: Received response headers from Axum:', Array.from(axumResponse.headers.entries()));

    let data = null;
    try {
      if (axumResponse.status !== 204) {
        data = await axumResponse.json();
        console.log('Next.js API Register: Axum Response Body (parsed as JSON):', data);
      } else {
        console.log('Next.js API Register: Received 204 No Content, no body to parse.');
      }
    } catch (jsonError) {
      console.error('Next.js API Register: Failed to parse Axum response body as JSON:', jsonError);
      if (axumResponse.status !== 204) {
        console.error('Next.js API Register: Expected JSON but received non-JSON or empty body.');
        return NextResponse.json({ error: 'Invalid or non-JSON response from backend' }, { status: 500 });
      }
      console.warn('Next.js API Register: JSON parsing error on a 204 response - might be unexpected empty body.');
      return NextResponse.json({ error: 'Unexpected empty response from backend.' }, { status: 500 });
    }


    if (!axumResponse.ok) {
      console.error('Next.js API Register: Axum returned an error status.');
      return NextResponse.json(data || { error: `Backend returned status ${axumResponse.status}` }, { status: axumResponse.status });
    }

    console.log('Next.js API Register: Axum returned success status.');
    return NextResponse.json(data, { status: axumResponse.status });

  } catch (error: any) {
    console.error('Error in Next.js /api/auth/register:', error);
    console.error('Next.js API Register: Error details:', JSON.stringify(error, null, 2));

    if (error.cause && error.cause.code === 'ECONNREFUSED') {
      console.error('Next.js API Register: Connection to Axum backend refused. Is it running?');
      return NextResponse.json({ error: 'Failed to connect to the backend. Is the server running?' }, { status: 500 });
    }

    return NextResponse.json({ error: 'An unexpected error occurred during registration.' }, { status: 500 });
  }
}

