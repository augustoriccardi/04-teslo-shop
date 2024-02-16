"use server";

import { auth } from "@/auth.config";
import prisma from "../../lib/prisma";

export const getOrderById = async (id: string) => {
  const session = await auth();

  try {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        OrderAddress: true,
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            size: true,
            product: {
              select: {
                title: true,
                slug: true,
                ProductImage: {
                  select: {
                    url: true,
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    // Si la orden no existe arroja un error
    if (!order) {
      throw `${id} no existe`;
    }

    // Me aseguro que el que vea esta orden sea el usuario autenticado/que la realizó o un admin
    if (session?.user.id !== order?.userId && session?.user.role !== "admin") {
      return {
        ok: false,
        message: " No estás autorizado para ver esta información",
      };
    }

    return {
      ok: true,
      order: order,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Hable con el administrador",
    };
  }
};
