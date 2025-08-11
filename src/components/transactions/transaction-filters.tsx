"use client";
import { CircleX, Search } from "lucide-react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "../ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { Category, Wallet } from "@prisma/client";
import { useEffect } from "react";
import { Button } from "../ui/button";

export interface Filters {
  search: string;
  type: "all" | "income" | "expense" | "transfer";
  category: string;
  wallet: string;
}

interface Props {
  filters: Filters;
  categories: {
    income: Category[];
    expense: Category[];
  };
  wallets: Wallet[];
  onChange: (filters: Filters) => void;
}

function TransactionFilters({ filters, categories, wallets, onChange }: Props) {
  useEffect(() => {
    if (filters.type) {
      onChange({ ...filters, category: "all" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.type]);

  const filteredCategory =
    filters.type === "transfer"
      ? []
      : filters.type === "all"
      ? [...categories.expense, ...categories.income]
      : categories[filters.type] || [];

  const resetFilters = () => {
    onChange({
      category: "all",
      search: "",
      type: "all",
      wallet: "all",
    });
  };

  const hasActiveFilters =
    filters.search.trim() !== "" ||
    filters.type !== "all" ||
    filters.category !== "all" ||
    filters.wallet !== "all";

  return (
    <div className="flex gap-2 justify-between">
      <div className="flex gap-2 items-center">
        <div className="relative">
          <Search className="absolute w-4 h-4 transform left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-8"
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            placeholder="Buscar transacciones..."
          />
        </div>
        <Select
          defaultValue="all"
          value={filters.type}
          onValueChange={(value) => {
            if (
              value === "income" ||
              value === "expense" ||
              value === "all" ||
              value === "transfer"
            ) {
              onChange({ ...filters, type: value });
            }
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Tipo</SelectLabel>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="income">Ingreso</SelectItem>
              <SelectItem value="expense">Gasto</SelectItem>
              <SelectItem value="transfer">Transferencia</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          defaultValue="all"
          value={filters.category}
          onValueChange={(value) => onChange({ ...filters, category: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Catergorias</SelectLabel>
              <SelectItem value="all">Todas</SelectItem>
              {filteredCategory.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          defaultValue="all"
          value={filters.wallet}
          onValueChange={(value) => onChange({ ...filters, wallet: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Billeteras" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Billeteras</SelectLabel>
              <SelectItem value="all">Todas</SelectItem>
              {wallets.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {hasActiveFilters && (
        <Button variant="secondary" onClick={resetFilters}>
          <CircleX />
          Limpiar Filtros
        </Button>
      )}
    </div>
  );
}
export default TransactionFilters;
