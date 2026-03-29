"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { Product } from "@/types/database";

const CATEGORIES = ["Courses", "Workshops", "Meditations", "Chakra Balancing", "Channeling"];

interface Props {
  product?: Product;
}

export default function ProductForm({ product }: Props) {
  const router = useRouter();
  const isEdit = !!product;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [digitalFile, setDigitalFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(
    product?.thumbnail_url ?? null
  );

  function handleThumbnailChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setThumbnailFile(file);
    setThumbnailPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const form = e.currentTarget;
      const get = (name: string) => (form.elements.namedItem(name) as HTMLInputElement)?.value ?? "";

      const payload: Record<string, unknown> = {
        slug: get("slug"),
        name_en: get("name_en"),
        name_de: get("name_de") || null,
        description_en: get("description_en") || null,
        description_de: get("description_de") || null,
        category: get("category"),
        price: Math.round(parseFloat(get("price")) * 100),
        featured: (form.elements.namedItem("featured") as HTMLInputElement)?.checked ?? false,
        published: (form.elements.namedItem("published") as HTMLInputElement)?.checked ?? true,
      };

      // Upload thumbnail if provided
      if (thumbnailFile) {
        const fd = new FormData();
        fd.append("file", thumbnailFile);
        fd.append("bucket", "thumbnails");
        fd.append("path", `${get("slug")}-${Date.now()}${thumbnailFile.name.substring(thumbnailFile.name.lastIndexOf("."))}`);
        const uploadRes = await fetch("/api/admin/upload", { method: "POST", body: fd });
        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) throw new Error(uploadData.error || "Thumbnail upload failed");
        payload.thumbnail_url = uploadData.url;
      }

      // Upload digital file if provided
      if (digitalFile) {
        const fd = new FormData();
        fd.append("file", digitalFile);
        fd.append("bucket", "digital-products");
        fd.append("path", `${get("slug")}-${Date.now()}${digitalFile.name.substring(digitalFile.name.lastIndexOf("."))}`);
        const uploadRes = await fetch("/api/admin/upload", { method: "POST", body: fd });
        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) throw new Error(uploadData.error || "File upload failed");
        payload.file_path = uploadData.path;
      }

      const url = isEdit ? `/api/admin/products/${product!.id}` : "/api/admin/products";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

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

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.75rem 1rem",
    borderRadius: "0.5rem",
    border: "1px solid rgba(163,141,81,0.2)",
    background: "rgba(255,255,255,0.06)",
    color: "white",
    fontFamily: "var(--font-montserrat), sans-serif",
    fontSize: "0.9rem",
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    marginBottom: "0.5rem",
    fontFamily: "var(--font-montserrat), sans-serif",
    fontSize: "0.7rem",
    fontWeight: 600,
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    color: "#a38d51",
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div style={{
          marginBottom: "1.5rem",
          padding: "0.875rem 1rem",
          background: "rgba(220,38,38,0.15)",
          border: "1px solid rgba(220,38,38,0.3)",
          borderRadius: "0.5rem",
          color: "#fca5a5",
          fontFamily: "var(--font-montserrat), sans-serif",
          fontSize: "0.8rem",
        }}>
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <label style={labelStyle}>Slug *</label>
            <input name="slug" type="text" required defaultValue={product?.slug} style={inputStyle} placeholder="e.g. sun-meditation" />
          </div>

          <div>
            <label style={labelStyle}>Name (EN) *</label>
            <input name="name_en" type="text" required defaultValue={product?.name_en} style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>Name (DE)</label>
            <input name="name_de" type="text" defaultValue={product?.name_de ?? ""} style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>Description (EN)</label>
            <textarea
              name="description_en"
              rows={4}
              defaultValue={product?.description_en ?? ""}
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </div>

          <div>
            <label style={labelStyle}>Description (DE)</label>
            <textarea
              name="description_de"
              rows={4}
              defaultValue={product?.description_de ?? ""}
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <label style={labelStyle}>Category *</label>
            <select name="category" required defaultValue={product?.category ?? "Courses"} style={inputStyle}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label style={labelStyle}>Price (€) *</label>
            <input
              name="price"
              type="number"
              required
              step="0.01"
              min="0"
              defaultValue={product ? (product.price / 100).toFixed(2) : ""}
              style={inputStyle}
              placeholder="e.g. 22.00"
            />
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

          {/* Thumbnail upload */}
          <div>
            <label style={labelStyle}>Thumbnail Image</label>
            {thumbnailPreview && (
              <div style={{ marginBottom: "0.75rem", borderRadius: "0.5rem", overflow: "hidden", width: 120, height: 120, position: "relative", background: "rgba(255,255,255,0.05)" }}>
                <Image src={thumbnailPreview} alt="Thumbnail preview" fill style={{ objectFit: "cover" }} unoptimized />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              style={{ ...inputStyle, padding: "0.5rem" }}
            />
            {product?.thumbnail_url && !thumbnailFile && (
              <p style={{ marginTop: "0.35rem", fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.7rem", color: "rgba(255,255,255,0.3)" }}>
                Current: {product.thumbnail_url}
              </p>
            )}
          </div>

          {/* Digital file upload */}
          <div>
            <label style={labelStyle}>Digital File (PDF / MP3 / ZIP)</label>
            <input
              type="file"
              accept=".pdf,.mp3,.mp4,.zip,.m4a,.wav"
              onChange={(e) => setDigitalFile(e.target.files?.[0] ?? null)}
              style={{ ...inputStyle, padding: "0.5rem" }}
            />
            {product?.file_path && !digitalFile && (
              <p style={{ marginTop: "0.35rem", fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.7rem", color: "rgba(255,255,255,0.3)" }}>
                Current: {product.file_path}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: "1rem", marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(163,141,81,0.1)" }}>
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "0.75rem 2rem",
            background: loading ? "rgba(252,136,85,0.4)" : "#fc8855",
            border: "none",
            borderRadius: "0.5rem",
            color: "white",
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "0.8rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Saving…" : isEdit ? "Save Changes" : "Create Product"}
        </button>
        <a
          href="/en/admin/products"
          style={{
            padding: "0.75rem 1.5rem",
            border: "1px solid rgba(163,141,81,0.2)",
            borderRadius: "0.5rem",
            color: "rgba(255,255,255,0.4)",
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "0.8rem",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Cancel
        </a>
      </div>
    </form>
  );
}
