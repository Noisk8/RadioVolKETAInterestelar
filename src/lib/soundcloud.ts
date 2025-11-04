export async function getSoundCloudArtwork(url: string): Promise<string | undefined> {
  try {
    const endpoint = `https://soundcloud.com/oembed?format=json&url=${encodeURIComponent(url)}`;
    const res = await fetch(endpoint, { headers: { Accept: "application/json" } });
    if (res.ok) {
      const data = (await res.json()) as { thumbnail_url?: string };
      let thumb = data.thumbnail_url;
      if (thumb) {
        thumb = thumb.replace("-t500x500.", "-original.");
        return thumb;
      }
    }
    // Fallback: scrape og:image from the public page
    const pageRes = await fetch(url, { headers: { Accept: "text/html" } });
    if (!pageRes.ok) return undefined;
    const html = await pageRes.text();
    const match = html.match(/<meta property=\"og:image\" content=\"([^\"]+)\"/);
    if (match && match[1]) {
      let img = match[1];
      img = img.replace("-t500x500.", "-original.");
      return img;
    }
    return undefined;
  } catch {
    return undefined;
  }
}
