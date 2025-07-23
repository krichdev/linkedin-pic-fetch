export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username');

  if (!username) {
    return new Response(JSON.stringify({
      error: "Username is required"
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const enrichApiKey = process.env.ENRICH_LAYER_API_KEY;

  if (!enrichApiKey) {
    console.error('ENRICH_LAYER_API_KEY is not set');
    return new Response(JSON.stringify({
      error: "API configuration error"
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const enrichApiUrl = 'https://enrichlayer.com/api/v2/person/profile-picture';
    const linkedinUrl = `https://www.linkedin.com/in/${username}`;

    const response = await fetch(`${enrichApiUrl}?person_profile_url=${encodeURIComponent(linkedinUrl)}&use_cache=if-present`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${enrichApiKey}`
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Enrich API error:', response.status, response.statusText, errorText);
      return new Response(JSON.stringify({
        error: "Failed to fetch profile picture",
        details: errorText
      }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const data = await response.json();

    return new Response(JSON.stringify({
      profilePicUrl: data.tmp_profile_pic_url || null,
      username: username
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error calling Enrich API:', error);
    return new Response(JSON.stringify({
      error: "Internal server error"
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}