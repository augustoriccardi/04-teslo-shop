export const revalidate = 604800; // 7 días

// Documentación a Dynamic Metadata: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
import { Metadata, ResolvingMetadata } from "next";

import { notFound } from "next/navigation";

import {
  ProductMobileSlideShow,
  ProductSlideShow,
  StockLabel,
} from "@/components";
import { titleFont } from "@/config/fonts";
import { getProductBySlug } from "@/actions";
import { AddToCart } from "./ui/AddToCart";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  const product = await getProductBySlug(slug);

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  const localSrc = product?.images[1]
    ? product?.images[1].startsWith("http") // comprueba  si la imagen es remota o local
      ? product?.images[1] // si es remota  utiliza directamente la url de la imagen
      : `/products/${product?.images[1]}` // Si es local  concatena el nombre del archivo con la ruta base de las imágenes
    : "/imgs/placeholder.jpg"; // si no existe  una imagen en el servidor se usa una placeholder

  return {
    title: product?.title ?? "Producto no encontrado",
    description: product?.description ?? "",
    openGraph: {
      title: product?.title ?? "Producto no encontrado",
      description: product?.description ?? "",
      // images: [], // https://msitioweb.com/products/image.png
      images: [localSrc],
    },
  };
}

export default async function ProductsBySlugPage({ params }: Props) {
  const { slug } = params;
  const product = await getProductBySlug(slug);

  if (!product || !product.withImages) {
    return notFound();
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      {/*Slideshow */}
      <div className="col-span-1 md:col-span-2 ">
        {/* Desktop Slideshow */}
        <ProductMobileSlideShow
          title={product.title}
          images={product.images}
          className="block md:hidden"
        />

        {/* Desktop Slideshow */}
        <ProductSlideShow
          title={product.title}
          images={product.images}
          className="hidden md:block"
        />
      </div>

      {/* Detalles */}
      <div className="col-span-1 px-5 ">
        <StockLabel slug={product.slug} />

        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>

        <AddToCart product={product} />

        {/* Descripción*/}
        <h3 className="font-bold text-sm mt-2">Descripción</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
