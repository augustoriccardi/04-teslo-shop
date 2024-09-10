# Descripción

## Correr en dev

1. Clonar el repositorio.
2. Crear una copia del `.env.template` y renombrarlo a `.env` y cambiar las variables de entorno.
3. Instalar dependencias `npm install`
4. Levantar la base de datos `docker compose up -d` (abrir Docker Desktop antes)
5. Correr las migraciones de Primsa ```npx prisma migrate dev (-n <nombre>)````
6. Ejecutar seed `npm run seed`
7. Limpiar el localStorage del navegador.
8. Correr el proyecto `npm run dev`

## Correr en prod

1. En Vercel ir a Storage y crear una Postgres DB. En el acrvhivo .env colocar crear variable DATABASE_URL, pegar el string de conexión (psql)
2. `npx prisma migrate deploy`, para subir los modelos a Prisma Cloud.
3. `npm run seed` para crear los seeds de producción.

