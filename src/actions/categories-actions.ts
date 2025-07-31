"use server";

import { db } from "@/lib/db";

export const getCategories = async () => {
  try {
    const categories = await db.category.findMany();
    const expense = categories.filter((cat) => cat.type === "expense");
    const income = categories.filter((cat) => cat.type === "income");

    return { expense, income };
  } catch (error) {
    console.error(error);
    return { expense: [], income: [] };
  }
};
