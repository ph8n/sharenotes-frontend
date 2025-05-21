import { NextResponse } from 'next/server';

const AXUM_BACKEND_URL = process.env.AXUM_BACKEND_URL || 'http://localhost:3001';

export async function POST(request: Request) {
  console.log('Next.js API Login: Received POST request.'); // debugging log
  try {
    const body = await request.json();
    console.log('Next.js API Login: Received request body:', body); // debugging log

    const axumUrl = `${AXUM_BACKEND_URL}/api/auth/login`; // Ensure this is correct
    console.log('Next.js API Login: Attempting to fetch Axum at:', axumUrl); // debugging log

    const axumResponse = await fetch(axumUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    console.log('Next.js API Login: Received response status from Axum:', axumResponse.status); // debugging log
    console.log('Next.js API Login: Received response headers from Axum:', Array.from(axumResponse.headers.entries())); // debugging log

    let data = null;
    try {
      if (axumResponse.status !== 204) {
        data = await axumResponse.json();
        console.log('Next.js API Login: Axum Response Body (parsed as JSON):', data); // debugging log
      } else {
        console.log('Next.js API Login: Received 204 No Content, no body to parse.'); // debugging log
      }
    } catch (jsonError) {
      console.error('Next.js API Login: Failed to parse Axum response body as JSON:', jsonError); // debugging log
      if (axumResponse.status !== 204) {
        console.error('Next.js API Login: Expected JSON but received non-JSON or empty body.'); // debugging log
        return NextResponse.json({ error: 'Invalid or non-JSON response from backend' }, { status: 500 });
      }
      console.warn('Next.js API Login: JSON parsing error on a 204 response - might be unexpected empty body.'); // debugging log
      return NextResponse.json({ error: 'Unexpected empty response from backend.' }, { status: 500 });
    }


    if (!axumResponse.ok) {
      console.error('Next.js API Login: Axum returned an error status.'); // debugging log
      return NextResponse.json(data || { error: `Backend returned status ${axumResponse.status}` }, { status: axumResponse.status });
    }

    console.log('Next.js API Login: Axum returned success status.'); // debugging log
    return NextResponse.json(data, { status: axumResponse.status });

  } catch (error: any) {
    console.error('Error in Next.js /api/auth/login:', error); // debugging log
    console.error('Next.js API Login: Error details:', JSON.stringify(error, null, 2)); // debugging log

    if (error.cause && error.cause.code === 'ECONNREFUSED') {
      console.error('Next.js API Login: Connection to Axum backend refused. Is it running?'); // debugging log
      return NextResponse.json({ error: 'Failed to connect to the backend. Is the server running?' }, { status: 500 });
    }

    return NextResponse.json({ error: 'An unexpected error occurred during login.' }, { status: 500 });
  }
}
