import z from "zod";

export const ThreadSchema = z.object({
  content: z.string().optional(),
  file: z.any().optional(),
  parentId: z.string().optional().nullable(),
});

export type ThreadTypes = z.infer<typeof ThreadSchema>;
