"use server";

import prisma from "../../lib/prisma";
import { Gender } from "@prisma/client";

interface PaginationOptions {
  page?: number;
  take?: number;
  gender?: Gender;
  search?: string;
}

export const getPaginatedProductsWithImages = async ({
  page = 1,
  take = 12,
  gender,
  search,
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  const where = {
    gender: gender,
    title: {
      contains: search,
      mode: "insensitive",
    },
  };

  try {
    //1. Obtener los products
    const products = await prisma.product.findMany({
      take: take,
      skip: (page - 1) * take,
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true,
          },
        },
      },
      where: where as any,
    });

    // 2. Obtener el total de páginas
    // todo:
    const totalCount = await prisma.product.count({
      where: where as any,
    });
    const totalPages = Math.ceil(totalCount / take);

    // con Promise.all  puntos 1 y 2 sería :
    // const [products, totalCount] = await Promise.all([
    //   prisma.product.findMany({
    //     take: take,
    //     skip: (page - 1) * take,
    //     include: {
    //       ProductImage: {
    //         take: 2,
    //         select: {
    //           url: true,
    //         },
    //       },
    //     },
    //   }),
    //   // 2. Obtener el total de páginas
    //   // todo:
    //   prisma.product.count({}),
    // ]);

    return {
      currentPage: page,
      totalPages: totalPages,
      products: products.map((product) => ({
        ...product,
        images: product.ProductImage.map((image) => image.url),
      })),
    };
  } catch (error) {
    throw new Error("No se pudo cargar los productos");
  }
};
