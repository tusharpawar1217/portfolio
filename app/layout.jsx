import "./globals.css";

import Header from "@/components/Header";
import ScrollReveal from "@/components/ScrollReveal";
import SplashCursor from "@/components/SplashCursor";

export const metadata = {
  title: "Tushar Pawar | ML Engineer & Data Scientist",
  description:
    "Portfolio of Tushar Pawar — M.Tech candidate specializing in Deep Learning, Applied ML, and Full-Stack Development. Seeking ML Engineer, Data Scientist, or Data Engineer roles.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>

        {/* Subtle bottom-left Prussian blue depth */}
        <div
          aria-hidden="true"
          className="ambient-glow fixed -bottom-52 -left-52 w-[520px] h-[520px] bg-[#0e4391] opacity-20 z-0"
        />

        <SplashCursor
          SIM_RESOLUTION={128}
          DYE_RESOLUTION={1024}
          DENSITY_DISSIPATION={1.45}
          VELOCITY_DISSIPATION={0.55}
          PRESSURE={0.8}
          CURL={24}
          SPLAT_RADIUS={0.16}
          SPLAT_FORCE={4800}
          COLOR_UPDATE_SPEED={10}
        />
        <ScrollReveal />
        <Header />
        <main id="main-content" className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
