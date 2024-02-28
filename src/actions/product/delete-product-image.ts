"use server";

import { v2 as cloudinary } from "cloudinary";
import prisma from "../../lib/prisma";
import { revalidatePath } from "next/cache";
cloudinary.config(process.env.CLOUDINARY_URL ?? "");

export const deleteProductImage = async (imageId: number, imageUrl: string) => {
  console.log(imageUrl);
  if (!imageUrl.startsWith("http")) {
    return {
      ok: false,
      error: "No se pueden borrar imágenes del FS",
    };
  }

  const imageName = imageUrl.split("/").pop()?.split(".")[0] ?? "";

  try {
    await cloudinary.uploader.destroy(imageName);
    const deletedImage = await prisma.productImage.delete({
      where: {
        id: imageId,
      },
      select: {
        product: {
          select: {
            slug: true,
          },
        },
      },
    });

    //Revalidar los paths
    revalidatePath("/admin/products");
    revalidatePath(`/admin/product/${deletedImage.product.slug}`);
    revalidatePath(`/product/${deletedImage.product.slug}`);
  } catch (error) {
    return {
      ok: false,
      message: "No se pudo eliminar la imágen",
    };
  }
};
