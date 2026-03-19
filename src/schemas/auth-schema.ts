import * as z from "zod";

export const signInSchema = z.object({
  email: z.email("Email inválido"),
  password: z.string().min(1, "Senha não preenchda"),
});

export const signUpSchema = z.object({
  email: z.email("Email inválido"),
  password: z.string().min(1, "Senha não preenchda"),
  passwordConfirm: z.string().min(1, "Confirmação de senha não preenchda"),
});
