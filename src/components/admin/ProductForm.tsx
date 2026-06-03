"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { Product } from "@/types/database";
import MediaPicker, { type MediaItem } from "./MediaPicker";

const DEFAULT_CATEGORIES = ["Courses", "Workshops", "Meditations", "Chakra Balancing", "Channeling"];

function toSlug(name: string) {
  return name.toLowerCase().trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

interface Props { product?: Product; }

export default function ProductForm({ product }: Props) {
  const router = useRouter();
  const isEdit = !!product;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [slug, setSlug] = useState(product?.slug ?? "");
  const [slugManual, setSlugManual] = useState(isEdit);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [digitalFile, setDigitalFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(product?.thumbnail_url ?? null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(product?.thumbnail_url ?? null);
  const [filePath, setFilePath] = useState<string | null>(product?.file_path ?? null);
  const [fileName, setFileName] = useState<string | null>(product?.file_path ?? null);
  const [picker, setPicker] = useState<null | "image" | "file">(null);
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState(product?.category ?? DEFAULT_CATEGORIES[0]);
  const [newCategory, setNewCategory] = useState("");
  const [addingCategory, setAddingCategory] = useState(false);

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!slugManual) setSlug(toSlug(e.target.value));
  }

  function handleAddCategory() {
    const trimmed = newCategory.trim();
    if (!trimmed || categories.includes(trimmed)) return;
    setCategories((prev) => [...prev, trimmed]);
    setSelectedCategory(trimmed);
    setNewCategory("");
    setAddingCategory(false);
  }

  function handleThumbnailChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setThumbnailFile(file);
    setThumbnailPreview(URL.createObjectURL(file));
  }

  function removeThumbnail() {
    setThumbnailFile(null);
    setThumbnailPreview(null);
    setThumbnailUrl(null);
  }

  function handleDigitalChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setDigitalFile(file);
    setFileName(file?.name ?? filePath);
  }

  function removeDigitalFile() {
    setDigitalFile(null);
    setFilePath(null);
    setFileName(null);
  }

  function handlePick(item: MediaItem) {
    if (picker === "image") {
      setThumbnailFile(null);
      setThumbnailUrl(item.url);
      setThumbnailPreview(item.url);
    } else {
      setDigitalFile(null);
      setFilePath(item.path);
      setFileName(item.name);
    }
    setPicker(null);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const form = e.currentTarget;
      const get = (n: string) => (form.elements.namedItem(n) as HTMLInputElement)?.value ?? "";
      const payload: Record<string, unknown> = {
        slug,
        name_en: get("name_en"),
        name_de: get("name_de") || null,
        description_en: get("description_en") || null,
        description_de: get("description_de") || null,
        category: selectedCategory,
        price: Math.round(parseFloat(get("price")) * 100),
        featured: (form.elements.namedItem("featured") as HTMLInputElement)?.checked ?? false,
        published: (form.elements.namedItem("published") as HTMLInputElement)?.checked ?? true,
      };
      // Resolve thumbnail: newly uploaded file > picked/existing URL > null (removed).
      // New uploads go through the media library so they're reusable later.
      let finalThumbnail = thumbnailUrl;
      if (thumbnailFile) {
        const fd = new FormData();
        fd.append("files", thumbnailFile);
        const r = await fetch("/api/admin/media", { method: "POST", body: fd });
        const d = await r.json();
        if (!r.ok) throw new Error(d.error || "Thumbnail upload failed");
        finalThumbnail = d.items?.[0]?.url ?? null;
      }
      payload.thumbnail_url = finalThumbnail;

      // Resolve digital file the same way.
      let finalFilePath = filePath;
      if (digitalFile) {
        const fd = new FormData();
        fd.append("files", digitalFile);
        const r = await fetch("/api/admin/media", { method: "POST", body: fd });
        const d = await r.json();
        if (!r.ok) throw new Error(d.error || "File upload failed");
        finalFilePath = d.items?.[0]?.path ?? null;
      }
      payload.file_path = finalFilePath;
      const url = isEdit ? `/api/admin/products/${product!.id}` : "/api/admin/products";
      const res = await fetch(url, { method: isEdit ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      router.push("/en/admin/products");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const inp: React.CSSProperties = {
    width: "100%", padding: "0.75rem 1rem", borderRadius: "0.5rem",
    border: "1px solid rgba(163,141,81,0.2)", background: "rgba(255,255,255,0.06)",
    color: "white", fontFamily: "var(--font-montserrat), sans-serif",
    fontSize: "0.9rem", outline: "none", boxSizing: "border-box",
  };
  const lbl: React.CSSProperties = {
    display: "block", marginBottom: "0.5rem",
    fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.7rem",
    fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#a38d51",
  };
  const pickBtn: React.CSSProperties = {
    padding: "0.5rem 0.9rem", borderRadius: "0.5rem", cursor: "pointer",
    border: "1px solid rgba(163,141,81,0.3)", background: "rgba(255,255,255,0.04)",
    color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-montserrat), sans-serif",
    fontSize: "0.72rem", fontWeight: 600,
  };
  const pickBtnPrimary: React.CSSProperties = {
    ...pickBtn, border: "1px solid rgba(252,136,85,0.4)", background: "rgba(252,136,85,0.1)", color: "#fc8855",
  };
  const removeBtn: React.CSSProperties = {
    ...pickBtn, border: "1px solid rgba(220,38,38,0.3)", background: "rgba(220,38,38,0.08)", color: "#fca5a5",
  };
  const hint: React.CSSProperties = {
    marginTop: "0.4rem", fontFamily: "var(--font-montserrat), sans-serif",
    fontSize: "0.7rem", color: "rgba(255,255,255,0.35)", wordBreak: "break-all",
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div style={{ marginBottom: "1.5rem", padding: "0.875rem 1rem", background: "rgba(220,38,38,0.15)", border: "1px solid rgba(220,38,38,0.3)", borderRadius: "0.5rem", color: "#fca5a5", fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.8rem" }}>
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <label style={lbl}>Name (EN) *</label>
            <input name="name_en" type="text" required defaultValue={product?.name_en} onChange={handleNameChange} style={inp} />
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.5rem" }}>
              <span style={{ ...lbl, marginBottom: 0 }}>Slug *</span>
              <span style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.6rem", color: "rgba(255,255,255,0.3)" }}>auto-generated · editable</span>
            </div>
            <input name="slug" type="text" required value={slug}
              onChange={(e) => { setSlug(e.target.value); setSlugManual(true); }}
              style={{ ...inp, color: slugManual ? "white" : "rgba(255,255,255,0.5)" }}
              placeholder="e.g. sun-meditation" />
          </div>

          <div>
            <label style={lbl}>Name (DE)</label>
            <input name="name_de" type="text" defaultValue={product?.name_de ?? ""} style={inp} />
          </div>

          <div>
            <label style={lbl}>Description (EN)</label>
            <textarea name="description_en" rows={4} defaultValue={product?.description_en ?? ""} style={{ ...inp, resize: "vertical" }} />
          </div>

          <div>
            <label style={lbl}>Description (DE)</label>
            <textarea name="description_de" rows={4} defaultValue={product?.description_de ?? ""} style={{ ...inp, resize: "vertical" }} />
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
              <span style={{ ...lbl, marginBottom: 0 }}>Category *</span>
              <button type="button" onClick={() => setAddingCategory((v) => !v)}
                style={{ fontSize: "0.65rem", color: "#fc8855", background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 700, padding: 0 }}>
                {addingCategory ? "← Back" : "+ New category"}
              </button>
            </div>
            {addingCategory ? (
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <input type="text" value={newCategory} placeholder="New category name"
                  onChange={(e) => setNewCategory(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddCategory(); } }}
                  style={{ ...inp, flex: 1 }} autoFocus />
                <button type="button" onClick={handleAddCategory}
                  style={{ padding: "0 1rem", background: "#a38d51", border: "none", borderRadius: "0.5rem", color: "white", fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.75rem", fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>
                  Add
                </button>
              </div>
            ) : (
              <select name="category" required value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} style={{ ...inp, background: "#1e1810" }}>
                {categories.map((c) => <option key={c} value={c} style={{ background: "#1e1810", color: "white" }}>{c}</option>)}
              </select>
            )}
          </div>

          <div>
            <label style={lbl}>Price (€) *</label>
            <input name="price" type="number" required step="0.01" min="0"
              defaultValue={product ? (product.price / 100).toFixed(2) : ""}
              style={inp} placeholder="e.g. 22.00" />
          </div>

          <div style={{ display: "flex", gap: "1.5rem" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
              <input name="featured" type="checkbox" defaultChecked={product?.featured ?? false} style={{ accentColor: "#fc8855" }} />
              <span style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.6)" }}>Featured</span>
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
              <input name="published" type="checkbox" defaultChecked={product?.published ?? true} style={{ accentColor: "#fc8855" }} />
              <span style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.6)" }}>Published</span>
            </label>
          </div>

          <div>
            <label style={lbl}>Thumbnail Image</label>
            {thumbnailPreview && (
              <div style={{ marginBottom: "0.75rem", borderRadius: "0.5rem", overflow: "hidden", width: 120, height: 120, position: "relative", background: "rgba(255,255,255,0.05)" }}>
                <Image src={thumbnailPreview} alt="preview" fill style={{ objectFit: "cover" }} unoptimized />
              </div>
            )}
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <button type="button" onClick={() => setPicker("image")} style={pickBtnPrimary}>◳ Choose from Media</button>
              <label style={pickBtn}>
                Upload new
                <input type="file" accept="image/*" onChange={handleThumbnailChange} style={{ display: "none" }} />
              </label>
              {thumbnailPreview && (
                <button type="button" onClick={removeThumbnail} style={removeBtn}>Remove</button>
              )}
            </div>
            {thumbnailFile && <p style={hint}>New upload: {thumbnailFile.name}</p>}
          </div>

          <div>
            <label style={lbl}>Digital File (PDF / MP3 / ZIP)</label>
            {fileName && (
              <p style={{ ...hint, marginTop: 0, marginBottom: "0.6rem", color: "rgba(255,255,255,0.6)" }}>📄 {fileName}</p>
            )}
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <button type="button" onClick={() => setPicker("file")} style={pickBtnPrimary}>◳ Choose from Media</button>
              <label style={pickBtn}>
                Upload new
                <input type="file" accept=".pdf,.mp3,.mp4,.zip,.m4a,.wav,.epub"
                  onChange={handleDigitalChange} style={{ display: "none" }} />
              </label>
              {fileName && (
                <button type="button" onClick={removeDigitalFile} style={removeBtn}>Remove</button>
              )}
            </div>
          </div>
        </div>
      </div>

      {picker && (
        <MediaPicker type={picker} onSelect={handlePick} onClose={() => setPicker(null)} />
      )}

      <div style={{ display: "flex", gap: "1rem", marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(163,141,81,0.1)" }}>
        <button type="submit" disabled={loading}
          style={{ padding: "0.75rem 2rem", background: loading ? "rgba(252,136,85,0.4)" : "#fc8855", border: "none", borderRadius: "0.5rem", color: "white", fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer" }}>
          {loading ? "Saving…" : isEdit ? "Save Changes" : "Create Product"}
        </button>
        <a href="/en/admin/products"
          style={{ padding: "0.75rem 1.5rem", border: "1px solid rgba(163,141,81,0.2)", borderRadius: "0.5rem", color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.8rem", fontWeight: 600, textDecoration: "none" }}>
          Cancel
        </a>
      </div>
    </form>
  );
}
