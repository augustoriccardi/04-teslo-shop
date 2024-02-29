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

export const productSchema = z.object({
  title: z.string().min(1, { message: "El título es obligatorio" }),
  slug: z.string().min(1, { message: "El slug es obligatorio" }),
  description: z.string().min(1, { message: "La descripción es obligatoria" }),
  price: z
    .number()
    .positive({ message: "El precio debe ser un número positivo" }),

  inStock: z
    .number()
    .positive({ message: "Cantidad en stock debe ser un número positivo" }),
  sizes: z.array(z.string()).refine((data) => data.length > 0, {
    message: "Seleccione al menos un tamaño",
  }),
  tags: z.string().min(1, { message: "Tags no puede estar vacío" }),
  gender: z
    .enum(["men", "women", "kid", "unisex"])
    .refine((data) => data !== undefined, { message: "Seleccione un género" }),
  categoryId: z.string().min(1, { message: "La categoría es obligatoria" }),
  images: z.any(), // Images will be validated later  on the server side
});
