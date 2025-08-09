import { Transaction, Category, Wallet } from "@prisma/client";

export type TransactionWithCategoryAndWallet = Transaction & {
  category: Category;
} & { wallet: Wallet };
