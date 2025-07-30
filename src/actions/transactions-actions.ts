"use server";

import { db } from "@/lib/db";
import {
  TransactionFormData,
  transactionSchema,
} from "@/schemas/transaction-schema";
import { revalidatePath } from "next/cache";

export const getAllTransactions = async () => {
  try {
    const transactions = await db.transaction.findMany({
      include: { category: true },
      orderBy: [{ date: "desc" }, { createdAt: "desc" }],
    });
    return transactions;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getCategories = async () => {
  try {
    const categories = await db.category.findMany();
    const expense = categories.filter((cat) => cat.type === "EXPENSE");
    const income = categories.filter((cat) => cat.type === "INCOME");

    return { expense, income };
  } catch (error) {
    console.error(error);
    return { expense: [], income: [] };
  }
};

export const addTransaction = async (values: TransactionFormData) => {
  try {
    const { data, success } = transactionSchema.safeParse(values);

    if (!success && !data) {
      return null;
    }

    const { type, amount, category, description, date } = data;

    const newTransaction = await db.transaction.create({
      data: {
        type,
        amount: Number(amount),
        categoryId: category,
        description,
        date: new Date(date + "T12:00:00"),
      },
    });

    revalidatePath("/");
    return newTransaction;
  } catch (error) {
    console.error(error);
  }
};
