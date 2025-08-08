"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { ChartLine, MenuIcon } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const ROUTES = [
  { path: "/", pathname: "Transacciones" },
  { path: "/billeteras", pathname: "Billeteras" },
  { path: "/configuracion", pathname: "Configuracion" },
];

function Sidebar() {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [path]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-72 pl-6">
        <SheetHeader className="pl-0">
          <SheetTitle>
            <Link
              href="/"
              className="text-xl font-extrabold flex gap-2 items-center"
            >
              <ChartLine />
              Mis Finanzas
            </Link>
          </SheetTitle>
          <SheetDescription />
        </SheetHeader>
        <ul className="space-y-5">
          {ROUTES.map((route) => (
            <li key={route.path}>
              <Link
                href={route.path}
                className={clsx(
                  "text-lg text-muted-foreground hover:text-primary/80 transition-colors",
                  { "text-primary/100": route.path === path }
                )}
              >
                {route.pathname}
              </Link>
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
export default Sidebar;
