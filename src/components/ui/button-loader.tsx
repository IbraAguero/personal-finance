import { ComponentProps, ReactNode } from "react";
import { LoaderCircleIcon } from "lucide-react";
import { Button } from "./button";

interface ButtonLoaderProps extends ComponentProps<typeof Button> {
  children: ReactNode;
  isPending: boolean;
}

const ButtonLoader = ({ children, isPending, ...props }: ButtonLoaderProps) => {
  return (
    <Button disabled={isPending || props.disabled} {...props}>
      {isPending ? (
        <LoaderCircleIcon className="w-4 h-4 animate-spin mr-2" />
      ) : (
        children
      )}
    </Button>
  );
};
export default ButtonLoader;
