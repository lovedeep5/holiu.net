"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <div className="text-6xl mb-4">🌸</div>
      <h1 className="font-serif text-3xl text-brand-ink mb-3">Something went wrong</h1>
      <p className="font-sans text-brand-clay max-w-md mb-6">
        We apologize for the inconvenience. Please try refreshing the page.
      </p>
      <button
        onClick={reset}
        className="btn-primary"
      >
        Try again
      </button>
    </div>
  );
}