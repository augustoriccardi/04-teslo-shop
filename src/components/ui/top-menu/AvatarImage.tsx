"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { titleFont } from "@/config/fonts";

export const AvatarImage = () => {
  const { data: session } = useSession();
  const initialsSessionUser =
    session?.user.name
      .split(" ")
      .map((l) => l[0])
      .join("")
      .toUpperCase() || "";

  return (
    <>
      {session?.user.name && (
        <div className="relative hidden lg:block fade-in">
          <div className="flex items-center absolute right-64">
            <span className={`  m-2 p-2 ${titleFont.className} `}>
              {` ${session?.user.name.split(" ")[0]} 
              ${session?.user.name.split(" ")[1]}`}
            </span>
            {session?.user.image ? (
              <Image
                src={`${session?.user.image}`}
                width={40}
                height={40}
                alt={session?.user.name}
                className=" rounded-full m-2"
              />
            ) : (
              <div className="rounded-full flex justify-center items-center bg-slate-500 w-[40px] h-[40px]">
                <span className="text-white">{initialsSessionUser}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
