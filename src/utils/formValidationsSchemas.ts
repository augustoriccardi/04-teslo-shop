import { z } from "zod";

export const UserSchema = z.object({
  email: z.string().email({ message: "Correo electrónico no válido" }),
  password: z
    .string()
    .min(6, { message: "Escriba contraseña de 6 caracteres" }),
});

export const newUserSchema = z.object({
  name: z
    .string()
    .min(7, { message: "Nombre completo debe ser mayor a 10 caracteres" })
    .max(20, { message: "Debe ser menor a 20 caracteres" }),
  email: z.string().email({ message: "Correo electrónico no válido" }),
  password: z
    .string()
    .min(6, { message: "Escriba una contraseña de 6 caracteres mínimo" }),
});
