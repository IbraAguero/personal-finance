"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import WalletForm from "@/components/wallets/wallet-form";
import WalletList from "@/components/wallets/wallet-list";
import { WalletAndBalance } from "@/schemas/wallet-schema";
import clsx from "clsx";
import { Plus } from "lucide-react";
import { useState } from "react";

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

  const balance = wallets.reduce((acc, wal) => (acc += wal.balance), 0);

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
          <Plus /> Agregar billetera
        </Button>
      </div>
      {/* GRAFICO DE CUENTAS */}
      {/* <div className="grid sm:grid-cols-3">
        <WalletChart wallets={wallets} />
      </div> */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <Card className="py-4">
          <CardContent className="space-y-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-md font-medium">
                Balance Total
              </CardTitle>
            </div>
            <div
              className={clsx("text-2xl font-bold", {
                "text-green-400": balance >= 0,
                "text-red-400": balance < 0,
              })}
            >
              ${balance.toLocaleString("es-Es", { currency: "ARS" })}
            </div>
            <p className="text-xs text-muted-foreground">
              {balance >= 0 ? "Saldo positivo" : "Saldo negativo"}
            </p>
          </CardContent>
        </Card>
        <Card className="py-4">
          <CardContent className="space-y-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-md font-medium">
                Cuentas activas
              </CardTitle>
            </div>
            <div className="text-2xl font-bold">
              {wallets.length}/{wallets.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Cuentas actualmente en uso
            </p>
          </CardContent>
        </Card>
      </div>
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
