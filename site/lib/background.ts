/**
 * CSS backgrounds never pass through next/image, so they would ship as raw
 * JPEGs. `image-set()` lets modern browsers take the WebP (roughly a third of
 * the weight) while anything older still gets the original file.
 */
export function backgroundImageSet(src: string) {
  const webp = src.replace(/\.(jpe?g|png)$/i, ".webp");
  if (webp === src) return `url("${src}")`;
  return `image-set(url("${webp}") type("image/webp"), url("${src}") type("image/jpeg"))`;
}
