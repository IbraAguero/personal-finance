"use client";
import TransactionList from "./transaction-list";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { TransactionWithCategory } from "@/interface/transaction-interface";
import TransactionForm from "./transaction-form";
import { Category } from "@prisma/client";
import { addTransaction } from "@/actions/transactions-actions";
import { TransactionFormData } from "@/schemas/transaction-schema";

interface Props {
  transactions: TransactionWithCategory[];
  categories: { expense: Category[]; income: Category[] };
}

function TransactionSection({ transactions, categories }: Props) {
  const [showForm, setShowForm] = useState(false);

  const onSubmit = (values: TransactionFormData) => {
    addTransaction(values);
    setShowForm(false);
  };

  return (
    <section className="max-w-5xl mx-auto p-4 space-y-6">
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
        onSubmit={onSubmit}
        categories={categories}
      />
      <TransactionList transactions={transactions} categories={categories} />
    </section>
  );
}
export default TransactionSection;
