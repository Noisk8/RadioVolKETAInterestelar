import { z } from "zod";

export const episodio = z.object({
  title: z.string(),
  description: z.string(),
  date: z.date(),
  audioUrl: z.string().url(),
  imageUrl: z.string(),
  draft: z.boolean().optional(),
  tracks: z.array(z.object({
    title: z.string(),
    audioUrl: z.string().url().optional()
  }))
});
