"use client";

const links = [
  { name: "About", path: "#about" },
  { name: "Skills", path: "#skills" },
  { name: "Projects", path: "#projects" },
  { name: "Experience", path: "#experience" },
  { name: "Awards", path: "#awards" },
  { name: "Contact", path: "#contact" },
];

const Nav = () => {
  const handleClick = (e, path) => {
    e.preventDefault();
    const element = document.querySelector(path);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav aria-label="Primary navigation" className="flex items-center gap-7 xl:gap-8">
      {links.map((link, index) => (
        <a
          href={link.path}
          key={index}
          onClick={(e) => handleClick(e, link.path)}
          className="nav-link"
        >
          {link.name}
        </a>
      ))}
    </nav>
  );
};

export default Nav;
