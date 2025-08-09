import { WalletType } from "@prisma/client";

export const defaultWallets = [
  {
    name: "Efectivo",
    type: WalletType.cash,
  },
  {
    name: "Banco",
    type: WalletType.bank,
  },
  {
    name: "Mercado Pago",
    type: WalletType.virtual,
  },
];
