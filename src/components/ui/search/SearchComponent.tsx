"use client";

import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

export const SearchComponent = ({ setIsSearchOpen, isSearchOpen }: any) => {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm === "") {
        return router.push(`${pathname}`);
      }
      setIsSearchOpen(false);
      router.push(`${pathname}?search=${searchTerm}`);
    }, 1000);

    return () => {
      clearTimeout(delayDebounceFn);
    };
  }, [searchTerm, router]);

  useEffect(() => {
    // setIsSearchOpen(false);
  }, [pathname]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    setSearchTerm(value);
    setDebouncedSearchTerm(value);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24">
      {/* Blur*/}
      {isSearchOpen && (
        <div
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className="fixed inset-0 bg-slate-900/25 backdrop-blur transition-opacity opacity-100"
        />
      )}

      {isSearchOpen && (
        <div className="relative w-full max-w-lg transform px-4 transition-all opacity-100 scale-100">
          <div className="overflow-hidden rounded-lg bg-white shadow-md">
            <div className="relative">
              <div>
                <span className="pointer-events-none absolute right-4 top-4 h-6 w-6 fill-slate-400">
                  <IoSearchOutline size={20} />
                </span>
                <input
                  type="text"
                  placeholder="Buscar"
                  className="block w-full appearance-none bg-transparent py-4 pl-4 pr-12 text-base text-slate-900 placeholder:text-slate-600 focus:outline-none sm:text-lg sm:leading-6"
                  onChange={(e) => handleSearchChange(e)}
                  autoFocus
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
