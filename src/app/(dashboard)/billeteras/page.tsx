import { getWallets } from "@/actions/wallet-action";
import PageWallets from "./page-client";

async function Page() {
  const { data: wallets } = await getWallets();
  return (
    <>
      <PageWallets wallets={wallets} />
    </>
  );
}
export default Page;
