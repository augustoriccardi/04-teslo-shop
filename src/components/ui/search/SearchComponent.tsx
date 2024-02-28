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

      router.push(`${pathname}?search=${searchTerm}`);
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, router]);

  useEffect(() => {
    setIsSearchOpen(false);
  }, [pathname]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    setSearchTerm(value);
    setDebouncedSearchTerm(value);
  };

  return (
    <div className="relative -left-5 -top-3 z-10">
      <button
        onClick={() => setIsSearchOpen(!isSearchOpen)}
        className={clsx("transition-all ", {
          absolute: !isSearchOpen,
          "absolute -translate-x-[154px] z-10 translate-y-[49px]": isSearchOpen,
        })}
      >
        <IoSearchOutline size={20} />
      </button>

      <div className="absolute top-10 -left-40">
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
