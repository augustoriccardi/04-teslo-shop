/*Pasos para crear el "tsconfig.json" dentro de seed:
1. Instalación de paquete ts-node:  "npm i -D ts-node"
2. Crear un archivo llamado "tsconfig.json", con la siguiente configuración:
"cd src/seed/"
"npx tsc --init"
3. en package.json adicionar un script: "seed": "ts-node src/seed/seed-database.ts"
*/

import { initialData } from "./seed";
import prisma from "../lib/prisma";
import { countries } from "./seed-countries";

async function main() {
  // 1. Borrar registros previos
  // await Promise.all([

  await prisma.orderAddress.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();

  await prisma.userAddress.deleteMany();
  await prisma.user.deleteMany();
  await prisma.country.deleteMany();

  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // ]);

  const { categories, products, users } = initialData;

  // Usuarios

  await prisma.user.createMany({
    data: users,
  });

  // Categorías

  const categoriesData = categories.map((category) => ({ name: category }));
  await prisma.category.createMany({
    data: categoriesData,
  });

  const categoriesDB = await prisma.category.findMany();
  //El 'map' inicia como un {} y en cada iteración crea una llave con el id de la categoría
  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;

    return map;
  }, {} as Record<string, string>);

  // console.log(categoriesMap);

  // Creo el producto en la DB primero sin imágenes y sin type (porque ahora tendrá el mapeo a su categoría), y luego dentro de la iteración creo las imágenes.
  //Productos

  products.forEach(async (product) => {
    const { type, images, ...rest } = product;
    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type],
      },
    });

    //Images
    const imagesData = images.map((image) => ({
      url: image,
      productId: dbProduct.id,
    }));
    await prisma.productImage.createMany({
      data: imagesData,
    });
  });

  console.log(products);
  //Países

  await prisma.country.createMany({
    data: countries,
  });

  console.log("Seed ejecutado correctamente");
}

(() => {
  main();
})();
