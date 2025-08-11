import { getCategories } from "@/actions/categories-actions";
import { getAllTransactions } from "@/actions/transactions-actions";
import { getWallets } from "@/actions/wallet-action";
import TransactionSection from "@/components/transactions/transaction-section";

export default async function Home() {
  const { data: transactions } = await getAllTransactions();
  const categories = await getCategories();
  const { data: wallets } = await getWallets();

  return (
    <>
      <TransactionSection
        transactions={transactions}
        categories={categories}
        wallets={wallets}
      />
    </>
  );
}
