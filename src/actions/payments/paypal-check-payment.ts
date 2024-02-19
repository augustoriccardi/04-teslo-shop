"use server";

import { PaypalOrderStatusResponse } from "@/interfaces";
import prisma from "../../lib/prisma";
import { revalidatePath } from "next/cache";

export const paypalCheckPayment = async (paypalTransactionId: string) => {
  //Obtengo el token de PayPal cuando se hace click en pagar y se finaliza  la compra.
  const authToken = await getPayPalBearerToken();

  //Si no lo obtengo , lanza un error y termina la función.
  if (!authToken) {
    return {
      ok: false,
      message: "No se pudo obtener el token",
    };
  }

  // Si obtengo el token entonces verifico que se haya realizado el pago en Paypal, le mando el id de la transacción y el token.
  const resp = await verifyPayPalPayment(paypalTransactionId, authToken);

  // Si no obtengo respuesta  o hay algún error en la verificación , retorno el mensaje de error.
  if (!resp) {
    return {
      ok: false,
      message: "Error al verificar el pago",
    };
  }
  const { status, purchase_units } = resp;
  console.log({ status, purchase_units });
  const { invoice_id: orderId } = purchase_units[0]; //Todo: invoice ID

  //Si obtuve respuesta pero el status es diferente a "COMPLETED", retorno que el pago está pendiente.
  if (status !== "COMPLETED") {
    return {
      ok: false,
      message: "Aún no se ha pagado en PayPal",
    };
  }

  //Si esl status es "COMPLETED"  , actualizo el estado del pedido en mi base de datos (isPaid y paidAt)
  try {
    await prisma.order.update({
      where: { id: orderId },
      data: {
        isPaid: true,
        paidAt: new Date(),
      },
    });

    //Todo: Revalidar un Path
    revalidatePath(`/orders/${orderId}`);

    return {
      ok: true,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: `El pago no se pudo realizar`,
    };
  }
};

// Generar el token de Paypal con el  clientID y secret
const getPayPalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`
  ).toString("base64");

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "insomnia/2023.5.8",
      Authorization: `Basic ${base64Token}`,
    },
    body: new URLSearchParams({ grant_type: "client_credentials" }),
  };

  try {
    const result = await fetch(
      "https://api-m.sandbox.paypal.com/v1/oauth2/token",
      {
        ...options,
        cache: "no-store",
      }
    ).then((r) => r.json());
    return result.access_token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const verifyPayPalPayment = async (
  paypalTransactionId: string,
  bearerToken: string
): Promise<PaypalOrderStatusResponse | null> => {
  const paypalOrderUrl = `${process.env.PAYPAL_ORDERS_URL}/${paypalTransactionId}`;

  const options = {
    method: "GET",
    headers: {
      "User-Agent": "insomnia/2023.5.8",
      Authorization: `Bearer ${bearerToken}`,
    },
  };

  try {
    const resp = await fetch(paypalOrderUrl, {
      ...options,
      cache: "no-store",
    }).then((r) => r.json());

    return resp;
  } catch (error) {
    console.log(error);
    return null;
  }
};
