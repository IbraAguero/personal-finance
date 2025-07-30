import z from "zod";

export const transactionSchema = z.object({
  type: z.enum(["INCOME", "EXPENSE"]),
  amount: z
    .string({ error: "El monto es requerido" })
    .min(1, "El monto es requerido")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "El monto debe ser mayor a 0",
    }),
  category: z.string().min(1, "La categoria es requerida"),
  description: z
    .string()
    .min(3, "La descripción debe tener al menos 3 caracteres")
    .max(200, "La descripción no puede exceder 200 caracteres"),
  date: z.string().min(1, "La fecha es requerida"),
});

export type TransactionFormData = z.infer<typeof transactionSchema>;
