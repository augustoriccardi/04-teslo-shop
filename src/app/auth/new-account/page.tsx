import { titleFont } from "@/config/fonts";
import Link from "next/link";
import { RegisterForm } from "./ui/RegisterForm";

export default function NewAccountPage() {
  return (
    <div className="flex flex-col justify-center  h-screen">
      <h1 className={`${titleFont.className} text-4xl mb-5`}>Nueva cuenta</h1>
      <RegisterForm />
    </div>
  );
}
