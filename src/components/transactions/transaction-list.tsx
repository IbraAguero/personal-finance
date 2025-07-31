import { TransactionWithCategory } from "@/interface/transaction-interface";
import TransactionFilters, { Filters } from "./transaction-filters";
import { useState } from "react";
import { Category } from "@prisma/client";
import TransactionListItem from "./transaction-list-item";

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
          <TransactionListItem key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </div>
  );
}
export default TransactionList;
