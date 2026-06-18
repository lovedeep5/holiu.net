import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <div className="text-6xl mb-4">🌊</div>
      <h1 className="font-serif text-3xl text-brand-ink mb-3">Page not found</h1>
      <p className="font-sans text-brand-clay max-w-md mb-6">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link href="/" className="btn-primary">
        Back to Home
      </Link>
    </div>
  );
}