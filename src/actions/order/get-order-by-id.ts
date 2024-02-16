"use server";

import { auth } from "@/auth.config";
import prisma from "../../lib/prisma";

export const getOrderById = async (id: string) => {
  const session = await auth();

  // Me aseguro que el que vea esta orden sea el usuario autenticado/que la realizó
  const order = await prisma.order.findUnique({ where: { id } });

  if (session?.user.id !== order?.userId) {
    throw new Error("No estás autorizado para ver esta información");
  }

  try {
    // Busco todos los items de la orden que incluyan de product el title y el slug
    const orderItems = await prisma.orderItem.findMany({
      where: { orderId: id },
      include: {
        product: {
          select: {
            title: true,
            slug: true,
          },
        },
      },
    });

    // Barro todos los items de la orden y a cada uno busco las imágenes []
    const orderItemsWithImagesPromises = orderItems.map(async (item) => {
      //Devuelve un array de imágenes
      const productImages = await prisma.productImage.findMany({
        where: {
          productId: item.productId,
        },
      });

      // devuelvo para cada item un objeto que contenga las propiedades de item existentes, más la primer imágen del array de imágenes
      return { ...item, image: productImages[0] };
    });

    const orderItemsWithImage = await Promise.all(orderItemsWithImagesPromises);

    const orderAdress = await prisma.orderAddress.findUnique({
      where: {
        orderId: id,
      },
      include: {
        country: {
          select: { name: true },
        },
      },
    });

    return {
      ok: true,
      order: order,
      orderItems: orderItemsWithImage,
      orderAdress: orderAdress,
    };
  } catch (error) {
    console.log(error);
    throw new Error(`Could not find Order with ID "${id}"`);
  }
};
