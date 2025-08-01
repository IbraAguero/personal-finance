"use client";
import { registerUser } from "@/actions/auth-actions";
import ButtonLoader from "@/components/ui/button-loader";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import PasswordInput from "@/components/ui/password-input";
import { registerSchema, RegisterValues } from "@/schemas/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function RegisterForm() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "" },
  });
  const router = useRouter();

  const onSubmit = (values: RegisterValues) => {
    startTransition(async () => {
      const res = await registerUser(values);
      if (res.error) {
        toast.error("Algo salio mal", { description: res.error });
      } else {
        router.push("/");
      }
    });
  };

  return (
    <Form {...form}>
      <form
        className="space-y-6 py-6 pb-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Ingrese su nombre" {...field} />
              </FormControl>
              <FormMessage className="min-h-[2rem]" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Correo</FormLabel>
              <FormControl>
                <Input placeholder="Ingrese su correo" {...field} />
              </FormControl>
              <FormMessage className="min-h-[2rem]" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Ingrese su contraseña" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ButtonLoader className="w-full" isPending={isPending}>
          Registrarse
        </ButtonLoader>
      </form>
    </Form>
  );
}
export default RegisterForm;
