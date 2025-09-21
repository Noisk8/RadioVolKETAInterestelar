const STREAM_STATUS_URL = 'http://82.25.92.57:5000/status.json';

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
    const response = await fetch(STREAM_STATUS_URL, { cache: 'no-store' });

    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }

    const data = await response.json();
    const source = pickSource(data);

    if (source && (source.title || source.song || source.track)) {
      const title = source.title || source.song || source.track || "";
      const artist = source.artist || source.performer || source.author || "";

      return new Response(
        JSON.stringify({
          title,
          artist,
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
    JSON.stringify({
      title: "Transmitiendo en vivo - Kabalah Radio",
    }),
    {
      headers: { 'Content-Type': 'application/json' },
    },
  );
}
