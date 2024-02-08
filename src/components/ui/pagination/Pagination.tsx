"use client";
import { generatePaginationNumbers } from "@/utils";
// https://tailwindcomponents.com/component/pagination-3

import Link from "next/link";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import clsx from "clsx";

interface Props {
  totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Obtengo de la url  el parametro page y si no lo encuentra le doy por defecto a 1
  const pageString = searchParams.get("page") ?? 1;
  // Si el parámetro pageString no es un número lo convierto a uno, sino dejo el valor de pageString
  const currentPage = isNaN(+pageString) ? 1 : +pageString;

  // si currentPage es menor a 1 o no es un número lo redirijo a pathname que es "/"
  if (currentPage < 1 || isNaN(+pageString)) {
    redirect(pathname);
  }

  // console.log({ pathname, searchParams, currentPage });

  // dependiendo de la página actual y el total de páginas me devuelve un array  de números y/o puntos suspensivos para mostrar en los botones del paginador
  const allPages = generatePaginationNumbers(currentPage, totalPages);

  // Se construye la url con el pathname (/) y la variable params que la lee de los searchParams
  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    if (pageNumber === "...") {
      return `${pathname}?${params.toString()}`;
    }

    if (+pageNumber <= 0) {
      return `${pathname}`;
    }

    if (+pageNumber > totalPages) {
      return `${pathname}?${params.toString()}`;
    }

    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex justify-center mt-10 mb-32">
      <nav aria-label="Page navigation example">
        <ul className="flex list-style-none items-center">
          <li className="page-item">
            <Link
              className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href={createPageUrl(currentPage - 1)}
            >
              <IoChevronBackOutline size={30} />
            </Link>
          </li>
          {allPages.map((page, index) => (
            <li key={page} className="page-item">
              <Link
                className={clsx(
                  "page-link relative block py-1.5 px-3  border-0  outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none",
                  {
                    "bg-blue-600 shadow-md text-white hover:bg-blue-700 hover:text-white":
                      page === currentPage,
                  }
                )}
                href={createPageUrl(page)}
              >
                {page}
              </Link>
            </li>
          ))}

          <li className="page-item">
            <Link
              className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href={createPageUrl(currentPage + 1)}
            >
              <IoChevronForwardOutline size={30} />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
