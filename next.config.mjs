//Permitir dominios para el consumo de imágenes https://nextjs.org/docs/messages/next-image-unconfigured-host

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
