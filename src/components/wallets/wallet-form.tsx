import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { walletIcons } from "@/lib/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { WalletFormData, walletSchema } from "@/schemas/wallet-schema";
import { useEffect, useTransition } from "react";
import { addWallet, updateWallet } from "@/actions/wallet-action";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Alert, AlertDescription } from "../ui/alert";
import { AlertTriangle } from "lucide-react";
import { Wallet } from "@prisma/client";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  wallet?: Wallet;
}

function WalletForm({ isOpen, onClose, wallet }: Props) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<WalletFormData>({
    resolver: zodResolver(walletSchema),
    defaultValues: {
      name: wallet?.name || "",
      type: wallet?.type || undefined,
    },
  });

  const onSubmit = (values: WalletFormData) => {
    startTransition(async () => {
      const res = wallet
        ? await updateWallet(wallet.id, values)
        : await addWallet(values);

      if (res?.error) {
        toast.error("Ocurrio un error", { description: res.error });
      } else {
        onClose();
        form.reset();
      }
    });
  };

  useEffect(() => {
    form.reset({
      name: wallet?.name ?? "",
      type: wallet?.type ?? undefined,
    });
  }, [wallet, form]);

  const isEditMode = Boolean(wallet);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Editar billetera" : "Nueva billetera"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Modifica los datos de tu billetera."
              : "Registra una nueva billetera para tener un mejor control."}
          </DialogDescription>
        </DialogHeader>
        <Alert>
          <AlertTriangle />
          <AlertDescription>
            No puedes eliminar cuentas que tienen transacciones asociadas. Los
            balances se calculan automáticamente.
          </AlertDescription>
        </Alert>
        <Form {...form}>
          <form
            className="space-y-6 mt-2"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Nombre de la billetera</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Ingrese el nombre" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="min-w-44">
                    <FormLabel>Tipo de billetera</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecciona una cuenta" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(walletIcons).map(
                          ([type, { icon: Icon, color, label }]) => (
                            <SelectItem value={type} key={type}>
                              <Icon className={`h-4 w-4 ${color}`} />
                              {label}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button variant="ghost" type="button" onClick={onClose}>
                Cancelar
              </Button>
              <Button isLoading={isPending} type="submit">
                {isEditMode ? "Guardar cambios" : "Agregar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
export default WalletForm;
