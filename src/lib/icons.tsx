import {
  Banknote,
  Bitcoin,
  Building2,
  Smartphone,
  WalletIcon,
} from "lucide-react";

export const walletIcons = {
  cash: { label: "Efectivo", icon: Banknote, color: "text-green-400" },
  bank: { label: "Banco", icon: Building2, color: "text-blue-400" },
  virtual: {
    label: "Billetera Virtual",
    icon: Smartphone,
    color: "text-purple-500",
  },
  crypto: { label: "Cripto", icon: Bitcoin, color: "text-orange-400" },
  other: { label: "Otro", icon: WalletIcon, color: "text-neutral-500" },
};
