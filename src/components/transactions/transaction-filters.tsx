"use client";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { Category } from "@prisma/client";
import { useEffect } from "react";

export interface Filters {
  search: string;
  type: "all" | "income" | "expense";
  category: string;
}

interface Props {
  filters: Filters;
  categories: {
    income: Category[];
    expense: Category[];
  };
  onChange: (filters: Filters) => void;
}

function TransactionFilters({ filters, categories, onChange }: Props) {
  useEffect(() => {
    if (filters.type) {
      onChange({ ...filters, category: "all" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.type]);

  const filteredCategory =
    filters.type === "all"
      ? [...categories.expense, ...categories.income]
      : categories[filters.type] || [];

  return (
    <div className="flex gap-2">
      <div className="relative">
        <Search className="absolute w-4 h-4 transform left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="pl-8"
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          placeholder="Buscar transacciones..."
        />
      </div>
      <div>
        <Select
          defaultValue="all"
          value={filters.type}
          onValueChange={(value) => {
            if (value === "income" || value === "expense" || value === "all") {
              onChange({ ...filters, type: value });
            }
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="income">Ingreso</SelectItem>
            <SelectItem value="expense">Gasto</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Select
          defaultValue="all"
          value={filters.category}
          onValueChange={(value) => onChange({ ...filters, category: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            {filteredCategory.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
export default TransactionFilters;
