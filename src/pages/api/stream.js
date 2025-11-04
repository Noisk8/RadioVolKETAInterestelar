export const prerender = false;
const STREAM_URL = 'https://stream.noisk8.xyz/kbalahradio.ogg';

export async function get() {
  try {
    const upstream = await fetch(STREAM_URL, {
      // Do not cache; keep connection streaming
      cache: 'no-store',
    });

    if (!upstream.ok || !upstream.body) {
      return new Response('Upstream unavailable', { status: 502 });
    }

    const headers = new Headers();
    headers.set('Content-Type', upstream.headers.get('content-type') || 'audio/mpeg');
    headers.set('Cache-Control', 'no-cache, no-store');
    headers.set('Access-Control-Allow-Origin', '*');

    return new Response(upstream.body, { headers, status: 200 });
  } catch (err) {
    return new Response('Stream proxy error', { status: 502 });
  }
}
