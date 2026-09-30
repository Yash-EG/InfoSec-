// src/components/Navbar.tsx
import { useEffect, useState } from "react";
import { club, navLinks } from "../data/site";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={[
        "sticky top-0 z-50 transition-colors duration-200",
        scrolled
          ? "border-b border-edge bg-ink/85 backdrop-blur-md"
          : "border-b border-transparent",
      ].join(" ")}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8"
      >
        <a
          href="#top"
          className="group font-mono text-sm font-semibold tracking-tight text-white"
        >
          <span className="text-mint">root@uncg</span>
          <span className="text-muted">:</span>
          <span className="text-cyan">~/infosec</span>
          <span className="text-muted group-hover:text-mint">$</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-md px-3 py-2 font-mono text-sm text-neutral-300 transition-colors hover:bg-panel-2 hover:text-mint"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="ml-2">
            <a
              href={club.discord}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-md bg-mint px-4 py-2 font-mono text-sm font-semibold text-ink transition-colors hover:bg-mint-dim"
            >
              Join Discord
            </a>
          </li>
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="rounded-md border border-edge p-2 text-neutral-200 md:hidden"
        >
          <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden="true">
            {open ? (
              <path
                d="M5 5l10 10M15 5L5 15"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M3 6h14M3 10h14M3 14h14"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-edge bg-ink/95 backdrop-blur-md md:hidden"
        >
          <ul className="mx-auto max-w-6xl px-5 py-3">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-3 font-mono text-sm text-neutral-200 hover:bg-panel-2 hover:text-mint"
                >
                  <span className="text-muted select-none">→ </span>
                  {l.label}
                </a>
              </li>
            ))}
            <li className="px-3 pt-2 pb-4">
              <a
                href={club.discord}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => setOpen(false)}
                className="block rounded-md bg-mint px-4 py-3 text-center font-mono text-sm font-semibold text-ink"
              >
                Join Discord
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
