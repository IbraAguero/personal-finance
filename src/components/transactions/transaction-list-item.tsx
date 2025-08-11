import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import { GroupedTransaction } from "@/interface/transaction-interface";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import clsx from "clsx";
import { Badge } from "../ui/badge";
import { deleteTransaction } from "@/actions/transactions-actions";

interface Props {
  transaction: GroupedTransaction & {
    fromWallet?: { id: string; name: string };
    toWallet?: { id: string; name: string };
  };
}

function TransactionListItem({ transaction }: Props) {
  const handleDelete = async () => {
    await deleteTransaction(transaction.id);
  };

  const isTransfer = Boolean(transaction.transferId);

  return (
    <div
      key={transaction.id}
      className="flex justify-between items-center p-4 border rounded-lg"
    >
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          {isTransfer ? (
            <Badge variant="secondary">Transferencia</Badge>
          ) : (
            <Badge
              variant={
                transaction.type === "income" ? "default" : "destructive"
              }
            >
              {transaction.type === "income" ? "Ingreso" : "Gasto"}
            </Badge>
          )}

          {!isTransfer ? (
            <span className="font-medium">
              {"category" in transaction && (
                <span className="font-medium">
                  {transaction.category?.name}
                </span>
              )}
            </span>
          ) : (
            <span className="font-medium">
              {transaction.fromWallet?.name} → {transaction.toWallet?.name}
            </span>
          )}
        </div>

        <p className="text-muted-foreground">{transaction.description}</p>

        <span className="text-sm text-muted-foreground">
          {format(new Date(transaction.date), "d MMM yyyy", { locale: es })}
          {"wallet" in transaction && transaction.wallet?.name && (
            <> • {transaction.wallet.name}</>
          )}
        </span>
      </div>

      <div className="flex items-center gap-1">
        <span
          className={clsx("font-bold text-lg", {
            "text-green-500": transaction.type === "income",
            "text-red-500": transaction.type === "expense",
          })}
        >
          {isTransfer ? "" : transaction.type === "income" ? "+" : "-"}$
          {transaction.amount.toLocaleString("es-ES", { currency: "ARS" })}
        </span>

        <Button
          variant="ghost"
          size="icon"
          className="text-red-500 hover:text-red-700"
          onClick={handleDelete}
        >
          <Trash className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

export default TransactionListItem;
