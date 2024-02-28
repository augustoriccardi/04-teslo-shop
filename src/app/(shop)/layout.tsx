import { Footer, Sidebar, TopMenu } from "@/components";

export const metadata = {
  title: {
    template: "%s - Teslo | Shop",
    default: "Home - Teslo | Shop",
  },
  description: "Una tienda virtual de productos",
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen ">
      <TopMenu />
      <Sidebar />
      <div className="sm:px-5 px-5">{children}</div>
      <Footer />
    </main>
  );
}
