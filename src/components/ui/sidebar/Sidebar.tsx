"use client";

import Link from "next/link";
import { logout } from "@/actions";
import { useUIStore } from "@/store";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from "react-icons/io5";
import { titleFont } from "@/config/fonts";

export const Sidebar = () => {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const closeSideMenu = useUIStore((state) => state.closeSideMenu);

  // se hace una llamada post o get a la api (/api/auth/[...nextauth]/route.ts)
  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;
  const isAdmin = session?.user.role === "admin";

  return (
    <div>
      {/* Background black */}

      {isSideMenuOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-25" />
      )}
      {/* Blur*/}
      {isSideMenuOpen && (
        <div
          onClick={closeSideMenu}
          className="fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
        />
      )}

      {/* Sidemenu*/}
      <nav
        className={clsx(
          "fixed p-5 right-0 top-0 w-[375px] sm:w-[300px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
          {
            "translate-x-full": !isSideMenuOpen,
          }
        )}
      >
        <IoCloseOutline
          size={25}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => closeSideMenu()}
        />

        {isAuthenticated && (
          <>
            <h1
              className={`${titleFont.className} antialiased text-lg font-semibold my-6`}
            >
              Panel de usuario
            </h1>
            {/* Line Separator */}
            <div className="w-full h-px bg-gray-200 " />
            <Link
              href="/profile"
              onClick={() => closeSideMenu()}
              className="flex items-center mt-2 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoPersonOutline size={25} />
              <span className="ml-3 text-lg">Perfil</span>
            </Link>
            <Link
              onClick={() => closeSideMenu()}
              href="/orders"
              className="flex items-center mt-2 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoTicketOutline size={25} />
              <span className="ml-3 text-lg">Mis ordenes</span>
            </Link>
          </>
        )}
        {!isAuthenticated && (
          <Link
            onClick={() => closeSideMenu()}
            href="/auth/login"
            className="flex items-center mt-2 p-2 hover:bg-gray-100 rounded transition-all"
          >
            <IoLogInOutline size={25} />
            <span className="ml-3 text-lg">Ingresar</span>
          </Link>
        )}

        {isAuthenticated && (
          <button
            className="flex w-full items-center mt-2 p-2 hover:bg-gray-100 rounded transition-all"
            onClick={() => logout()}
          >
            <IoLogOutOutline size={25} />
            <span className="ml-3 text-lg">Salir</span>
          </button>
        )}

        {isAdmin && (
          <>
            <h1
              className={`${titleFont.className} antialiased text-lg font-semibold my-6`}
            >
              Panel de Admin
            </h1>
            {/* Line Separator */}
            <div className="w-full h-px bg-gray-200 " />
            <Link
              onClick={() => closeSideMenu()}
              href="/admin/products"
              className="flex items-center mt-2 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoShirtOutline size={25} />
              <span className="ml-3 text-lg">Productos</span>
            </Link>

            <Link
              onClick={() => closeSideMenu()}
              href="/admin/orders"
              className="flex items-center mt-2 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoTicketOutline size={25} />
              <span className="ml-3 text-lg">Todas las ordenes</span>
            </Link>

            <Link
              onClick={() => closeSideMenu()}
              href="/admin/users"
              className="flex items-center mt-2 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoPeopleOutline size={25} />
              <span className="ml-3 text-lg">Usuarios</span>
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};
