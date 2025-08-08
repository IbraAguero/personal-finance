"use client";
import { Button } from "@/components/ui/button";
import WalletForm from "@/components/wallets/wallet-form";
import WalletList from "@/components/wallets/wallet-list";
import { Wallet } from "@prisma/client";
import { Plus } from "lucide-react";
import { useState } from "react";

type WalletAndBalance = Wallet & { balance: number };

interface Props {
  wallets: WalletAndBalance[];
}

function PageWallets({ wallets }: Props) {
  const [showForm, setShowForm] = useState(false);
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h1 className="text-3xl font-bold">Billeteras</h1>
          <h3 className="text-muted-foreground">
            Administra tus cuentas bancarias, efectivo, billeteras digitales y
            más.
          </h3>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus /> Agregar cuenta
        </Button>
      </div>
      <div>Balance</div>
      <WalletList wallets={wallets} />
      <WalletForm isOpen={showForm} onClose={() => setShowForm(false)} />
    </section>
  );
}
export default PageWallets;
