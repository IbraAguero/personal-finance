"use client";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

function ButtonLogout() {
  return (
    <Button onClick={async () => await signOut()}>
      <LogOut />
      Cerrar sesion
    </Button>
  );
}
export default ButtonLogout;
