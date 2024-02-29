"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerUser, login } from "@/actions";
import { useState } from "react";
import {
  IoEyeOutline,
  IoEyeOffOutline,
  IoInformationCircleOutline,
} from "react-icons/io5";
import clsx from "clsx";
import { newUserSchema } from "@/utils";
import Link from "next/link";

type formInputs = {
  name: string;
  email: string;
  password: string;
};

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm<formInputs>({
    resolver: zodResolver(newUserSchema),
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col shadow px-4 py-6 rounded-xl max-w-[300px]"
    >
      <div className="relative">
        <input
          id="name"
          type="text"
          className="peer h-10 w-full border-b-2 border-gray-400 placeholder-transparent  focus:outline-none focus:border-blue-600 bg-transparent"
          placeholder="name" //esta transparente, no se ve
          autoFocus
          autoComplete="off"
          {...register("name", {
            required: true,
          })}
        />

        <label
          htmlFor="name"
          className=" absolute left-0 -top-3.5 text-blue-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-blue-600 peer-focus:text-sm"
        >
          Nombre completo
        </label>

        <div className="h-[35px]">
          {errors.name?.message && (
            <p className="text-sm text-red-500 inline-flex mt-1 ">
              <IoInformationCircleOutline className="h-5 w-5 text-red-500 me-1" />
              {errors.name?.message}
            </p>
          )}
        </div>
      </div>

      <div className="relative">
        <input
          className="peer h-10 w-full border-b-2 border-gray-400 placeholder-transparent bg-transparent focus:outline-none focus:border-blue-600"
          placeholder="email"
          type="email"
          id="email"
          autoComplete="off"
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        />
        <label
          htmlFor="email"
          className="absolute left-0 -top-3.5 text-blue-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-blue-600 peer-focus:text-sm"
        >
          Correo electrónico
        </label>

        <div className="h-[35px]">
          {errors.email?.message && (
            <p className="text-sm text-red-500 inline-flex mt-1">
              <IoInformationCircleOutline className="h-5 w-5 text-red-500 me-1" />
              {errors.email?.message}
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
            autoComplete="off"
            {...register("password", { required: true, minLength: 6 })}
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
            aria-label={isEyeOpen ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {isEyeOpen ? (
              <IoEyeOutline size={20} className="text-blue-600" />
            ) : (
              <IoEyeOffOutline size={20} className="text-gray-400" />
            )}
          </button>
        </div>

        <div className="h-[70px]">
          {errors.password?.message && (
            <p className="text-sm text-red-500 inline-flex mt-1">
              <IoInformationCircleOutline className="h-5 w-5 text-red-500 me-1" />
              {errors.password?.message}
            </p>
          )}
        </div>
      </div>

      <span className="text-red-500">{errorMessage}</span>

      <button
        className={clsx({
          " btn-primary": !isSubmitting,
          "btn-disabled": isSubmitting,
        })}
      >
        Crear cuenta
      </button>

      {errorMessage && errorMessage !== "Success" && (
        <div className="space-x-1 ">
          <p className="ext-sm text-red-500 inline-flex mt-1">
            <IoInformationCircleOutline className="h-5 w-5 text-red-500 me-1" />
            {errorMessage}
          </p>
        </div>
      )}
      <Link
        href="/auth/login"
        className=" underline flex justify-end text-blue-500  text-md mt-6"
      >
        Already have an account?
      </Link>
    </form>
  );
};
