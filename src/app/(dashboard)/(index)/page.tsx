import { getCategories } from "@/actions/categories-actions";
import { getAllTransactions } from "@/actions/transactions-actions";
import { getWallets } from "@/actions/wallet-action";
import { auth } from "@/auth";
import TransactionSection from "@/components/transactions/transaction-section";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  const userId = session?.user?.id;

  if (!userId) {
    redirect("/login");
  }

  const { data: transactions } = await getAllTransactions(userId);
  const categories = await getCategories(userId);
  const { data: wallets } = await getWallets(userId);

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
