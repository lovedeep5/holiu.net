"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { uploadMediaFile } from "@/lib/media-upload";

export type MediaItem = {
  id: string;
  bucket: string;
  path: string;
  name: string;
  url: string | null;
  mimetype: string | null;
  size: number | null;
  createdAt: string | null;
  type: "image" | "file";
};

export function formatSize(bytes: number | null) {
  if (!bytes && bytes !== 0) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

const mont = "var(--font-montserrat), sans-serif";

interface Props {
  type: "image" | "file";
  onSelect: (item: MediaItem) => void;
  onClose: () => void;
}

export default function MediaPicker({ type, onSelect, onClose }: Props) {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<MediaItem | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async (): Promise<MediaItem[]> => {
    setLoading(true);
    try {
      const r = await fetch(`/api/admin/media?type=${type}`);
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Failed to load media");
      const loaded: MediaItem[] = d.items ?? [];
      setItems(loaded);
      return loaded;
    } catch (e: any) {
      setError(e.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [type]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || !files.length) return;
    setUploading(true);
    setError(null);
    const errors: string[] = [];
    let firstUploaded: { bucket: string; path: string } | null = null;
    for (const file of Array.from(files)) {
      try {
        const uploaded = await uploadMediaFile(file);
        if (!firstUploaded) firstUploaded = uploaded;
      } catch (err: any) {
        errors.push(err.message);
      }
    }
    const freshItems = await load();
    if (firstUploaded) {
      const match = freshItems.find((it) => it.bucket === firstUploaded!.bucket && it.path === firstUploaded!.path);
      if (match) setSelected(match);
    }
    if (errors.length) setError(errors.join("; "));
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.6)", backdropFilter: "blur(2px)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(900px, 100%)", maxHeight: "85vh", display: "flex", flexDirection: "column",
          background: "#1a160e", border: "1px solid rgba(163,141,81,0.25)", borderRadius: "1rem", overflow: "hidden",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.25rem 1.5rem", borderBottom: "1px solid rgba(163,141,81,0.12)" }}>
          <h3 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "1.25rem", color: "white", margin: 0 }}>
            Select {type === "image" ? "Image" : "File"}
          </h3>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
            <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
              style={{ padding: "0.5rem 1rem", background: "#a38d51", border: "none", borderRadius: "0.5rem", color: "white", fontFamily: mont, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", cursor: uploading ? "wait" : "pointer" }}>
              {uploading ? "Uploading…" : "↑ Upload new"}
            </button>
            <input ref={fileRef} type="file" multiple
              accept={type === "image" ? "image/*" : ".pdf,.mp3,.mp4,.zip,.m4a,.wav,.epub"}
              onChange={handleUpload} style={{ display: "none" }} />
            <button type="button" onClick={onClose}
              style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: "1.4rem", cursor: "pointer", lineHeight: 1 }}>×</button>
          </div>
        </div>

        {error && (
          <div style={{ margin: "1rem 1.5rem 0", padding: "0.7rem 1rem", background: "rgba(220,38,38,0.15)", border: "1px solid rgba(220,38,38,0.3)", borderRadius: "0.5rem", color: "#fca5a5", fontFamily: mont, fontSize: "0.78rem" }}>{error}</div>
        )}

        {/* Grid */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem" }}>
          {loading ? (
            <p style={{ fontFamily: mont, fontSize: "0.85rem", color: "rgba(255,255,255,0.4)" }}>Loading…</p>
          ) : items.length === 0 ? (
            <p style={{ fontFamily: mont, fontSize: "0.85rem", color: "rgba(255,255,255,0.4)" }}>No media yet. Upload your first file.</p>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: "0.85rem" }}>
              {items.map((it) => {
                const active = selected?.id === it.id;
                return (
                  <button key={it.id} type="button" onClick={() => setSelected(it)} title={it.name}
                    style={{
                      position: "relative", display: "flex", flexDirection: "column", padding: 0,
                      borderRadius: "0.6rem", overflow: "hidden", cursor: "pointer", textAlign: "left",
                      border: active ? "2px solid #fc8855" : "2px solid rgba(163,141,81,0.15)",
                      background: "rgba(255,255,255,0.04)",
                    }}>
                    <div style={{ aspectRatio: "1 / 1", width: "100%", background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                      {it.type === "image" && it.url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={it.url} alt={it.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <span style={{ fontSize: "2rem" }}>📄</span>
                      )}
                    </div>
                    <div style={{ padding: "0.4rem 0.5rem" }}>
                      <p style={{ fontFamily: mont, fontSize: "0.62rem", color: "rgba(255,255,255,0.7)", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{it.name}</p>
                      <p style={{ fontFamily: mont, fontSize: "0.55rem", color: "rgba(255,255,255,0.3)", margin: 0 }}>{formatSize(it.size)}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 1.5rem", borderTop: "1px solid rgba(163,141,81,0.12)" }}>
          <p style={{ fontFamily: mont, fontSize: "0.72rem", color: "rgba(255,255,255,0.4)", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "60%" }}>
            {selected ? selected.name : "No selection"}
          </p>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button type="button" onClick={onClose}
              style={{ padding: "0.6rem 1.25rem", border: "1px solid rgba(163,141,81,0.2)", borderRadius: "0.5rem", background: "transparent", color: "rgba(255,255,255,0.5)", fontFamily: mont, fontSize: "0.75rem", fontWeight: 600, cursor: "pointer" }}>Cancel</button>
            <button type="button" disabled={!selected} onClick={() => selected && onSelect(selected)}
              style={{ padding: "0.6rem 1.5rem", background: selected ? "#fc8855" : "rgba(252,136,85,0.35)", border: "none", borderRadius: "0.5rem", color: "white", fontFamily: mont, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", cursor: selected ? "pointer" : "not-allowed" }}>Use this {type === "image" ? "image" : "file"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
