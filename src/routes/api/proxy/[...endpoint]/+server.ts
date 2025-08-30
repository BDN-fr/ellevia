// Ilevia made me make this, so now there is a server and everything is no more on the client
// If this bother you, check the code and self-host it

export async function GET({ params, url, fetch }) {
  const API_BASE_URL = 'https://nws-lille.hove.io/full/ws/v1';

  const { endpoint } = params;

  const targetUrl = new URL(`${API_BASE_URL}/${endpoint || ''}`);
  url.searchParams.forEach((value, key) => {
    targetUrl.searchParams.append(key, value);
  });

  try {
    const response = await fetch(targetUrl.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "x-requested-with": "XMLHttpRequest"
      },
      referrer: 'https://nws-lille.hove.io/fr/full/'
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
