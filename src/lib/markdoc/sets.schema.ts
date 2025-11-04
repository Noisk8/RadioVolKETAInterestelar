import { z } from "zod";

export const setSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  // Accept ISO string or Date, coerce to Date
  date: z.coerce.date(),
  soundcloudUrl: z.string().url(),
  imageUrl: z.string().optional(),
  draft: z.boolean().optional(),
  author: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

