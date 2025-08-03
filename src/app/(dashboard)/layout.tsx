import Navbar from "@/components/layout/navbar";

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      <section className="max-w-6xl mx-auto p-4">{children}</section>
    </>
  );
}
