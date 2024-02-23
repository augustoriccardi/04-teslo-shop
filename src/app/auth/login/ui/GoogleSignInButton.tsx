"use client";

import { signIn, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export const GooogleLogin = () => {
  return (
    <div className="flex justify-start items-center mx-2">
      <button
        className="rounded-full border border-white-600 shadow-md hover:bg-slate-300"
        onClick={() => {
          signIn("google" /*{ callbackUrl: "/" }*/);
        }}
      >
        <FcGoogle size={25} className="m-2" />
      </button>
    </div>
  );
};
