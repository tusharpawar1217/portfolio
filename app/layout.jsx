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

        {/* Bottom-left ambient Prussian blue glow */}
        <div
          aria-hidden="true"
          className="ambient-glow fixed -bottom-44 -left-44 w-[580px] h-[580px] bg-[#1453ad] z-0"
        />

        <SplashCursor
          SIM_RESOLUTION={128}
          DYE_RESOLUTION={1600}
          DENSITY_DISSIPATION={0.75}
          VELOCITY_DISSIPATION={0.5}
          PRESSURE={0.75}
          CURL={35}
          SPLAT_RADIUS={0.32}
          SPLAT_FORCE={6500}
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
