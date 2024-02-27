"use client";

import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

export const SearchComponent = () => {
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm === "") {
        return router.push(`${pathname}`);
      }

      router.push(`/?search=${searchTerm}`);
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, router, pathname]);

  useEffect(() => {
    if (!pathname.startsWith("/?search")) {
      setIsSearchOpen(false);
      setSearchTerm("");
    }
  }, [pathname]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    setSearchTerm(value);
    setDebouncedSearchTerm(value);
  };

  return (
    <div className="absolute z-10">
      <button
        onClick={() => setIsSearchOpen(!isSearchOpen)}
        className={clsx("transition-all ", {
          "relative -left-3": !isSearchOpen,
          "relative -translate-x-[170px] z-10 translate-y-[100px]":
            isSearchOpen,
        })}
      >
        <IoSearchOutline size={20} />
      </button>

      <div className="relative top-16 -left-44">
        {isSearchOpen && (
          <input
            type="text"
            placeholder="Buscar"
            className="w-30 bg-gray-50 rounded pl-10 py-1 border-b-2 text-lg border-gray-200 focus:outline-none focus:border-blue-500 "
            onChange={(e) => handleSearchChange(e)}
            autoFocus
          />
        )}
      </div>
    </div>
  );
};
