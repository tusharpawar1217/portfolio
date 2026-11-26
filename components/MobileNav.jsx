"use client";

import { useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const links = [
  { name: "About", path: "#about" },
  { name: "Skills", path: "#skills" },
  { name: "Projects", path: "#projects" },
  { name: "Experience", path: "#experience" },
  { name: "Awards", path: "#awards" },
  { name: "Contact", path: "#contact" },
];

const MobileNav = () => {
  const [open, setOpen] = useState(false);

  const handleClick = (e, path) => {
    e.preventDefault();
    setOpen(false);
    const element = document.querySelector(path);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Open navigation menu"
        className="flex justify-center items-center p-2 rounded-lg text-[var(--header-text)] hover:bg-black/5 transition-colors"
      >
        <CiMenuFries className="text-[28px]" />
      </SheetTrigger>
      <SheetContent className="flex flex-col bg-[#0d0b1e] border-l border-[rgba(123,92,255,0.28)]">
        <div className="mt-16 mb-12 text-center">
          <a href="#hero" onClick={(e) => handleClick(e, "#hero")}>
            <span className="text-2xl font-bold text-white">
              Tushar<span className="text-[var(--accent)]">.</span>
            </span>
          </a>
        </div>

        <nav aria-label="Mobile navigation" className="flex flex-col justify-center items-center gap-6">
          {links.map((link, index) => (
            <a
              href={link.path}
              key={index}
              onClick={(e) => handleClick(e, link.path)}
              className="text-lg font-medium text-[var(--muted)] hover:text-[var(--accent-hover)] transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="mt-auto mb-8 flex justify-center">
          <a
            href="#contact"
            onClick={(e) => handleClick(e, "#contact")}
            className="pill-btn pill-btn-magenta"
          >
            Let&apos;s Talk
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
