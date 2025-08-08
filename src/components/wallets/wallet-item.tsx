import { walletIcons } from "@/lib/icons";
import { Wallet } from "@prisma/client";
import clsx from "clsx";
import { Button } from "../ui/button";
import { Edit, Trash } from "lucide-react";
import { deleteWallet } from "@/actions/wallet-action";
import { toast } from "sonner";

interface Props {
  wallet: Wallet & { balance: number };
  onEdit: () => void;
}

function WalletItem({ wallet, onEdit }: Props) {
  const handleDelete = async () => {
    const res = await deleteWallet(wallet.id);
    if (res?.error) {
      toast.error("Ocurrio un error", { description: res.error });
    }
  };

  const { icon: Icon, color } = walletIcons[wallet.type];
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div className="flex flex-1 items-center gap-3">
        <Icon className={`w-6 h-6 ${color} mt-2`} />
        <div className="flex flex-col gap-1">
          <div className="flex gap-2">
            <span className="font-medium text-foreground">{wallet.name}</span>
          </div>
          <div
            className={clsx("font-bold text-xl", {
              "text-red-400": wallet.balance < 0,
              "text-green-400": wallet.balance > 0,
              "text-neutral-400": wallet.balance === 0,
            })}
          >
            ${wallet.balance.toLocaleString("es-AR")}
          </div>
          <p className="text-muted-foreground text-xs">
            Creada el: {new Date(wallet.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="icon" onClick={onEdit}>
          <Edit />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="text-red-400 hover:text-red-400"
          onClick={handleDelete}
        >
          <Trash />
        </Button>
      </div>
    </div>
  );
}
export default WalletItem;
