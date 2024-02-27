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
  IoInformationCircleOutline,
} from "react-icons/io5";
import { GooogleLogin } from "./GoogleSignInButton";
import { useSession } from "next-auth/react";

export const LoginForm = () => {
  const [errorMessage, dispatch] = useFormState(authenticate, {
    message: "",
    errors: undefined,
    fieldValues: {
      email: "",
      password: "",
    },
  });

  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  useEffect(() => {
    if (errorMessage.message === "success")
      window.location.replace(callbackUrl);
  }, [errorMessage, callbackUrl]);

  // los inputs para que se pasen a formData tienen que tener el "name". El dispatch ejecuta la función authenticate que tiene como argumento a formData.
  return (
    <div className="flex flex-col shadow px-4 py-6 rounded-xl w-[300px]">
      <form action={dispatch}>
        <div className="relative">
          <input
            className="peer h-10 w-full border-b-2 border-gray-400 placeholder-transparent bg-transparent focus:outline-none focus:border-blue-600"
            placeholder="email"
            type="email"
            id="email"
            autoComplete="off"
            name="email"
            defaultValue={errorMessage.fieldValues.email}
            autoFocus
          />
          <label
            htmlFor="email"
            className="absolute left-0 -top-3.5 text-blue-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-blue-600 peer-focus:text-sm"
          >
            Correo electrónico
          </label>
          <div className="h-[30px]">
            {errorMessage.errors?.email && (
              <p className="text-sm text-red-500 inline-flex mt-1">
                <IoInformationCircleOutline className="h-5 w-5 text-red-500 me-1" />
                {errorMessage.errors?.email}
              </p>
            )}
          </div>
        </div>
        <div className="relative">
          <div className="relative flex items-center ">
            <input
              className="peer h-10 w-full border-b-2 border-gray-400 placeholder-transparent bg-transparent focus:outline-none focus:border-blue-600"
              placeholder="password"
              type={isEyeOpen ? "text" : "password"}
              id="password"
              name="password"
              defaultValue={errorMessage.fieldValues.password}
            />
            <label
              htmlFor="password"
              className="absolute left-0 -top-3.5 text-blue-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-blue-600 peer-focus:text-sm"
            >
              Contraseña
            </label>
            <button
              type="button"
              className="absolute inset-y-0 right-0 px-3 flex items-center justify-center bg-transparent"
              onClick={() => setIsEyeOpen((prev) => !prev)}
              aria-label={
                isEyeOpen ? "Ocultar contraseña" : "Mostrar contraseña"
              }
            >
              {isEyeOpen ? (
                <IoEyeOutline size={20} className="text-blue-600" />
              ) : (
                <IoEyeOffOutline size={20} className="text-gray-400" />
              )}
            </button>
          </div>
          <div className="h-[30px]">
            {errorMessage.errors?.password && (
              <p className="text-sm text-red-500 inline-flex mt-1">
                <IoInformationCircleOutline className="h-5 w-5 text-red-500 me-1" />
                {errorMessage.errors?.password}
              </p>
            )}
          </div>
        </div>

        <div className="h-[30px]">
          {errorMessage.message === "error credenciales" && (
            <p className="ext-sm text-red-500 inline-flex mt-1">
              <IoInformationCircleOutline className="h-5 w-5 text-red-500 me-1" />
              Credenciales no válidas
            </p>
          )}
        </div>

        <LoginButton />

        {/* divisor l ine */}
        <div className="flex items-center my-4">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">o inicia sesión con</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>
        <div className="w-full flex justify-between"></div>
      </form>
      <GooogleLogin />
      <Link
        href="/auth/new-account"
        className=" underline flex justify-end text-blue-500  text-md "
      >
        Sign Up
      </Link>
    </div>
  );
};

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={clsx(
        {
          "btn-primary": !pending,
          "btn-disabled": pending,
        },
        "w-full"
      )}
      disabled={pending}
    >
      Ingresar
    </button>
  );
}
