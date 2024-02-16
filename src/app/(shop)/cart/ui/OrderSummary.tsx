"use client";

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils/currecncyFormat";
import { useEffect, useState } from "react";

export const OrderSummary = () => {
  const [loaded, setLoaded] = useState(false);
  const { getTotalItems, subTotal, tax, total } = useCartStore((state) =>
    state.getSummaryInformation()
  );

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return <div>Loading...</div>;

  return (
    <>
      <span>No. Productos</span>
      <span className="text-right">
        {getTotalItems() === 1 ? "1 artículo" : getTotalItems() + " artículos"}
      </span>

      <span>Subtotal</span>
      <span className="text-right">{currencyFormat(subTotal)}</span>

      <span>Impuestos (22%)</span>
      <span className="text-right">{currencyFormat(tax)}</span>

      <span className="mt-5 text-2xl">Total:</span>
      <span className="mt-5 text-2xl text-right">{currencyFormat(total)}</span>
    </>
  );
};
