import { getCategories } from "@/actions/categories-actions";
import { getAllTransactions } from "@/actions/transactions-actions";
import TransactionSection from "@/components/transactions/transaction-section";

export default async function Home() {
  const transactions = await getAllTransactions();
  const categories = await getCategories();

  return (
    <div>
      <TransactionSection transactions={transactions} categories={categories} />
    </div>
  );
}
