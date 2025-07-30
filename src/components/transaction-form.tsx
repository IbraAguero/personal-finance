import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "./ui/textarea";
import { ScrollArea } from "./ui/scroll-area";
import {
  TransactionFormData,
  transactionSchema,
} from "@/schemas/transaction-schema";
import { Category } from "@prisma/client";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  categories: {
    income: Category[];
    expense: Category[];
  };
  onSubmit: (transaction: TransactionFormData) => void;
}

function TransactionForm({ isOpen, onClose, categories, onSubmit }: Props) {
  const today = new Date();
  const localDate = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
  )
    .toISOString()
    .split("T")[0];

  const form = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: "INCOME",
      amount: undefined,
      category: "",
      description: "",
      date: localDate,
    },
  });

  const watchedType = form.watch("type");

  const avaliableCategories =
    categories[watchedType.toLowerCase() as "income" | "expense"] || [];

  useEffect(() => {
    form.setValue("category", "");
  }, [watchedType, form]);

  useEffect(() => {
    form.reset();
  }, [isOpen, form]);

  const handleSubmit = (values: TransactionFormData) => {
    console.log(values);
    onSubmit(values);
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={"max-h-[90vh] p-0"}>
        <DialogHeader className="px-6 pt-6">
          <DialogTitle>Nueva transaccion</DialogTitle>
          <DialogDescription>
            Registra un nuevo ingreso o gasto en tu control financiero.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] px-6 pb-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              {/* TIPO DE TRANSACCION */}
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Tipo de transaccion</FormLabel>
                    <FormControl>
                      <RadioGroup
                        className="mt-2"
                        defaultValue="INCOME"
                        onValueChange={field.onChange}
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="INCOME" />
                          </FormControl>
                          <FormLabel className="text-green-400 font-medium cursor-pointer">
                            Ingreso
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="EXPENSE" />
                          </FormControl>
                          <FormLabel className="text-red-400 font-medium cursor-pointer">
                            Gasto
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* MONTO DE LA TRANSACCION */}
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monto</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step={0.01}
                        placeholder="0.00"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormDescription>
                      Ingresa el monto de la transacción
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* CATEGORIA DE LA TRANSACCION */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecciona una categoria" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {avaliableCategories.map((category: Category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Clasifica tus{" "}
                      {watchedType === "INCOME" ? "ingresos" : "gastos"}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* DESCRIPCION DE LA TRANSACCION */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripcion</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Describe la transacción..."
                        className="resize-none"
                      />
                    </FormControl>
                    <FormDescription>
                      Proporciona detalles sobre esta transacción (3-200
                      caracteres)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* FECHA DE LA TRANSACCION */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripcion</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormDescription>
                      Proporciona detalles sobre esta transacción (3-200
                      caracteres)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button variant="ghost" type="button">
                  Cancelar
                </Button>
                <Button type="submit">Guardar</Button>
              </DialogFooter>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
export default TransactionForm;
