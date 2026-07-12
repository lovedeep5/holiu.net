// Images live in the public "thumbnails" bucket; everything else (digital
// products) lives in the private "digital-products" bucket.
export const IMAGE_BUCKET = "thumbnails";
export const FILE_BUCKET = "digital-products";

export function sanitizeBase(name: string) {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function sanitizeName(name: string) {
  const dot = name.lastIndexOf(".");
  const ext = dot >= 0 ? name.slice(dot).toLowerCase() : "";
  const base = sanitizeBase(dot >= 0 ? name.slice(0, dot) : name) || "file";
  return `${base}-${Date.now()}${ext}`;
}
