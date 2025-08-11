import { Transaction, Category, Wallet } from "@prisma/client";

export type TransactionWithCategoryAndWallet = Transaction & {
  category: Category | null;
} & { wallet: Wallet };

export type TransactionFormData = z.infer<typeof transactionSchema>;

export type TransferTransaction = {
  id: string;
  type: "transfer";
  amount: number;
  description?: string | null;
  fromWallet: Wallet;
  toWallet: Wallet;
  date: Date;
  transferId: string;
};

export type GroupedTransaction =
  | TransactionWithCategoryAndWallet
  | TransferTransaction;
