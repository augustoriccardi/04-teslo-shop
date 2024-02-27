import { titleFont } from "@/config/fonts";
import { LoginForm } from "./ui/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex flex-col justify-center  h-screen">
      <h1 className={`${titleFont.className} text-4xl mb-2`}>Ingresar</h1>
      <LoginForm />
    </div>
  );
}
