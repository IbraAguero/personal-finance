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
  const [walletToEdit, setWalletToEdit] = useState<WalletAndBalance | null>(
    null
  );

  const handleAdd = () => {
    setWalletToEdit(null);
    setShowForm(true);
  };

  const handleEdit = (wallet: WalletAndBalance) => {
    setWalletToEdit(wallet);
    setShowForm(true);
  };

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
        <Button onClick={handleAdd}>
          <Plus /> Agregar cuenta
        </Button>
      </div>
      <div>Balance</div>
      <WalletList wallets={wallets} onEdit={handleEdit} />
      <WalletForm
        isOpen={showForm}
        wallet={walletToEdit || undefined}
        onClose={() => setShowForm(false)}
      />
    </section>
  );
}
export default PageWallets;
