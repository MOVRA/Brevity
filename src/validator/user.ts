import z from "zod";

export const userSchema = z.object({
  file: z.any(),
  name: z.string().min(1, "Name can't be empty"),
  username: z.string().min(1, "Name can't be empty"),
  bio: z.string().nullable(),
});

export type UserType = z.infer<typeof userSchema>;
