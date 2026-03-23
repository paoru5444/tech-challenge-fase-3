import * as z from "zod";

export const formInSchema = z.object({
  amount: z.coerce.number("Use números").min(1, "O valor deve ser preenchido"),
  description: z
    .string()
    .min(1, "Descrição deve ser preenchda")
    .max(20, "Limite de caracteres excedido"),
  date: z.string().min(1, "Selecione uma data"),
  category: z.object({
    key: z.string().min(1, "Selecione uma categoria"),
    value: z.string().min(1, "Selecione uma categoria"),
  }),
});
