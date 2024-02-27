"use server";

import { signIn } from "@/auth";
import { UserSchema } from "@/utils";

interface Fields {
  email: string;
  password: string;
}

interface FormState {
  message: string;
  errors: Record<keyof Fields, string> | undefined;
  fieldValues: Fields;
}

export async function authenticate(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const result = UserSchema.safeParse({
      email: email,
      password: password,
    });
    if (!result.success) {
      const errorMap = result.error.flatten().fieldErrors;
      return {
        message: "error formulario",
        errors: {
          email: errorMap["email"]?.[0] ?? "",
          password: errorMap["password"]?.[0] ?? "",
        },
        fieldValues: {
          email,
          password,
        },
      };
    }

    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: false,
    });

    return {
      message: "success",
      errors: undefined,
      fieldValues: {
        email: "",
        password: "",
      },
    };
  } catch (error) {
    return {
      message: "error credenciales",
      errors: undefined,
      fieldValues: {
        email: "",
        password: "",
      },
    };
  }
}

export const login = async (email: string, password: string) => {
  try {
    await signIn("credentials", { email, password });

    return {
      ok: true,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo iniciar session",
    };
  }
};
