import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Category } from "@prisma/client";
import CategoryList from "./category-list";

interface Categories {
  income: Category[];
  expense: Category[];
}

interface Props {
  isOpen: boolean;
  onClose: (isOpen: boolean) => void;
  categories: Categories;
}

function CategoryDialog({ isOpen, onClose, categories }: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:min-w-[40vw] max-h-[90vh] flex flex-col">
        <DialogHeader className="">
          <DialogTitle>Gestionar categorías</DialogTitle>
          <DialogDescription>
            Agrega, edita o elimina categorías para organizar mejor tus
            transacciones.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-hidden">
          <Tabs defaultValue="income" className="w-full h-full flex flex-col">
            <TabsList className="w-full">
              <TabsTrigger value="income">Ingresos</TabsTrigger>
              <TabsTrigger value="expense">Gastos</TabsTrigger>
            </TabsList>
            <TabsContent value="income">
              <CategoryList categories={categories["income"]} type="income" />
            </TabsContent>
            <TabsContent value="expense">
              <CategoryList categories={categories["expense"]} type="expense" />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
export default CategoryDialog;
