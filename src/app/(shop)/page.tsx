//https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config

export const revalidate = 60;

import { redirect } from "next/navigation";

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";

interface Props {
  searchParams: {
    page?: string;
    search?: string;
  };
}

export default async function Home({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page as string) : 1;
  const search = searchParams.search;

  // Server action para obtener los productos a mostrarse en la página y el totalPages para pasarle a Pagination.
  const { products, currentPage, totalPages } =
    await getPaginatedProductsWithImages({ page, search });

  if (products.length === 0) {
    redirect("/");
  }

  return (
    <>
      <Title title="Tienda" subTitle="Todos los productos" className="mb-2" />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
