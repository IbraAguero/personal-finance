import { Pen, Save, Trash, X } from "lucide-react";
import { Button } from "../ui/button";
import { Category } from "@prisma/client";
import { useState } from "react";
import { Input } from "../ui/input";

interface Props {
  category: Category;
  onDelete: (cat: Category) => void;
  onSave: (category: Category) => void;
}

function CategoryItem({ category, onDelete, onSave }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(category.name);

  const handleSave = () => {
    const trimmed = inputValue.trim();
    if (!trimmed || trimmed === category.name) {
      setIsEditing(false);
      return;
    }
    onSave({ ...category, name: inputValue });
    setIsEditing(false);
  };

  return (
    <div
      key={category.id}
      className="p-3 flex gap-2 items-center justify-between border rounded-lg"
    >
      {isEditing ? (
        <Input
          className="h-8 text-sm"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      ) : (
        <span className={`text-sm font-medium`}>{category.name}</span>
      )}
      <div className="flex gap">
        {isEditing ? (
          <>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 p-0"
              onClick={handleSave}
            >
              <Save className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 p-0"
              onClick={() => setIsEditing(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </>
        ) : (
          <>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 p-0"
              onClick={() => setIsEditing(true)}
            >
              <Pen className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 p-0 text-red-500 hover:text-red-500"
              onClick={() => onDelete(category)}
            >
              <Trash className="w-4 h-4" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
export default CategoryItem;
