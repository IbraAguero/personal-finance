import { Transaction } from "@/app/page";
import { Badge } from "./ui/badge";
import clsx from "clsx";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";

interface Props {
  transactions: Transaction[];
}

function TransactionList({ transactions }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">Todas las transacciones</h2>
        <p className="text-muted-foreground">
          Historial completo de tus movimientos financieros
        </p>
      </div>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex justify-between items-center p-4 border rounded-lg"
          >
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    transaction.type === "income" ? "default" : "destructive"
                  }
                >
                  {transaction.type === "income" ? "Ingreso" : "Gasto"}
                </Badge>
                <span className="font-medium">{transaction.category}</span>
                <span className="text-muted-foreground">
                  {new Date(transaction.date).toLocaleDateString("es-Es", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              <p className="text-muted-foreground">{transaction.description}</p>
            </div>
            <div className="flex items-center gap-1">
              <span
                className={clsx("font-bold text-lg", {
                  "text-green-500": transaction.type === "income",
                  "text-red-500": transaction.type === "expense",
                })}
              >
                {transaction.type === "income" ? "+" : "-"}$
                {transaction.amount.toLocaleString()}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="text-red-500 hover:text-red-70 "
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default TransactionList;
