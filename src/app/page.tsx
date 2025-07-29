"use client";
import TransactionForm from "@/components/transaction-form";
import TransactionList from "@/components/transaction-list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

export interface Transaction {
  id: string;
  type: "income" | "expense";
  amount: string;
  category: string;
  description: string;
  date: string;
}

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showForm, setShowForm] = useState(false);

  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    const newTransaction = { ...transaction, id: Date.now().toString() };
    setTransactions((prev) => [...prev, newTransaction]);
    setShowForm(false);
    console.log(newTransaction);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Control de Finanzas</h1>
          <h3 className="text-muted-foreground">
            Gestiona tus ingresos y gastos
          </h3>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4" />
          Nueva transaccion
        </Button>
      </div>
      <TransactionForm
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={addTransaction}
        categories={{
          expense: ["Alimentos", "Transporte"],
          income: ["Sueldo", "Freelance", "Venta"],
        }}
      />
      <TransactionList transactions={transactions} />
    </div>
  );
}
