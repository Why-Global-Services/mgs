import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white text-raya-ink flex flex-col justify-between">
      <Navbar />
      <div className="mx-auto max-w-xl px-6 py-32 text-center">
        <h1 className="font-serif text-6xl font-black text-[#073042]">404</h1>
        <h2 className="mt-4 text-2xl font-bold text-[#0a3d2e]">Page Not Found</h2>
        <p className="mt-3 text-raya-muted">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="mt-8">
          <a
            href="/"
            className="inline-flex min-h-11 items-center justify-center rounded-sm bg-[#9c182f] px-8 text-sm font-bold uppercase tracking-wider text-white shadow transition hover:bg-[#801326]"
          >
            Return Home ?
          </a>
        </div>
      </div>
      <Footer />
    </main>
  );
}
