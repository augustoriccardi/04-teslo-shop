"use client";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cart/cart-store";
import { useRouter } from "next/navigation";

export default function BuyLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [loaded, setLoaded] = useState(false);
  const { getTotalItems } = useCartStore((state) =>
    state.getSummaryInformation()
  );

  const itemsInCart = getTotalItems();

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (itemsInCart === 0 && loaded === true) {
      router.replace("/");
    }
  }, [itemsInCart, loaded]);

  if (!loaded) return <p>Loading...</p>;

  return <>{children}</>;
}
