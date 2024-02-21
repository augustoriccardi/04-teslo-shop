//https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config

export const revalidate = 60;

import { redirect } from "next/navigation";

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function Home({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page as string) : 1;

  // Server action para obtener los productos a mostrarse en la página y el totalPages para pasarle a Pagination.
  const { products, currentPage, totalPages } =
    await getPaginatedProductsWithImages({ page });

  const productsWithImages = products.filter(
    (product) => product.ProductImage.length !== 0 // Podría ser también que la condición sea product.ProductImage.length >=2
  );

  if (products.length === 0) {
    redirect("/");
  }

  return (
    <>
      <Title title="Tienda" subTitle="Todos los productos" className="mb-2" />
      <ProductGrid products={productsWithImages} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
