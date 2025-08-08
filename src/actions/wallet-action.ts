"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { WalletFormData, walletSchema } from "@/schemas/wallet-schema";
import { revalidatePath } from "next/cache";

export const getWallets = async () => {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return { error: "no autorizado", success: false, data: [] };
    }

    const wallets = await db.wallet.findMany({
      where: { userId: session.user.id },
    });

    const walletsWithBalance = await Promise.all(
      wallets.map(async (wallet) => {
        const balance = await getWalletBalance(wallet.id);
        return { ...wallet, balance };
      })
    );

    return { data: walletsWithBalance, success: true };
  } catch (error) {
    console.error(error);
    // VERIFICAR QUE DEVOLVER []
    return {
      success: false,
      data: [],
      error: "Ocurrio un error al obtener las cuentas",
    };
  }
};

export const addWallet = async (values: WalletFormData) => {
  try {
    const { data, success } = walletSchema.safeParse(values);

    if (!success && !data) {
      return { error: "Datos invalidos" };
    }

    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return { error: "No autorizado" };
    }

    const findWallet = await db.wallet.findUnique({
      where: {
        name_type_userId: {
          name: data.name,
          type: data.type,
          userId: session.user.id,
        },
      },
    });

    if (findWallet) {
      return { error: "Ya existe una cuenta con ese nombre" };
    }

    await db.wallet.create({
      data: { name: data.name, type: data.type, userId: session.user.id },
    });
    revalidatePath("/billeteras");
  } catch (error) {
    console.error(error);
    return { error: "ocurrio un error al agregar una cuenta" };
  }
};

export const deleteWallet = async (id: string) => {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return { error: "No autorizado" };
    }

    const wallet = await db.wallet.findUnique({ where: { id, userId } });

    if (!wallet) {
      return { error: "Billetera no encontrada" };
    }

    const count = await db.transaction.count({ where: { walletId: id } });

    if (count > 0) {
      return {
        error: "La billetera tiene transacciones y no puede eliminarse",
      };
    }

    await db.wallet.delete({ where: { id, userId } });
    revalidatePath("/billeteras");
  } catch (error) {
    console.error(error);
    return { error: "Ocurrio un error al eliminar la billetera" };
  }
};

export const updateWallet = async (id: string, values: WalletFormData) => {
  try {
    const { data, success } = walletSchema.safeParse(values);

    if (!success && !data) {
      return { error: "Datos invalidos" };
    }

    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return { error: "No autorizado" };
    }

    const wallet = await db.wallet.findUnique({ where: { id, userId } });

    if (!wallet) {
      return { error: "Billetera no encontrada" };
    }

    await db.wallet.update({
      where: { id },
      data: { name: data.name, type: data.type },
    });

    const existingWallet = await db.wallet.findFirst({
      where: {
        name: data.name,
        userId,
        NOT: { id },
      },
    });
    if (existingWallet) {
      return { error: "Ya existe una billetera con ese nombre" };
    }

    revalidatePath("/billeteras");
  } catch (error) {
    console.error(error);
    return { error: "Ocurrio un error al editar la billetera" };
  }
};

export const getWalletBalance = async (walletId: string) => {
  const income = await db.transaction.aggregate({
    where: {
      walletId,
      type: "income",
    },
    _sum: {
      amount: true,
    },
  });

  const expense = await db.transaction.aggregate({
    where: {
      walletId,
      type: "expense",
    },
    _sum: {
      amount: true,
    },
  });

  const incomeTotal = income._sum.amount ?? 0;
  const expenseTotal = expense._sum.amount ?? 0;

  return incomeTotal - expenseTotal;
};
