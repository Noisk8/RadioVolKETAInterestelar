// Mapeo de slugs a importaciones de imágenes
const imageImports = import.meta.glob('../../../public/images/metadata/*.{jpeg,jpg,png,webp}', {
  eager: true,
  as: 'url'
});

export function getImageUrl(slug: string): string | null {
  const imagePath = `../../../public/images/metadata/${slug}.jpeg`;
  return imageImports[imagePath] || null;
}
