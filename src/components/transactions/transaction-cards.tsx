import { DollarSign, PieChart, TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardContent, CardTitle } from "../ui/card";
import clsx from "clsx";

interface Props {
  balance: number;
  totalIncome: number;
  totalExpense: number;
  totalTransactions: number;
}

function TransactionCards({
  balance,
  totalExpense,
  totalIncome,
  totalTransactions,
}: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card className="py-4">
        <CardContent className="space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-md font-medium">Balance Total</CardTitle>
            <DollarSign className="w-4 h-4 text-muted-foreground" />
          </div>
          <div
            className={clsx("text-2xl font-bold", {
              "text-green-400": balance >= 0,
              "text-red-400": balance < 0,
            })}
          >
            ${balance.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            {balance >= 0 ? "Saldo positivo" : "Saldo negativo"}
          </p>
        </CardContent>
      </Card>
      <Card className="py-4">
        <CardContent className="space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-md font-medium">Ingresos</CardTitle>
            <TrendingUp className="w-4 h-4 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-green-400">
            ${totalIncome.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">Total de ingresos</p>
        </CardContent>
      </Card>
      <Card className="py-4">
        <CardContent className="space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-md font-medium">Gastos</CardTitle>
            <TrendingDown className="w-4 h-4 text-red-400" />
          </div>
          <div className="text-2xl font-bold text-red-400">
            ${totalExpense.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">Total de gastos</p>
        </CardContent>
      </Card>
      <Card className="py-4">
        <CardContent className="space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-md font-medium">Transacciones</CardTitle>
            <PieChart className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold">{totalTransactions}</div>
          <p className="text-xs text-muted-foreground">
            Total de transacciones
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
export default TransactionCards;
