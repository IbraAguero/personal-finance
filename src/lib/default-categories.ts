import { TransactionType } from "@prisma/client";

export const defaultCategories = [
  // Ingresos
  { name: "Salario", type: TransactionType.income },
  { name: "Freelance", type: TransactionType.income },
  { name: "Regalos", type: TransactionType.income },
  { name: "Intereses bancarios", type: TransactionType.income },
  { name: "Reembolsos", type: TransactionType.income },
  { name: "Ventas", type: TransactionType.income },
  { name: "Premios", type: TransactionType.income },
  { name: "Alquiler recibido", type: TransactionType.income },
  { name: "Inversiones", type: TransactionType.income },
  { name: "Otros ingresos", type: TransactionType.income },

  // Gastos
  { name: "Comida", type: TransactionType.expense },
  { name: "Transporte", type: TransactionType.expense },
  { name: "Alquiler", type: TransactionType.expense },
  { name: "Entretenimiento", type: TransactionType.expense },
  { name: "Salud", type: TransactionType.expense },
  { name: "Educación", type: TransactionType.expense },
  { name: "Servicios públicos", type: TransactionType.expense },
  { name: "Internet", type: TransactionType.expense },
  { name: "Teléfono", type: TransactionType.expense },
  { name: "Ropa", type: TransactionType.expense },
  { name: "Mascotas", type: TransactionType.expense },
  { name: "Deudas", type: TransactionType.expense },
  { name: "Regalos", type: TransactionType.expense },
  { name: "Compras del hogar", type: TransactionType.expense },
  { name: "Suscripciones", type: TransactionType.expense },
  { name: "Viajes", type: TransactionType.expense },
  { name: "Impuestos", type: TransactionType.expense },
  { name: "Otros gastos", type: TransactionType.expense },
];
