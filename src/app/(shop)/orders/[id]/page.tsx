import Image from "next/image";

import { IsPaidFlag, Title } from "@/components";
import { getOrderById } from "@/actions";
import { redirect } from "next/navigation";
import { currencyFormat } from "@/utils/currencyFormat";
import { PayPalButton } from "@/components/paypal/PayPalButton";
import Link from "next/link";

interface Props {
  params: {
    id: string;
  };
}

export default async function OrdersById({ params }: Props) {
  const { id } = params;

  const { ok, order } = await getOrderById(id);

  if (!ok) {
    redirect("/");
  }

  const address = order?.OrderAddress;

  return (
    // <>{JSON.stringify(order)}</>
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Orden #${id.split("-").at(-1)}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <IsPaidFlag isPaid={order?.isPaid ?? false} />

            {/* Items */}
            {order!.OrderItem.map((item) => (
              <div key={item.product.slug} className="flex mb-5">
                <Image
                  src={`/products/${item.product.ProductImage[0].url}`}
                  width={100}
                  height={100}
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                  alt={item.product.title}
                  className="mr-5 rounded"
                />

                <div>
                  <p>
                    {item.size} - {item.product.title} ({item.quantity})
                  </p>
                  <p> {currencyFormat(item.price)}</p>
                  <p className="font-bold">
                    Subtotal: {currencyFormat(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout - Resumen de orden */}
          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <h2 className="text-2xl mb-2">Dirección de entrega</h2>
            <div className="mb-10">
              <p>{`${address!.firstName} ${address!.lastName}`}</p>
              <p>{address!.address}</p>
              <p>{`${address!.city}, ${address!.countryId}`}</p>
              <p>CP: {address!.postalCode}</p>
            </div>

            {/* Divider */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2">Resumen de orden</h2>

            <div className="grid grid-cols-2 mb-5">
              <span>No. Productos</span>
              <span className="text-right">
                {order?.itemsInOrder === 1
                  ? "1 artículo"
                  : order?.itemsInOrder + " artículos"}
              </span>

              <span>Subtotal</span>
              <span className="text-right">
                {currencyFormat(order!.subTotal)}
              </span>

              <span>Impuestos (22%)</span>
              <span className="text-right"> {currencyFormat(order!.tax)}</span>

              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-2xl text-right">
                {currencyFormat(order!.total)}
              </span>
            </div>

            {order?.isPaid ? (
              <IsPaidFlag isPaid={order?.isPaid ?? false} />
            ) : (
              <PayPalButton amount={order!.total} orderId={order!.id} />
            )}

            <Link
              className="underline flex justify-end text-blue-600"
              href={"/"}
            >
              Continuar comprando →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
