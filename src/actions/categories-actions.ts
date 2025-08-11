"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { CategoryFormData, categorySchema } from "@/schemas/category-schema";
import { revalidatePath } from "next/cache";

export const getCategories = async () => {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return { error: "no autorizado", expense: [], income: [] };
    }

    const categories = await db.category.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "asc" },
    });
    const expense = categories.filter((cat) => cat.type === "expense");
    const income = categories.filter((cat) => cat.type === "income");

    return { expense, income };
  } catch (error) {
    console.error(error);
    return {
      error: "Ocurrio un error al obtener las categorias",
      expense: [],
      income: [],
    };
  }
};

export const addCategory = async (values: CategoryFormData) => {
  try {
    const { data, success } = categorySchema.safeParse(values);

    if (!success) {
      return {
        error: "Datos invalidos",
      };
    }

    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return { error: "No autorizado" };
    }

    const findCategory = await db.category.findUnique({
      where: {
        name_type_userId: {
          name: data.name,
          type: data.type,
          userId: session.user.id,
        },
      },
    });

    if (findCategory) {
      return { error: "Ya existe una categoria con ese nombre" };
    }

    await db.category.create({ data: { ...data, userId: session.user.id } });
    revalidatePath("/");
  } catch (error) {
    console.error(error);
    return { error: "ocurrio un error al agregar la categoria" };
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
    revalidatePath("/");
  } catch (error) {
    console.error(error);
    return { error: "Error al eliminar la categoría" };
  }
};

export const editCategory = async (id: string, values: CategoryFormData) => {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return { error: "No autorizado" };
    }

    await db.category.update({
      where: { id, userId: session.user.id },
      data: { ...values },
    });
    revalidatePath("/");
  } catch (error) {
    console.error(error);
    return { error: "Error al editar la categoría" };
  }
};
