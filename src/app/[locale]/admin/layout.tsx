// Simple passthrough — auth is handled by (protected)/layout.tsx
export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
