import Image from "next/image";

interface Props {
  src?: string;
  alt: string;
  className?: React.StyleHTMLAttributes<HTMLImageElement>["className"];
  style?: React.StyleHTMLAttributes<HTMLImageElement>["style"];
  width: number;
  height: number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const ProductImage = ({
  src,
  alt,
  className,
  style,
  width,
  height,
  onMouseEnter,
  onMouseLeave,
}: Props) => {
  const localSrc = src
    ? src.startsWith("http") // Comprueba si la cadena src comienza con "http"// https://urlcompletodelaimagen.jpg
      ? src // Si es verdadero, asigna src a localSrc
      : `/products/${src}` // Si es falso, concatena "/products/" con src y asigna a localSrc
    : "/imgs/placeholder.jpg"; // Si src no existe, asigna "/img/placeholder.jpg" a localSrc

  return (
    <Image
      src={localSrc}
      width={width}
      height={height}
      alt={alt}
      className={className}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
};
