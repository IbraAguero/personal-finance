import { ChromeIcon } from "lucide-react";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

function ButtonGoogle({ children }: { children: React.ReactNode }) {
  const handleClick = async () => {
    await signIn("google");
  };

  return (
    <Button
      variant="secondary"
      size="lg"
      className="w-full"
      type="button"
      onClick={handleClick}
    >
      <ChromeIcon /> {children}
    </Button>
  );
}
export default ButtonGoogle;
