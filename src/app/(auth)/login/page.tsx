import LoginForm from "@/components/auth/login/login-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Page() {
  return (
    <section className="w-full min-h-screen grid place-content-center">
      <div className="md:border rounded-lg p-8 px-10 min-w-md">
        <h1 className="text-2xl font-bold">Iniciar Sesión</h1>
        <span className="text-muted-foreground">
          Ingrese sus credenciales para continuar
        </span>
        <LoginForm />
        <div className="text-center">
          <span className="text-muted-foreground">¿No tienes una cuenta?</span>
          <Link href="/register">
            <Button variant="link" className="p-0 ml-1">
              Registrate
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
export default Page;
