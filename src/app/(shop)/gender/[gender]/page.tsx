import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { Gender } from "@prisma/client";
import { redirect } from "next/navigation";

interface Props {
  params: {
    gender: string;
  };
  searchParams: {
    page?: string;
  };
}

const labels: Record<string, string> = {
  men: "para hombres",
  women: "para mujeres",
  kid: "para niños",
  unisex: "para todos",
};

//https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config

export const revalidate = 60;

export default async function GenderByPage({ searchParams, params }: Props) {
  const { gender } = params;
  const page = searchParams.page ? parseInt(searchParams.page as string) : 1;

  const { products, currentPage, totalPages } =
    await getPaginatedProductsWithImages({ page, gender: gender as Gender });

  if (products.length === 0) {
    redirect(`/gender/${gender}`);
  }

  return (
    <div>
      <Title
        title={`Artículos de ${labels[gender]}`}
        subTitle="Todos los productos"
        className="mb-2"
      />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </div>
  );
}
