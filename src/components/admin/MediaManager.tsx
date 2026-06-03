"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { formatSize, type MediaItem } from "./MediaPicker";

const mont = "var(--font-montserrat), sans-serif";
type Filter = "all" | "image" | "file";

function splitName(name: string) {
  const i = name.lastIndexOf(".");
  return i >= 0 ? { base: name.slice(0, i), ext: name.slice(i) } : { base: name, ext: "" };
}

export default function MediaManager() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [detail, setDetail] = useState<MediaItem | null>(null);
  const [busy, setBusy] = useState(false);
  const [renaming, setRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  function closeDetail() {
    setDetail(null);
    setRenaming(false);
  }

  function startRename(item: MediaItem) {
    setRenameValue(splitName(item.name).base);
    setRenaming(true);
  }

  async function renameItem(target: MediaItem) {
    const base = renameValue.trim();
    if (!base) return;
    setBusy(true);
    setError(null);
    try {
      const r = await fetch("/api/admin/media", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bucket: target.bucket, path: target.path, name: base }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Rename failed");
      const updated = { ...target, ...d.item };
      setItems((prev) => prev.map((it) => (it.id === target.id ? updated : it)));
      setDetail(updated);
      setRenaming(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch("/api/admin/media");
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Failed to load media");
      setItems(d.items ?? []);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const visible = items.filter((it) => filter === "all" || it.type === filter);

  function toggle(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || !files.length) return;
    setUploading(true);
    setError(null);
    try {
      const fd = new FormData();
      Array.from(files).forEach((f) => fd.append("files", f));
      const r = await fetch("/api/admin/media", { method: "POST", body: fd });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Upload failed");
      await load();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function deleteItems(targets: MediaItem[]) {
    if (!targets.length) return;
    const label = targets.length === 1 ? `"${targets[0].name}"` : `${targets.length} files`;
    if (!confirm(`Delete ${label}? This cannot be undone. Products using ${targets.length === 1 ? "it" : "them"} will lose the attachment.`)) return;
    setBusy(true);
    setError(null);
    try {
      const r = await fetch("/api/admin/media", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: targets.map((t) => ({ bucket: t.bucket, path: t.path })) }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Delete failed");
      const removed = new Set(targets.map((t) => t.id));
      setItems((prev) => prev.filter((it) => !removed.has(it.id)));
      setSelectedIds(new Set());
      setDetail(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  const selectedItems = items.filter((it) => selectedIds.has(it.id));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "2rem", color: "white", margin: 0 }}>Media</h1>
          <p style={{ fontFamily: mont, fontSize: "0.78rem", color: "rgba(255,255,255,0.4)", marginTop: "0.25rem" }}>
            Central library — upload once, reuse anywhere.
          </p>
        </div>
        <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
          style={{ padding: "0.6rem 1.25rem", background: "#fc8855", borderRadius: "0.5rem", border: "none", color: "white", fontFamily: mont, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", cursor: uploading ? "wait" : "pointer" }}>
          {uploading ? "Uploading…" : "↑ Upload files"}
        </button>
        <input ref={fileRef} type="file" multiple
          accept="image/*,.pdf,.mp3,.mp4,.zip,.m4a,.wav,.epub" onChange={handleUpload} style={{ display: "none" }} />
      </div>

      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem", flexWrap: "wrap", gap: "0.75rem" }}>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {(["all", "image", "file"] as Filter[]).map((f) => (
            <button key={f} type="button" onClick={() => setFilter(f)}
              style={{
                padding: "0.4rem 0.9rem", borderRadius: "999px", cursor: "pointer",
                border: filter === f ? "1px solid rgba(252,136,85,0.4)" : "1px solid rgba(163,141,81,0.2)",
                background: filter === f ? "rgba(252,136,85,0.12)" : "transparent",
                color: filter === f ? "#fc8855" : "rgba(255,255,255,0.45)",
                fontFamily: mont, fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase",
              }}>
              {f === "all" ? "All" : f === "image" ? "Images" : "Files"}
            </button>
          ))}
        </div>
        {selectedIds.size > 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span style={{ fontFamily: mont, fontSize: "0.72rem", color: "rgba(255,255,255,0.5)" }}>{selectedIds.size} selected</span>
            <button type="button" onClick={() => setSelectedIds(new Set())}
              style={{ padding: "0.4rem 0.8rem", background: "transparent", border: "1px solid rgba(163,141,81,0.2)", borderRadius: "0.4rem", color: "rgba(255,255,255,0.45)", fontFamily: mont, fontSize: "0.7rem", fontWeight: 600, cursor: "pointer" }}>Clear</button>
            <button type="button" disabled={busy} onClick={() => deleteItems(selectedItems)}
              style={{ padding: "0.4rem 0.9rem", background: "rgba(220,38,38,0.15)", border: "1px solid rgba(220,38,38,0.35)", borderRadius: "0.4rem", color: "#fca5a5", fontFamily: mont, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", cursor: busy ? "wait" : "pointer" }}>
              Delete {selectedIds.size}
            </button>
          </div>
        )}
      </div>

      {error && (
        <div style={{ marginBottom: "1rem", padding: "0.7rem 1rem", background: "rgba(220,38,38,0.15)", border: "1px solid rgba(220,38,38,0.3)", borderRadius: "0.5rem", color: "#fca5a5", fontFamily: mont, fontSize: "0.78rem" }}>{error}</div>
      )}

      {/* Grid */}
      {loading ? (
        <p style={{ fontFamily: mont, fontSize: "0.85rem", color: "rgba(255,255,255,0.4)" }}>Loading…</p>
      ) : visible.length === 0 ? (
        <div style={{ padding: "4rem 2rem", textAlign: "center", border: "1px dashed rgba(163,141,81,0.2)", borderRadius: "1rem" }}>
          <p style={{ fontFamily: mont, fontSize: "0.9rem", color: "rgba(255,255,255,0.4)" }}>No media here yet.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "1rem" }}>
          {visible.map((it) => {
            const checked = selectedIds.has(it.id);
            return (
              <div key={it.id}
                style={{
                  position: "relative", borderRadius: "0.7rem", overflow: "hidden",
                  border: checked ? "2px solid #fc8855" : "2px solid rgba(163,141,81,0.15)",
                  background: "rgba(255,255,255,0.04)",
                }}>
                {/* Checkbox */}
                <label style={{ position: "absolute", top: "0.5rem", left: "0.5rem", zIndex: 2, cursor: "pointer" }}
                  onClick={(e) => e.stopPropagation()}>
                  <input type="checkbox" checked={checked} onChange={() => toggle(it.id)}
                    style={{ width: 18, height: 18, accentColor: "#fc8855", cursor: "pointer" }} />
                </label>
                <button type="button" onClick={() => { setDetail(it); setRenaming(false); }} title={it.name}
                  style={{ display: "block", width: "100%", padding: 0, border: "none", background: "transparent", cursor: "pointer", textAlign: "left" }}>
                  <div style={{ aspectRatio: "1 / 1", width: "100%", background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                    {it.type === "image" && it.url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={it.url} alt={it.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <span style={{ fontSize: "2.5rem" }}>📄</span>
                    )}
                  </div>
                  <div style={{ padding: "0.5rem 0.6rem" }}>
                    <p style={{ fontFamily: mont, fontSize: "0.66rem", color: "rgba(255,255,255,0.7)", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{it.name}</p>
                    <p style={{ fontFamily: mont, fontSize: "0.58rem", color: "rgba(255,255,255,0.3)", margin: 0 }}>{it.type === "image" ? "Image" : "File"} · {formatSize(it.size)}</p>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Detail modal */}
      {detail && (
        <div onClick={closeDetail}
          style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(2px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
          <div onClick={(e) => e.stopPropagation()}
            style={{ width: "min(680px, 100%)", maxHeight: "85vh", overflowY: "auto", background: "#1a160e", border: "1px solid rgba(163,141,81,0.25)", borderRadius: "1rem", padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem", gap: "1rem" }}>
              {renaming ? (
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "stretch", gap: "0.5rem" }}>
                    <input
                      autoFocus
                      value={renameValue}
                      onChange={(e) => setRenameValue(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); renameItem(detail); } if (e.key === "Escape") setRenaming(false); }}
                      style={{ flex: 1, minWidth: 0, padding: "0.5rem 0.75rem", borderRadius: "0.5rem", border: "1px solid rgba(163,141,81,0.35)", background: "rgba(255,255,255,0.06)", color: "white", fontFamily: mont, fontSize: "0.85rem", outline: "none" }}
                    />
                    <span style={{ display: "flex", alignItems: "center", fontFamily: mont, fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }}>{splitName(detail.name).ext}</span>
                  </div>
                  <p style={{ fontFamily: mont, fontSize: "0.62rem", color: "rgba(255,255,255,0.3)", margin: "0.4rem 0 0" }}>
                    Renaming changes the file’s link — products using it will lose the attachment.
                  </p>
                </div>
              ) : (
                <h3 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "1.2rem", color: "white", margin: 0, wordBreak: "break-all" }}>{detail.name}</h3>
              )}
              <button type="button" onClick={closeDetail} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: "1.4rem", cursor: "pointer", lineHeight: 1, flexShrink: 0 }}>×</button>
            </div>

            <div style={{ borderRadius: "0.6rem", overflow: "hidden", background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 160, marginBottom: "1rem" }}>
              {detail.type === "image" && detail.url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={detail.url} alt={detail.name} style={{ maxWidth: "100%", maxHeight: 360, objectFit: "contain" }} />
              ) : (
                <span style={{ fontSize: "4rem", padding: "2rem" }}>📄</span>
              )}
            </div>

            <dl style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "0.4rem 1rem", fontFamily: mont, fontSize: "0.75rem", margin: 0 }}>
              <dt style={{ color: "rgba(255,255,255,0.35)" }}>Type</dt>
              <dd style={{ color: "rgba(255,255,255,0.7)", margin: 0 }}>{detail.mimetype ?? (detail.type === "image" ? "image" : "file")}</dd>
              <dt style={{ color: "rgba(255,255,255,0.35)" }}>Size</dt>
              <dd style={{ color: "rgba(255,255,255,0.7)", margin: 0 }}>{formatSize(detail.size) || "—"}</dd>
              <dt style={{ color: "rgba(255,255,255,0.35)" }}>Storage</dt>
              <dd style={{ color: "rgba(255,255,255,0.7)", margin: 0, wordBreak: "break-all" }}>{detail.bucket}/{detail.path}</dd>
            </dl>

            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem", paddingTop: "1.25rem", borderTop: "1px solid rgba(163,141,81,0.12)", flexWrap: "wrap" }}>
              {renaming ? (
                <>
                  <button type="button" disabled={busy || !renameValue.trim()} onClick={() => renameItem(detail)}
                    style={{ padding: "0.6rem 1.25rem", background: busy || !renameValue.trim() ? "rgba(252,136,85,0.4)" : "#fc8855", border: "none", borderRadius: "0.5rem", color: "white", fontFamily: mont, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", cursor: busy ? "wait" : "pointer" }}>
                    {busy ? "Saving…" : "Save name"}
                  </button>
                  <button type="button" disabled={busy} onClick={() => setRenaming(false)}
                    style={{ padding: "0.6rem 1.25rem", border: "1px solid rgba(163,141,81,0.2)", borderRadius: "0.5rem", background: "transparent", color: "rgba(255,255,255,0.5)", fontFamily: mont, fontSize: "0.75rem", fontWeight: 600, cursor: "pointer" }}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button type="button" onClick={() => startRename(detail)}
                    style={{ padding: "0.6rem 1.25rem", border: "1px solid rgba(163,141,81,0.3)", borderRadius: "0.5rem", background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.7)", fontFamily: mont, fontSize: "0.75rem", fontWeight: 600, cursor: "pointer" }}>
                    ✎ Rename
                  </button>
                  {detail.url && (
                    <a href={detail.url} target="_blank" rel="noreferrer"
                      style={{ padding: "0.6rem 1.25rem", border: "1px solid rgba(163,141,81,0.2)", borderRadius: "0.5rem", color: "rgba(255,255,255,0.6)", fontFamily: mont, fontSize: "0.75rem", fontWeight: 600, textDecoration: "none" }}>
                      Open ↗
                    </a>
                  )}
                  <button type="button" disabled={busy} onClick={() => deleteItems([detail])}
                    style={{ padding: "0.6rem 1.25rem", background: "rgba(220,38,38,0.15)", border: "1px solid rgba(220,38,38,0.35)", borderRadius: "0.5rem", color: "#fca5a5", fontFamily: mont, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", cursor: busy ? "wait" : "pointer" }}>
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
