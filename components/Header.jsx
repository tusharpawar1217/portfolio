"use client";

import { useEffect, useState } from "react";
import Nav from "./Nav";
import MobileNav from "./MobileNav";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 w-full metallic-header ${
        scrolled ? "scrolled py-2.5 xl:py-3" : "py-4 xl:py-5"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center gap-6 px-4 md:px-6">
        {/* Logo on the left */}
        <a
          href="#hero"
          className="flex items-center gap-3 hover:opacity-85 transition-opacity duration-300 shrink-0"
        >
          <span className="text-xl xl:text-2xl font-bold tracking-tight text-[var(--header-text)]">
            TP<span className="text-[var(--accent)]">.</span>
          </span>
          <div className="hidden sm:flex flex-col border-l border-[#04142c]/25 pl-3 gap-0.5 leading-none">
            <span className="text-[10px] font-semibold tracking-wider text-[var(--header-text)] uppercase">
              Beyond Visuals
            </span>
            <span className="text-[9px] font-medium tracking-wider text-[var(--header-muted)] uppercase">
              Built with Visions
            </span>
          </div>
        </a>

        {/* Nav links in center/right */}
        <div className="hidden lg:flex items-center gap-8">
          <Nav />
        </div>

        {/* Far-right badge / CTA */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#04142c]/25 bg-white/70 text-[var(--header-text)] text-xs font-semibold tracking-wide"
            aria-label="Portfolio role badge"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
            ML • DS
          </span>
          <a href="#contact" className="pill-btn pill-btn-magenta text-sm py-2 px-5">
            Let&apos;s Talk
          </a>
        </div>

        {/* Mobile nav trigger */}
        <div className="lg:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
