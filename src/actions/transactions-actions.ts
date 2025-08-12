"use server";

import { auth } from "@/auth";
import { GroupedTransaction } from "@/interface/transaction-interface";
import { db } from "@/lib/db";
import {
  TransactionFormData,
  transactionSchema,
} from "@/schemas/transaction-schema";
import { revalidatePath } from "next/cache";

export const getAllTransactions = async (userId: string) => {
  "use cache";
  const transactions = await db.transaction.findMany({
    where: { userId },
    include: { category: true, wallet: true },
    orderBy: [{ date: "desc" }, { createdAt: "desc" }],
  });

  const grouped: GroupedTransaction[] = [];
  const seenTransfers = new Set<string>();

  for (const tx of transactions) {
    if (tx.transferId && !seenTransfers.has(tx.transferId)) {
      // Buscar la contraparte
      const counterpart = transactions.find(
        (t) => t.transferId === tx.transferId && t.id !== tx.id
      );

      if (counterpart) {
        grouped.push({
          id: tx.transferId,
          type: "transfer",
          amount: tx.amount,
          description: tx.description,
          fromWallet: tx.type === "expense" ? tx.wallet : counterpart.wallet,
          toWallet: tx.type === "income" ? tx.wallet : counterpart.wallet,
          date: tx.date,
          transferId: tx.transferId,
        });
      }

      seenTransfers.add(tx.transferId);
    } else if (!tx.transferId) {
      grouped.push(tx);
    }
  }

  return { data: grouped };
};

export const addTransaction = async (values: TransactionFormData) => {
  try {
    const { data, success } = transactionSchema.safeParse(values);

    console.log({ data });

    if (!success && !data) {
      return { error: "Datos invalidos" };
    }

    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return { error: "no autorizado" };
    }

    const { type, amount, category, description, date, wallet, toWallet } =
      data;

    let transaction;

    if (type === "transfer") {
      const transferId = crypto.randomUUID();

      const fromTx = await db.transaction.create({
        data: {
          type: "expense",
          amount: Number(amount),
          description,
          userId: session.user.id,
          walletId: wallet,
          categoryId: null, // No hay categoría
          date: new Date(date + "T12:00:00"),
          transferId,
        },
      });

      const toTx = await db.transaction.create({
        data: {
          type: "income",
          amount: Number(amount),
          description,
          userId: session.user.id,
          walletId: toWallet,
          categoryId: null, // No hay categoría
          date: new Date(date + "T12:00:00"),
          transferId,
        },
      });

      transaction = { from: fromTx, to: toTx };
    } else {
      transaction = await db.transaction.create({
        data: {
          type,
          amount: Number(amount),
          description,
          userId: session.user.id,
          walletId: wallet,
          categoryId: category,
          date: new Date(date + "T12:00:00"),
        },
      });
    }

    revalidatePath("/");
    return transaction;
  } catch (error) {
    console.error(error);
  }
};

export const deleteTransaction = async (id: string) => {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return { error: "no autorizado" };
    }

    await db.transaction.delete({ where: { id, userId: session.user.id } });

    revalidatePath("/");
  } catch (error) {
    console.error(error);
  }
};
