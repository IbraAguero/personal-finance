import { getWallets } from "@/actions/wallet-action";
import PageWallets from "./page-client";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

async function Page() {
  const session = await auth();

  const userId = session?.user?.id;

  if (!userId) {
    redirect("/login");
  }

  const { data: wallets } = await getWallets(userId);
  return (
    <>
      <PageWallets wallets={wallets} />
    </>
  );
}
export default Page;
