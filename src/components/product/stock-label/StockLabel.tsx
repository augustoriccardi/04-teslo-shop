"use client";

import { getStockBySlug } from "@/actions";
import { titleFont } from "@/config/fonts";

import { useEffect } from "react";

interface Props {
  slug: string;
}

export const StockLabel = ({ slug }: Props) => {
  useEffect(() => {
    getStock();
  }, []);

  const getStock = async () => {
    const inStock = await getStockBySlug(slug);
    console.log({ inStock });
  };

  return (
    <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
      Stock: {150}
    </h1>
  );
};
