import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center px-6 text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-wide text-slate-500">
          Error 404
        </p>
        <h1 className="mb-3 text-4xl font-bold text-slate-900">Page not found</h1>
        <p className="mb-8 max-w-xl text-base text-slate-600">
          The page you requested does not exist or may have been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center rounded-md bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Go to home
        </Link>
      </section>
    </main>
  );
}
