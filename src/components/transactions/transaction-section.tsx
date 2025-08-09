"use client";
import TransactionList from "./transaction-list";
import { Button } from "../ui/button";
import { Clipboard, Plus, Settings } from "lucide-react";
import { useState } from "react";
import { TransactionWithCategoryAndWallet } from "@/interface/transaction-interface";
import TransactionForm from "./transaction-form";
import { Category, Wallet } from "@prisma/client";
import { addTransaction } from "@/actions/transactions-actions";
import { TransactionFormData } from "@/schemas/transaction-schema";
import TransactionCards from "./transaction-cards";
import CategoryDialog from "../category/category-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Categories {
  income: Category[];
  expense: Category[];
}

interface Props {
  transactions: TransactionWithCategoryAndWallet[];
  categories: Categories;
  wallets: Wallet[];
}

function TransactionSection({ transactions, categories, wallets }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [showCategoryManager, setShowCategoryManager] = useState(false);

  const onSubmit = (values: TransactionFormData) => {
    addTransaction(values);
    setShowForm(false);
  };

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Transacciones</h1>
          <h3 className="text-muted-foreground">
            Gestiona tus ingresos y gastos
          </h3>
        </div>
        <div className="flex justify-between gap-2 sm:flex-row">
          {/* <Button
            variant="outline"
            onClick={() => setShowCategoryManager(true)}
          >
            <Settings className="h-4 w-4" />
            Categorias
          </Button> */}
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4" />
            Nueva transaccion
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Settings /> Gestíon
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setShowCategoryManager(true)}>
                <Clipboard />
                Categorias
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <TransactionCards
        balance={balance}
        totalExpense={totalExpense}
        totalIncome={totalIncome}
        totalTransactions={transactions.length}
      />
      <TransactionForm
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={onSubmit}
        categories={categories}
        wallets={wallets}
      />
      <TransactionList
        transactions={transactions}
        categories={categories}
        wallets={wallets}
      />
      <CategoryDialog
        isOpen={showCategoryManager}
        onClose={setShowCategoryManager}
        categories={categories}
      />
    </div>
  );
}
export default TransactionSection;
