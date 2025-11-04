export const prerender = false;
// Unified to the new Icecast instance (HTTPS)
const STREAM_STATUS_URL = 'https://stream.noisk8.xyz/status-json.xsl';

function pickSource(payload) {
  if (!payload) return undefined;

  // Icecast status-json.xsl format
  if (payload.icestats?.source) {
    return Array.isArray(payload.icestats.source)
      ? payload.icestats.source[0]
      : payload.icestats.source;
  }

  // SHOUTcast/Icecast alternative payloads
  if (payload.sources) {
    return Array.isArray(payload.sources) ? payload.sources[0] : payload.sources;
  }

  // Some APIs expose now_playing info
  if (payload.now_playing) {
    return payload.now_playing;
  }

  return payload;
}

export async function get() {
  try {
    const response = await fetch(STREAM_STATUS_URL, {
      cache: 'no-store',
      headers: { accept: 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }

    const ct = response.headers.get('content-type') || '';
    if (!ct.includes('application/json')) {
      throw new Error(`Unexpected content-type: ${ct}`);
    }
    const data = await response.json();
    const source = pickSource(data);
    const online = Boolean(source);

    if (online) {
      const title = source.title || source.song || source.track || "";
      const artist = source.artist || source.performer || source.author || "";

      return new Response(
        JSON.stringify({
          title,
          artist,
          online: true,
        }),
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }
  } catch (error) {
    console.error("Error fetching stream data:", error);
  }

  return new Response(
    JSON.stringify({ title: "", artist: "", online: false }),
    {
      headers: { 'Content-Type': 'application/json' },
    },
  );
}
