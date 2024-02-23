"use client";

import { authenticate } from "@/actions";
import clsx from "clsx";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import {
  IoEyeOffOutline,
  IoEyeOutline,
  IoInformationOutline,
} from "react-icons/io5";
import { GooogleLogin } from "./GoogleSignInButton";

export const LoginForm = () => {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  const [isEyeOpen, setIsEyeOpen] = useState(true);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  useEffect(() => {
    if (errorMessage === "Success") window.location.replace(callbackUrl);
  }, [errorMessage, callbackUrl]);

  // los inputs para que se pasen a formData tienen que tener el "name". El dispatch ejecuta la función authenticate que tiene como argumento a formData.
  return (
    <form action={dispatch} className="flex flex-col">
      <label htmlFor="email">Correo electrónico</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="email"
        id="email"
        name="email"
      />

      <label htmlFor="password">Contraseña</label>
      <div className="relative flex items-center">
        <input
          className="px-5 py-2 border bg-gray-200 rounded w-full pr-10"
          type={isEyeOpen ? "text" : "password"}
          id="password"
          name="password"
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 px-3 flex items-center justify-center bg-transparent"
          onClick={() => setIsEyeOpen((prev) => !prev)}
          aria-label={isEyeOpen ? "Ocultar contraseña" : "Mostrar contraseña"}
        >
          {isEyeOpen ? (
            <IoEyeOutline size={20} className="text-gray-600" />
          ) : (
            <IoEyeOffOutline size={20} className="text-blue-800" />
          )}
        </button>
      </div>

      <div
        className="flex mb-2 h-6 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {errorMessage && errorMessage !== "Success" && (
          <>
            <IoInformationOutline className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{errorMessage}</p>
          </>
        )}
      </div>
      <LoginButton />

      {/* divisor l ine */}
      <div className="flex items-center my-2">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">o inicia sesión con</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>
      <div className="w-full flex justify-between"></div>
      <GooogleLogin />
      <Link
        href="/auth/new-account"
        className=" underline flex justify-end text-blue-500  text-md "
      >
        Sign in
      </Link>
    </form>
  );
};

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={clsx({
        "btn-primary": !pending,
        "btn-disabled": pending,
      })}
      disabled={pending}
    >
      Ingresar
    </button>
  );
}
