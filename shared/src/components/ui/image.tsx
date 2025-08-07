import NextImage from 'next/image';

interface Image {
  src: string;
  width?: number;
  height?: number;
  alt: string;
  className?: string;
}

export const Image: React.FC<Image> = ({
  src,
  width,
  className,
  height,
  alt,
  ...props
}: Image) => {
  return (
    <NextImage
      className={className}
      src={
        src == 'http://shwegate.com'
          ? '/upload/images/profile_outline.png'
          : src
      }
      width={width || 0}
      height={height || 0}
      alt={alt}
      {...props}
    />
  );
};
