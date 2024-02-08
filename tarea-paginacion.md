# Tarea:

1. Cambiar la ruta: `category/[id]` por `gender/[gender]`
2. Obtener el genero por URL (Tip: Props... searchParams) (similar al page.tsx)
3. Mandar el gender a la función de `getPaginatedProductsWithImages`, para que filtre por genero
4. TypeScript se va a quejar, pero pueden hacer el casteo como "as Gender", y "Gender" lo toman de `import { Gender } from '@prisma/client';`
5. Módifiquen la función de FindMany, para que use el filtro así

```
const products = await prisma.product.findMany( {
  include: {
    ProductImage: {
      take: 2, // solo tomar 2 imagenes
      select: {
        url: true
      },
    },
  },
  skip: ( page - 1 ) * take,
  take: take,

  //! Por género
  where: {
    gender: gender
  }
} );
```

7. No olviden, que también el contador de productos debe de ser por género.
8. Implementen la páginación también en el filtro por género.
9. Al final, prueben que funcione, y que no se rompa nada.

