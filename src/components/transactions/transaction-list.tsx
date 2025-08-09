import { TransactionWithCategoryAndWallet } from "@/interface/transaction-interface";
import TransactionFilters, { Filters } from "./transaction-filters";
import { useMemo, useState } from "react";
import { Category, Wallet } from "@prisma/client";
import TransactionListItem from "./transaction-list-item";

interface Props {
  transactions: TransactionWithCategoryAndWallet[];
  categories: { expense: Category[]; income: Category[] };
  wallets: Wallet[];
}

function TransactionList({ transactions, categories, wallets }: Props) {
  const [filters, setFilters] = useState<Filters>({
    search: "",
    type: "all",
    category: "all",
    wallet: "all",
  });

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const searchTerm = filters.search.toLowerCase();
      const desc = transaction.description?.toLowerCase() ?? "";
      const categoryName = transaction.category.name.toLowerCase();

      const matchesSearch =
        categoryName.includes(searchTerm) || desc.includes(searchTerm);

      const matchesType =
        filters.type === "all" || transaction.type === filters.type;

      const matchesCategory =
        filters.category === "all" ||
        transaction.category.id === filters.category;

      const matchesWallet =
        filters.wallet === "all" || transaction.walletId === filters.wallet;

      return matchesSearch && matchesType && matchesCategory && matchesWallet;
    });
  }, [transactions, filters]);

  const noTransactions = transactions.length === 0;
  const noResults = !noTransactions && filteredTransactions.length === 0;

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
          wallets={wallets}
          categories={categories}
          onChange={setFilters}
        />
      </div>
      <div className="space-y-2">
        {noTransactions && (
          <div className="flex justify-center mt-20 font-medium text-lg">
            No hay transacciones registradas
          </div>
        )}

        {noResults && (
          <div className="flex justify-center mt-20 font-medium text-lg">
            No hay resultados que coincidan con la búsqueda o filtros aplicados
          </div>
        )}

        {!noTransactions &&
          !noResults &&
          filteredTransactions.map((transaction) => (
            <TransactionListItem
              key={transaction.id}
              transaction={transaction}
            />
          ))}
      </div>
    </div>
  );
}
export default TransactionList;
