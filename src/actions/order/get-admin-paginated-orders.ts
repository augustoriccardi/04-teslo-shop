"use server";

import { auth } from "@/auth.config";
import prisma from "../../lib/prisma";

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getAdminPaginatedOrders = async ({
  page = 1,
  take = 12,
}: PaginationOptions) => {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return {
      ok: false,
      message: "Unauthorized",
    };
  }

  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  try {
    //1. Obtener las ordenes por usuario

    const orders = await prisma.order.findMany({
      take: take,
      skip: (page - 1) * take,
      orderBy: {
        createdAt: "desc",
      },

      include: {
        OrderAddress: true,
      },
    });

    // 2. Obtener el total de páginas
    const totalCount = await prisma.order.count({
      where: {
        userId: session?.user.id,
      },
    });
    const totalPages = Math.ceil(totalCount / take);

    return {
      ok: true,
      currentPage: page,
      totalPages: totalPages,
      orders: orders,
    };
  } catch (error) {
    return {
      ok: false,
      message: "No se pudo cargar las ordenes",
    };
  }
};
