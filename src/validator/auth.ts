import z from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(1, "Name can't be empty"),
  username: z.string().min(1, "Username can't be empty"),
  email: z.string().email().min(1, "Email can't be empty"),
  password: z.string().min(8, "Password must be 8 characters or more"),
});

export type registerType = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
  identifier: z.string().min(1, "Identifier can't be empty"),
  password: z.string().min(8, "Password must be 8 characters long or more"),
});

export type LoginType = z.infer<typeof LoginSchema>;
