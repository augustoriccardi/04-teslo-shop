"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";

import { titleFont } from "@/config/fonts";
import { useCartStore, useUIStore } from "@/store";

import { AvatarImage } from "@/components";

import { SearchComponent } from "../search/SearchComponent";
import { usePathname } from "next/navigation";

export const TopMenu = () => {
  const openSideMenu = useUIStore((state) => state.openSideMenu);
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());
  const pathname = usePathname();

  // el useState y useEffect espera esta que se termine de renderizar la página para evitar el problema de hidratación o no concordancia de lo renderizado por el servidor vs cliente. Esperamos para mostar el totalItemsInCart.
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <AvatarImage />
      <nav className="flex px-5 justify-between items-center w-full">
        {/* Logo */}
        <div>
          <Link href={`/`}>
            <span className={`${titleFont.className} antialiased font-bold`}>
              Teslo
            </span>
            <span> | Shop</span>
          </Link>
        </div>
        {/* Center Menu */}
        <div className="hidden sm:block">
          <Link
            className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
            href="/gender/men"
          >
            Hombres
          </Link>
          <Link
            className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
            href="/gender/women"
          >
            Mujeres
          </Link>
          <Link
            className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
            href="/gender/kid"
          >
            Niños
          </Link>
        </div>
        {/* Search, Cart, Menu */}

        <div className="flex items-center">
          {(pathname === "/" || pathname.startsWith("/gender")) && (
            <SearchComponent />
          )}

          <div className="flex items-center">
            <Link
              href={totalItemsInCart === 0 && loaded ? "/empty" : "/cart"}
              className="mx-2"
            >
              <div className="relative">
                {loaded && totalItemsInCart > 0 && (
                  <span className="fade-in absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white w-4 h-4 flex justify-center items-center">
                    {totalItemsInCart}
                  </span>
                )}
                <IoCartOutline size={25} />
              </div>
            </Link>
            <button
              onClick={openSideMenu}
              className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
            >
              Menú
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};
