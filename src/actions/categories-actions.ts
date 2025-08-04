"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { CategoryFormData, categorySchema } from "@/schemas/category-schema";

export const getCategories = async () => {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return { error: "no autorizado" };
    }

    const categories = await db.category.findMany({
      where: { userId: session.user.id },
    });
    const expense = categories.filter((cat) => cat.type === "expense");
    const income = categories.filter((cat) => cat.type === "income");

    return { expense, income };
  } catch (error) {
    console.error(error);
    return { expense: [], income: [] };
  }
};

export const addCategory = async (values: CategoryFormData) => {
  try {
    const { data, success } = categorySchema.safeParse(values);

    if (!success) {
      return;
    }

    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return { error: "no autorizado" };
    }

    await db.category.create({ data: { ...data, userId: session.user.id } });
  } catch (error) {
    console.error(error);
  }
};

export const deleteCategory = async (id: string) => {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return { error: "No autorizado" };
    }

    const count = await db.transaction.count({ where: { categoryId: id } });

    if (count > 0) {
      return { error: "La categoría está siendo usada y no se puede eliminar" };
    }

    await db.category.delete({
      where: { id, userId: session.user.id },
    });
  } catch (error) {
    console.error(error);
    return { error: "Error al eliminar la categoría" };
  }
};
