import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import CategoryItem from "./category-item";
import { Category, TransactionType } from "@prisma/client";
import CategoryDialogConfirm from "./category-dialog-confirm";
import { useState } from "react";
import {
  addCategory,
  deleteCategory,
  editCategory,
} from "@/actions/categories-actions";
import { toast } from "sonner";

interface Props {
  categories: Category[];
  type: TransactionType;
}

function CategoryList({ categories, type }: Props) {
  const [inputValue, setInputValue] = useState("");
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null
  );
  const typeLabel = type === "income" ? "Ingresos" : "Gastos";
  const typeColor = type === "income" ? "text-green-400" : "text-red-400";

  const handleDelete = (cat: Category) => {
    setCategoryToDelete(cat);
  };

  const handleSave = async (category: Category) => {
    const res = await editCategory(category.id, {
      name: category.name,
      type: category.type,
    });
    if (res?.error) {
      toast.error("Ocurrio un error", { description: res.error });
    }
  };

  const handleAdd = async () => {
    if (!inputValue.trim()) {
      return;
    }

    const res = await addCategory({ name: inputValue, type });
    if (res?.error) {
      toast.error("Ocurrio un error", { description: res.error });
    } else {
      setInputValue("");
    }
  };

  const confirmDelete = async () => {
    if (!categoryToDelete) return;
    const res = await deleteCategory(categoryToDelete.id);
    if (res?.error) {
      toast.error("Ocurrio un error", { description: res.error });
    }
    setCategoryToDelete(null);
  };

  return (
    <>
      <div className="border rounded-lg space-y-4 p-2 pb-4">
        <div className="p-3 pb-0">
          <h3 className={`text-xl font-bold ${typeColor}`}>
            Categorias de {typeLabel}
          </h3>
          <span className="text-muted-foreground text-sm">
            Gestiona las categorías para clasificar tus{" "}
            {typeLabel.toLowerCase()}
          </span>
          <div className="flex gap-2 my-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={`Nueva categoria de ${typeLabel.toLowerCase()}`}
            />
            <Button variant="outline" onClick={handleAdd}>
              <Plus />
            </Button>
          </div>
        </div>
        <ScrollArea className="h-[300px] px-3">
          <div className="space-y-2">
            {categories.map((cat) => (
              <CategoryItem
                onDelete={handleDelete}
                onSave={handleSave}
                category={cat}
                key={cat.id}
              />
            ))}
          </div>
        </ScrollArea>
      </div>
      <CategoryDialogConfirm
        isOpen={!!categoryToDelete}
        onClose={() => setCategoryToDelete(null)}
        onConfirm={confirmDelete}
      />
    </>
  );
}
export default CategoryList;
