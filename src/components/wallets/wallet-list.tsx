"use client";
import { Wallet } from "@prisma/client";
import WalletItem from "./wallet-item";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";

type WalletAndBalance = Wallet & { balance: number };

interface Props {
  wallets: WalletAndBalance[];
  onEdit: (wallet: WalletAndBalance) => void;
}

function WalletList({ wallets, onEdit }: Props) {
  const [selectValue, setSelectValue] = useState("all");

  const filteredWallets = wallets.filter(
    (wallet) => selectValue === "all" || wallet.type === selectValue
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">
            Tus billeteras ({wallets.length})
          </h2>
          <p className="text-muted-foreground">
            Historial completo de tus movimientos financieros
          </p>
        </div>
        <Select
          defaultValue="all"
          value={selectValue}
          onValueChange={(value) => setSelectValue(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent align="end">
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="cash">Efectivo</SelectItem>
            <SelectItem value="bank">Banco</SelectItem>
            <SelectItem value="virtual">Billetera virtual</SelectItem>
            <SelectItem value="crypto">Cripto</SelectItem>
            <SelectItem value="other">Otro</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        {filteredWallets.map((wallet) => (
          <WalletItem
            key={wallet.id}
            wallet={wallet}
            onEdit={() => onEdit(wallet)}
          />
        ))}
      </div>
    </div>
  );
}
export default WalletList;
