import Link from "next/link";
import Sidebar from "./sidebar";
import { ChartLine } from "lucide-react";

function Navbar() {
  return (
    <header className="border-y w-full">
      <nav className="max-w-6xl mx-auto p-5 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-extrabold flex gap-2 items-center"
        >
          <ChartLine />
          Mis Finanzas
        </Link>
        <Sidebar />
      </nav>
    </header>
  );
}
export default Navbar;
