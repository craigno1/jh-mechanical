import type { ImgHTMLAttributes } from 'react';
import manifest from '@/assets/optimized/manifest.json';

// Vite resolves the same hashed, base-prefixed URLs in the browser and SSR build.
const urls = import.meta.glob<string>('../assets/optimized/**/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
});

const images = new Map(
  Object.entries(manifest).map(([filename, image]) => {
    const src = urls[`../assets/optimized/${filename}`];
    const candidates = [
      ...image.variants.map(variant => {
        const url = urls[`../assets/optimized/${variant.file}`];
        if (!url) throw new Error(`Missing responsive image: ${variant.file}`);
        return `${url} ${variant.width}w`;
      }),
      `${src} ${image.width}w`,
    ];
    if (!src) throw new Error(`Missing photograph: ${filename}`);
    return [src, { ...image, srcSet: candidates.join(', ') }] as const;
  }),
);

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'width' | 'height'> & {
  src: string;
  sizes: string;
};

/** Keep every photo's full frame; existing CSS remains responsible for its crop. */
export function ResponsiveImage({ src, sizes, loading = 'lazy', decoding = 'async', ...props }: Props) {
  const image = images.get(src);
  if (!image) throw new Error(`No responsive metadata for photograph: ${src}`);
  return (
    <img
      {...props}
      src={src}
      srcSet={image.srcSet}
      sizes={sizes}
      width={image.width}
      height={image.height}
      loading={loading}
      decoding={decoding}
    />
  );
}
