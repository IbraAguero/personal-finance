import { Badge } from "../ui/badge";
import clsx from "clsx";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { TransactionWithCategory } from "@/interface/transaction-interface";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import TransactionFilters, { Filters } from "./transaction-filters";
import { useState } from "react";
import { Category } from "@prisma/client";

interface Props {
  transactions: TransactionWithCategory[];
  categories: { expense: Category[]; income: Category[] };
}

function TransactionList({ transactions, categories }: Props) {
  const [filters, setFilters] = useState<Filters>({
    search: "",
    type: "all",
    category: "all",
  });

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.category.name
        .toLowerCase()
        .includes(filters.search.toLowerCase()) ||
      transaction.description
        ?.toLowerCase()
        .includes(filters.search.toLowerCase());

    const matchesType =
      filters.type === "all" || transaction.type === filters.type;

    const matchesCategory =
      filters.category === "all" ||
      transaction.category.id === filters.category;

    return matchesSearch && matchesType && matchesCategory;
  });

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">Todas las transacciones</h2>
        <p className="text-muted-foreground">
          Historial completo de tus movimientos financieros
        </p>
      </div>
      <div>
        <TransactionFilters
          filters={filters}
          onChange={setFilters}
          categories={categories}
        />
      </div>
      <div className="space-y-4">
        {filteredTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex justify-between items-center p-4 border rounded-lg"
          >
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    transaction.type === "income" ? "default" : "destructive"
                  }
                >
                  {transaction.type === "income" ? "Ingreso" : "Gasto"}
                </Badge>
                <span className="font-medium">{transaction.category.name}</span>
                <span className="text-muted-foreground">
                  {format(new Date(transaction.date), "d MMM yyyy", {
                    locale: es,
                  })}
                </span>
              </div>
              <p className="text-muted-foreground">{transaction.description}</p>
            </div>
            <div className="flex items-center gap-1">
              <span
                className={clsx("font-bold text-lg", {
                  "text-green-500": transaction.type === "income",
                  "text-red-500": transaction.type === "expense",
                })}
              >
                {transaction.type === "income" ? "+" : "-"}$
                {transaction.amount.toLocaleString("es-Es", {
                  currency: "ARS",
                })}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="text-red-500 hover:text-red-70 "
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default TransactionList;
