"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export const GooogleLogin = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  return (
    <div className="flex justify-center items-center mx-2">
      <button
        className="flex justify-center rounded-full  border border-white-600 shadow-md hover:bg-slate-300"
        onClick={() => {
          signIn("google", { callbackUrl: `${callbackUrl} ` });
        }}
      >
        <FcGoogle size={35} className="m-2" />
      </button>
    </div>
  );
};
