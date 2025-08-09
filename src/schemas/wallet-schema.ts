import { Wallet } from "@prisma/client";
import z from "zod";

export const walletSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  type: z.enum(["cash", "bank", "virtual", "crypto", "other"], {
    error: "Seleccione una opcion",
  }),
});

export type WalletFormData = z.infer<typeof walletSchema>;
export type WalletAndBalance = Wallet & { balance: number };
