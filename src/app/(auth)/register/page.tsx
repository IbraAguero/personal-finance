import RegisterForm from "@/components/auth/register/register-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Page() {
  return (
    <section className="w-full min-h-screen grid place-content-center">
      <div className="md:border rounded-lg p-8 px-10 min-w-md">
        <h1 className="text-2xl font-bold">Registrate</h1>
        <span className="text-muted-foreground">
          Regístrate y empieza a gestionar tus finanzas de manera eficiente
        </span>
        <RegisterForm />
        <div className="text-center">
          <span className="text-muted-foreground">¿Ya tenes una cuenta?</span>
          <Link href="/login">
            <Button variant="link" className="p-0 ml-1">
              Ingresar
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
export default Page;
