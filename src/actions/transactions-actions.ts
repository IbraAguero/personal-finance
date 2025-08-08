"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import {
  TransactionFormData,
  transactionSchema,
} from "@/schemas/transaction-schema";
import { revalidatePath } from "next/cache";

export const getAllTransactions = async () => {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return { error: "no autorizado" };
    }

    const transactions = await db.transaction.findMany({
      where: { userId: session.user.id },
      include: { category: true },
      orderBy: [{ date: "desc" }, { createdAt: "desc" }],
    });
    return transactions;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const addTransaction = async (values: TransactionFormData) => {
  try {
    const { data, success } = transactionSchema.safeParse(values);

    if (!success && !data) {
      return { error: "Datos invalidos" };
    }

    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return { error: "no autorizado" };
    }

    const { type, amount, category, description, date, wallet } = data;

    const newTransaction = await db.transaction.create({
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

    revalidatePath("/");
    return newTransaction;
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
