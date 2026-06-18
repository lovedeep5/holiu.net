"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-brand-cream">
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
      </body>
    </html>
  );
}