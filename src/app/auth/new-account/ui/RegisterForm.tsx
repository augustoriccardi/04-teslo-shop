"use client";

import clsx from "clsx";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { registerUser, login } from "@/actions";
import { useState } from "react";
import {
  IoEyeOutline,
  IoEyeOffOutline,
  IoInformationCircleOutline,
} from "react-icons/io5";

type formInputs = {
  name: string;
  email: string;
  password: string;
};

const userSchema = z.object({
  name: z
    .string()
    .min(7, { message: "Debe ser mayor a 7 caracteres" })
    .max(20, { message: "Debe ser menor a 20 caracteres" }),
  email: z
    .string()
    .email({ message: "Favor de ingresar un correo electrónico válido" }),
  password: z
    .string()
    .min(6, { message: "Escriba una contraseña de 6 caracteres" }),
});

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<formInputs>({
    resolver: zodResolver(userSchema),
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isEyeOpen, setIsEyeOpen] = useState(false);

  const onSubmit: SubmitHandler<formInputs> = async (data) => {
    setErrorMessage("");
    const { name, email, password } = data;
    const resp = await registerUser(name, email, password);

    if (!resp.ok) {
      setErrorMessage(resp.message);
      return;
    }
    await login(email.toLocaleLowerCase(), password);
    window.location.replace("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col ">
      <label htmlFor="name">Nombre completo</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded ", {
          "border-red-500": errors.name,
        })}
        type="text"
        id="name"
        autoFocus
        autoComplete="off"
        {...register("name", { required: true })}
      />

      {errors.name?.message && (
        <div className="space-x-1 ">
          <p className="text-sm text-red-500 inline-flex mt-1">
            <IoInformationCircleOutline className="h-5 w-5 text-red-500 me-1" />
            {errors.name?.message}
          </p>
        </div>
      )}

      <label htmlFor="email">Correo electrónico</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded", {
          "border-red-500": errors.email,
        })}
        type="email"
        id="email"
        autoComplete="off"
        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
      />
      {errors.email?.message && (
        <div className="space-x-1 ">
          <p className="text-sm text-red-500 inline-flex mt-1">
            <IoInformationCircleOutline className="h-5 w-5 text-red-500 me-1" />
            {errors.email?.message}
          </p>
        </div>
      )}
      <label htmlFor="password">Contraseña</label>
      <div>
        <div className="relative flex items-center ">
          <input
            className={clsx(
              "px-5 py-2 border bg-gray-200 rounded w-full pr-10",
              {
                "border-red-500": errors.password,
              }
            )}
            type={isEyeOpen ? "text" : "password"}
            id="password"
            autoComplete="off"
            {...register("password", { required: true, minLength: 6 })}
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
        {errors.password?.message && (
          <div className="space-x-1 ">
            <p className="text-sm text-red-500 inline-flex mt-1">
              <IoInformationCircleOutline className="h-5 w-5 text-red-500 me-1" />
              {errors.password?.message}
            </p>
          </div>
        )}
      </div>

      <span className="text-red-500">{errorMessage}</span>

      <button className="btn-primary">Crear cuenta</button>

      <Link
        href="/auth/login"
        className=" underline flex justify-end text-blue-500  text-md "
      >
        Login
      </Link>
    </form>
  );
};
