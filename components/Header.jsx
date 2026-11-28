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
        scrolled ? "scrolled py-2 xl:py-2.5" : "py-3 xl:py-3.5"
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

        {/* Far-right emblem badge + CTA */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <div
            className="flex flex-col items-center justify-center px-2.5 py-1 rounded-lg bg-[#0b4ca6]/10 border border-[#0b4ca6]/30 text-[#093e8a] leading-none"
            aria-label="Tushar Pawar Monogram"
          >
            <span className="text-xs font-extrabold tracking-widest">TP</span>
            <span className="text-[7px] font-bold tracking-[0.2em] uppercase mt-0.5">AI • ML</span>
          </div>
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
