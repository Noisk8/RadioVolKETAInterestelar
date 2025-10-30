import { z } from "zod";

const TrackSchema = z.object({
  title: z.string(),
  artist: z.string().optional(),
  duration: z.string().optional(),
});

export const metadata = z.object({
  title: z.string(),
  description: z.string(),
  // Accept ISO string or Date, coerce to Date
  date: z.coerce.date(),
  audioUrl: z.string().url().optional(),
  imageUrl: z.string().optional(),
  draft: z.boolean().optional(),
  author: z.string().optional(),
  tags: z.array(z.string()).optional(),
  tracks: z.array(TrackSchema).optional(),
});
