export const revalidate = 604800; // 7 días

import { notFound } from "next/navigation";

import {
  ProductMobileSlideShow,
  ProductSlideShow,
  QuantitySelector,
  SizeSelector,
  StockLabel,
} from "@/components";
import { titleFont } from "@/config/fonts";
import { getProductBySlug } from "@/actions";

interface Props {
  params: {
    slug: string;
  };
}

export default async function ProductsBySlugPage({ params }: Props) {
  const { slug } = params;
  const product = await getProductBySlug(slug);

  if (!product) {
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
        {product.inStock !== 0 && (
          <>
            <p className="text-lg mb-5">${product.price}</p>
            {/* Selector de Tallas */}
            <SizeSelector
              selectedSize={product.sizes[1]}
              availableSizes={product.sizes}
            />
            {/* Selector de Cantidad */}
            <QuantitySelector quantity={2} />
            {/* Button*/}
            <button className="btn-primary my-5 ">Agregar al carrito</button>
          </>
        )}

        {/* Descripción*/}
        <h3 className="font-bold text-sm mt-2">Descripción</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
