import z from "zod";

const baseTransactionFields = {
  amount: z
    .string({ error: "El monto es requerido" })
    .min(1, "El monto es requerido")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "El monto debe ser mayor a 0",
    }),
  wallet: z.uuid("La cuenta no es valida").min(1, "La cuenta es requerida"),
  description: z
    .string()
    .min(3, "La descripción debe tener al menos 3 caracteres")
    .max(200, "La descripción no puede exceder 200 caracteres"),
  date: z.string().min(1, "La fecha es requerida"),
};

const incomeSchema = z.object({
  ...baseTransactionFields,
  type: z.literal("income"), // El tipo debe ser exactamente "income"
  category: z
    .uuid("La categoria no es valida")
    .min(1, "La categoria es requerida"), // Categoria es requerida
  toWallet: z.undefined().or(z.null()).optional(), // toWallet no debe estar presente
});
const expenseSchema = z.object({
  ...baseTransactionFields,
  type: z.literal("expense"), // El tipo debe ser exactamente "expense"
  category: z
    .uuid("La categoria no es valida")
    .min(1, "La categoria es requerida"), // Categoria es requerida
  toWallet: z.undefined().or(z.null()).optional(), // toWallet no debe estar presente
});

const transferSchema = z
  .object({
    ...baseTransactionFields,
    type: z.literal("transfer"), // El tipo debe ser exactamente "transfer"
    toWallet: z.uuid("La cuenta no es valida").min(1, "La cuenta es requerida"), // toWallet es requerida
    category: z.undefined().or(z.null()).optional(), // Categoria no debe estar presente
  })
  .refine((data) => data.wallet !== data.toWallet, {
    message:
      "La cuenta de origen y la cuenta de destino no pueden ser la misma",
    path: ["toWallet"],
  });

export const transactionSchema = z.discriminatedUnion("type", [
  incomeSchema,
  expenseSchema,
  transferSchema,
]);

export type TransactionFormData = z.infer<typeof transactionSchema>;
