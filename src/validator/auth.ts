import z from "zod";

export const LoginSchema = z.object({
  identifier: z.string().min(1, "Identifier can't be empty"),
  password: z.string().min(8, "Password must be 8 characters long or more"),
});

export type LoginType = z.infer<typeof LoginSchema>;
