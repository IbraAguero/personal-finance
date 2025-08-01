"use server";

import { signIn } from "@/auth";
import { db } from "@/lib/db";
import {
  LoginValues,
  registerSchema,
  RegisterValues,
} from "@/schemas/auth-schema";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";

export const loginAction = async (values: LoginValues) => {
  try {
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message };
    }
    console.error(error);
    return { error: "error 500" };
  }
};

export const registerUser = async (values: RegisterValues) => {
  try {
    const { data, success } = registerSchema.safeParse(values);
    if (!success && !data) {
      return {
        sucess: false,
        error: "Datos invalidos",
      };
    }

    const { email, name, password } = data;

    const findUser = await db.user.findUnique({ where: { email } });
    if (findUser) {
      return {
        sucess: false,
        error: "El email ya esta en uso",
      };
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: { email: email.toLowerCase(), name, password: passwordHash },
    });

    signIn("credentials", {
      email: user.email,
      password: user.password,
      redirect: false,
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message };
    }
    console.error(error);
    return { error: "error 500" };
  }
};
