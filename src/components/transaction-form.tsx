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
import z from "zod";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "./ui/textarea";
import { ScrollArea } from "./ui/scroll-area";

const transactionSchema = z.object({
  type: z.enum(["income", "expense"]),
  amount: z
    .string({ error: "El monto es requerido" })
    .min(1, "El monto es requerido")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "El monto debe ser mayor a 0",
    }),
  category: z.string().min(1, "La categoria es requerida"),
  description: z
    .string()
    .min(3, "La descripción debe tener al menos 3 caracteres")
    .max(200, "La descripción no puede exceder 200 caracteres"),
  date: z.string().min(1, "La fecha es requerida"),
});

export type TransactionFormData = z.infer<typeof transactionSchema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  categories: {
    income: string[];
    expense: string[];
  };
  onSubmit: (transaction: TransactionFormData) => void;
}

function TransactionForm({ isOpen, onClose, categories, onSubmit }: Props) {
  const form = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: "income",
      amount: undefined,
      category: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
    },
  });

  const watchedType = form.watch("type");

  const avaliableCategories = categories[watchedType] || [];

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
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="income" />
                          </FormControl>
                          <FormLabel className="text-green-400 font-medium cursor-pointer">
                            Ingreso
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="expense" />
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
                        {avaliableCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Clasifica tus{" "}
                      {watchedType === "income" ? "ingresos" : "gastos"}
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
