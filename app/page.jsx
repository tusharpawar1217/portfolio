"use client";

import { useEffect, useRef } from "react";
import Social from "@/components/Social";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaCertificate,
  FaTrophy,
  FaGithub,
  FaPython,
  FaJava,
  FaReact,
  FaGit,
  FaDocker,
  FaAws,
  FaLinux,
  FaFigma,
  FaArrowDown,
} from "react-icons/fa";
import {
  SiPytorch,
  SiOpencv,
  SiScikitlearn,
  SiFastapi,
  SiFlask,
  SiSpringboot,
  SiNextdotjs,
  SiTailwindcss,
  SiMysql,
  SiPostgresql,
  SiPostman,
  SiJavascript,
  SiCplusplus,
  SiGooglecloud,
} from "react-icons/si";
import { BsArrowUpRight } from "react-icons/bs";
import Link from "next/link";

/* ───────────────────────── DATA ───────────────────────── */

const skills = {
  languages: [
    { icon: <FaPython />, name: "Python" },
    { icon: <FaJava />, name: "Java" },
    { icon: <SiJavascript />, name: "JavaScript" },
    { icon: <SiCplusplus />, name: "C++" },
  ],
  aiml: [
    { icon: <SiPytorch />, name: "PyTorch" },
    { icon: <SiScikitlearn />, name: "Scikit-learn" },
    { icon: <SiOpencv />, name: "OpenCV" },
    { icon: <span className="text-lg font-bold">T</span>, name: "Tesseract" },
    { icon: <span className="text-lg font-bold">L</span>, name: "Librosa" },
    { icon: <span className="text-sm font-bold">NLP</span>, name: "NLP" },
  ],
  webFrameworks: [
    { icon: <SiFastapi />, name: "FastAPI" },
    { icon: <SiFlask />, name: "Flask" },
    { icon: <SiSpringboot />, name: "Spring Boot" },
    { icon: <FaReact />, name: "React.js" },
    { icon: <SiNextdotjs />, name: "Next.js" },
    { icon: <SiTailwindcss />, name: "Tailwind CSS" },
  ],
  tools: [
    { icon: <FaGit />, name: "Git" },
    { icon: <FaGithub />, name: "GitHub" },
    { icon: <FaDocker />, name: "Docker" },
    { icon: <SiPostman />, name: "Postman" },
    { icon: <FaLinux />, name: "Linux" },
    { icon: <FaFigma />, name: "Figma" },
    { icon: <FaAws />, name: "AWS" },
    { icon: <SiGooglecloud />, name: "GCP" },
    { icon: <SiMysql />, name: "MySQL" },
    { icon: <SiPostgresql />, name: "PostgreSQL" },
  ],
};

const allSkillNames = [
  ...skills.languages.map((s) => s.name),
  ...skills.aiml.map((s) => s.name),
  ...skills.webFrameworks.map((s) => s.name),
  ...skills.tools.map((s) => s.name),
];

const featuredHeroStack = [
  { icon: <SiPytorch />, name: "PyTorch" },
  { icon: <FaPython />, name: "Python" },
  { icon: <SiNextdotjs />, name: "Next.js" },
  { icon: <SiFastapi />, name: "FastAPI" },
  { icon: <FaDocker />, name: "Docker" },
  { icon: <FaAws />, name: "AWS" },
];

const projects = [
  {
    num: "01",
    title: "DOT Digital Certificate Platform",
    description:
      "Production certificate-management system for SPPU's Department of Technology built with Next.js 14, TypeScript, and MongoDB Atlas. Automated credential generation, distribution, and public verification end-to-end.",
    stack: ["Next.js 14", "TypeScript", "MongoDB", "Supabase", "pdf-lib"],
    github: "https://github.com/tusharpawar1217",
    live: null,
    metrics: ["400+ verified certificates issued", "Sub-500ms PDF generation", "JWT session auth"],
  },
  {
    num: "02",
    title: "BeautyBloom Studio E-Commerce",
    description:
      "Full-stack e-commerce platform implementing Domain-Driven Design with Spring Boot and React TypeScript. Architected 40+ RESTful API endpoints for catalog, cart, and order management.",
    stack: ["Spring Boot", "React", "TypeScript", "MySQL", "Stripe"],
    github: "https://github.com/tusharpawar1217",
    live: null,
    metrics: ["40+ REST API endpoints", "Handles 1000+ concurrent users", "Firebase OAuth"],
  },
  {
    num: "03",
    title: "Artsoll — Art E-Commerce UI/UX",
    description:
      "Designed intuitive art marketplace connecting artists with collectors through minimalist interface. Implemented distraction-free gallery grids and interactive artwork previews.",
    stack: ["Figma", "Adobe CC", "UI/UX Design", "Prototyping"],
    github: null,
    live: "https://www.behance.net/gallery/156272515/Artsoll-Website",
    metrics: ["40% increase in engagement", "65% checkout completion", "A/B tested 500+ users"],
  },
  {
    num: "04",
    title: "OCR Document Intelligence System",
    description:
      "End-to-end OCR pipeline with advanced image preprocessing using OpenCV. Achieved 25% improvement in text extraction accuracy on degraded documents with sub-100ms latency.",
    stack: ["FastAPI", "Tesseract", "OpenCV", "React", "PostgreSQL"],
    github: "https://github.com/tusharpawar1217",
    live: null,
    metrics: ["25% accuracy improvement", "Sub-100ms processing", "10K+ docs/day"],
  },
  {
    num: "05",
    title: "Audio Deepfake Detection (SwarParikshak)",
    description:
      "CNN-BiLSTM-Attention architecture fusing LFCC and Mel-spectrogram features for multilingual audio deepfake detection. 0.91% EER and 98.77% validation accuracy.",
    stack: ["PyTorch", "Librosa", "Whisper", "Python"],
    github: "https://github.com/tusharpawar1217",
    live: null,
    metrics: ["0.91% Equal Error Rate", "98.77% accuracy", "34,700+ audio samples"],
  },
  {
    num: "06",
    title: "AI-Powered Interview Platform",
    description:
      "AI recruitment platform with LLM-based semantic answer scoring and emotion detection for automated HR and technical interviews. Resume-parsing ATS pipeline with WebSocket live feedback.",
    stack: ["NLP", "FastAPI", "React", "WebSockets", "SQL"],
    github: "https://github.com/tusharpawar1217",
    live: null,
    metrics: ["LLM semantic scoring", "Real-time WebSocket feedback", "Resume parsing ATS"],
  },
];

const experience = [
  {
    role: "OCR Research Intern",
    company: "Research Project",
    duration: "2024",
    description:
      "Led the research and development of an intelligent OCR system for extracting text from CIV boards and multilingual documents. Evaluated and integrated multiple state-of-the-art OCR engines, then architected a complete end-to-end pipeline that handles everything from image upload to final translated output.",
    responsibilities: [
      "Researched and compared 7 leading OCR engines (Tesseract, EasyOCR, PaddleOCR, Surya OCR, Chandra OCR, GOT-OCR2.0, DeepSeek-OCR) to identify the best fit for different document types and languages",
      "Designed and built a complete data pipeline: user uploads image → interactive cropping tool → image preprocessing (denoising, CLAHE, thresholding) → OCR extraction → manual correction interface → translation to 15+ languages",
      "Implemented smart language detection using pytesseract OSD that automatically identifies Hindi, English, and other Indian scripts, eliminating manual language selection",
      "Solved complex technical challenges including Python version conflicts by architecting a subprocess system that runs PaddleOCR in an isolated Python 3.10 environment with proper UTF-8 encoding",
      "Created an intuitive Streamlit interface where users can crop specific text regions, preview preprocessing effects in real-time, compare OCR results, correct extracted text, and export translations",
      "Identified Chandra OCR as the best-performing model among all evaluated engines, particularly excelling at structured document extraction, while PaddleOCR proved most reliable for complex Hindi text",
    ],
    stack: ["Python", "OpenCV", "Tesseract", "PyTorch", "Streamlit", "SQLite", "Deep Translator"],
    achievements: [
      "Production-ready system with multiple OCR engine integrations for CPU and GPU environments",
      "Automatic language detection for Indian languages with high accuracy",
      "Complete Unicode support for Devanagari and Indic scripts with zero encoding errors",
      "End-to-end pipeline from upload to final translated output with database storage",
    ],
  },
];

const education = [
  {
    degree: "M.Tech in Computer & Information Technology",
    institution: "Department Of Technology, SPPU, Pune",
    duration: "June 2026",
    result: "CGPA: 9.36 (Academic Topper)",
    icon: <FaGraduationCap />,
  },
  {
    degree: "B.E. in Information Technology",
    institution: "Dr. D Y Patil College Of Engineering, SPPU, Pune",
    duration: "June 2024",
    result: "CGPA: 8.44",
    icon: <FaGraduationCap />,
  },
];

const certifications = [
  {
    title: "DevOps Engineering",
    details: "AWS, Docker, Kubernetes, Jenkins, Terraform",
    date: "TuteDude",
  },
  {
    title: "Java Full Stack Development",
    details: "Java, Spring Boot, Hibernate, HTML/CSS/JS, MySQL",
    date: "Oct 2024",
  },
  {
    title: "Google UX Design Specialization",
    details: "Wireframing, Prototyping, UX Research",
    date: "Nov 2022",
  },
];

const achievements = [
  {
    title: "Student Coordinator",
    description:
      "Organized campus hackathons and technical events, handling planning and logistics for 200+ participants.",
  },
  {
    title: "Academic Lead",
    description:
      "Led project teams for core assignments, managed task distribution and delivered high-quality work by deadlines.",
  },
];

/* ────────────────── SECTION COMPONENTS ────────────────── */

/* ═══ 1. HERO ═══ */
const HeroSection = () => {
  const heroRef = useRef(null);
  const desktopPhotoRef = useRef(null);
  const mobilePhotoRef = useRef(null);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;

    let mouseX = 0;
    let mouseY = 0;
    let scrollOffset = 0;
    let rafId = null;

    const updateTransform = () => {
      // Subtle 2-3% opposite parallax from mouse + scroll
      const tx = -mouseX * 18;
      const ty = -mouseY * 14 - scrollOffset * 18;
      [desktopPhotoRef.current, mobilePhotoRef.current].forEach((el) => {
        if (el) {
          el.style.setProperty("--px", `${tx.toFixed(2)}px`);
          el.style.setProperty("--py", `${ty.toFixed(2)}px`);
        }
      });
      rafId = null;
    };

    const scheduleUpdate = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(updateTransform);
      }
    };

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      scheduleUpdate();
    };

    const handleScroll = () => {
      const hero = heroRef.current;
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      const progress = Math.max(-1, Math.min(1, -rect.top / Math.max(rect.height, 1)));
      scrollOffset = progress;
      scheduleUpdate();
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative overflow-hidden min-h-[calc(100vh-76px)] pt-14 md:pt-20 pb-0 flex flex-col justify-between border-b border-[rgba(78,134,235,0.24)]"
    >
      {/* Ambient radial glows: rich dark Prussian blue + magenta highlight behind cutout */}
      <div
        aria-hidden="true"
        className="ambient-glow -top-32 -left-32 w-[520px] h-[520px] bg-[#1453ad]"
      />
      <div
        aria-hidden="true"
        className="ambient-glow top-1/4 left-1/3 w-[420px] h-[420px] bg-[#0d3b82]"
      />
      <div
        aria-hidden="true"
        className="ambient-glow bottom-0 right-4 lg:right-16 w-[420px] h-[420px] bg-[#e91e8c]"
      />
      <div
        aria-hidden="true"
        className="ambient-glow bottom-16 right-28 lg:right-48 w-[420px] h-[420px] bg-[#1d63c8]"
      />

      <div className="container mx-auto px-4 md:px-6 relative z-20 flex-1 flex flex-col justify-between">
        {/* Main Hero Content Grid */}
        <div className="relative flex-1 flex flex-col lg:flex-row lg:items-center pt-4 pb-8 lg:pb-12">
          {/* Left Half: Text, Badge, CTAs */}
          <div className="w-full lg:w-[60%] xl:w-[58%] text-left relative z-20">
            {/* Two-Tone Hero Headline */}
            <h1 className="hero-headline mb-6">
              <span className="block text-white hero-line-1">
                Hi, I&apos;m Tushar Pawar
              </span>
              <span className="block text-[var(--accent)] hero-line-2">
                ML Engineer &amp; Data Scientist
              </span>
            </h1>

            {/* Outlined Pill / Badge Row */}
            <div className="flex flex-wrap items-center gap-3 mb-6 hero-stagger-3">
              <span className="text-sm md:text-base font-medium text-[var(--muted)]">
                Beyond visuals, built with vision
              </span>
              <div className="status-badge">
                <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse-green" />
                <span>Open to Work</span>
                <span className="text-[var(--muted)] text-xs">• Pune, India</span>
              </div>
            </div>

            {/* Subtitle */}
            <p className="text-base md:text-lg text-[var(--muted)] max-w-xl mb-8 leading-relaxed hero-stagger-3">
              Building intelligent systems,{" "}
              <span className="text-white font-medium">
                data pipelines, and full-stack applications
              </span>{" "}
              with precision, innovation and impact.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-8 hero-stagger-4">
              <a href="#contact" className="pill-btn pill-btn-magenta">
                Hire Me <BsArrowUpRight className="text-sm" />
              </a>
              <a href="#about" className="pill-btn pill-btn-outline">
                Explore <FaArrowDown className="text-xs" />
              </a>
            </div>

            {/* Social Icons */}
            <div className="hero-stagger-4">
              <Social />
            </div>
          </div>

          {/* Right Half (Mobile/Tablet inline fallback) */}
          <div className="mt-10 lg:mt-0 lg:hidden flex justify-center relative z-10">
            <div className="hero-image-enter">
              <div ref={mobilePhotoRef} className="hero-parallax-img relative w-[270px] sm:w-[330px]">
                <img
                  src="/photo.png"
                  alt="Tushar Pawar portrait cutout"
                  className="w-full h-auto object-contain drop-shadow-[0_18px_40px_rgba(233,30,140,0.28)]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* "Presented by"-style Bottom Tech Stack Row */}
        <div className="relative z-20 pb-8 pt-4 lg:w-[62%]">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--muted)] mb-3.5">
            Core Stack &amp; Platforms:
          </p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {featuredHeroStack.map((item, idx) => (
              <div key={item.name} className="flex items-center gap-4 sm:gap-6">
                <div className="flex items-center gap-2 text-white/90 hover:text-white transition-colors">
                  <span className="text-lg sm:text-xl text-white">{item.icon}</span>
                  <span className="text-sm sm:text-base font-semibold tracking-tight">
                    {item.name}
                  </span>
                </div>
                {idx < featuredHeroStack.length - 1 && (
                  <div className="stack-divider" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Cutout Photo Anchored Bottom-Right Overlapping Section Edge */}
      <div className="hidden lg:block absolute -bottom-2 right-2 xl:right-10 w-[390px] xl:w-[450px] z-10 pointer-events-none select-none">
        <div className="hero-image-enter">
          <div
            ref={desktopPhotoRef}
            className="hero-parallax-img relative"
          >
            <img
              src="/photo.png"
              alt="Tushar Pawar portrait cutout"
              className="w-full h-auto object-contain drop-shadow-[0_24px_50px_rgba(13,11,30,0.85)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══ 2. ABOUT ═══ */
const AboutSection = () => {
  return (
    <section id="about" className="section-padding">
      <div className="container mx-auto max-w-6xl">
        <p className="section-label scroll-reveal">{"// ABOUT ME"}</p>

        <h2 className="section-heading mb-14 scroll-reveal">
          BUILDING <span className="accent">SOLUTIONS,</span>
          <br />
          SOLVING PROBLEMS WITH DATA.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {/* About Text — spans 2 cols */}
          <div className="bento-card md:col-span-2 xl:col-span-2 scroll-reveal">
            <p className="text-[var(--muted)] leading-[1.85] text-[0.98rem] mb-4">
              I&apos;m a passionate <span className="text-white font-medium">M.Tech candidate</span> specializing in Deep
              Learning and applied ML. With hands-on experience in building and evaluating
              CNN-BiLSTM-Attention architectures, I thrive on solving complex problems with data-driven approaches.
            </p>
            <p className="text-[var(--muted)] leading-[1.85] text-[0.98rem]">
              Proficient in <span className="text-white font-medium">Python, PyTorch, SQL</span>, and building end-to-end ML
              pipelines from data preprocessing through model evaluation. Currently seeking{" "}
              <span className="text-[var(--accent-hover)] font-medium">
                Machine Learning Engineer, Data Scientist, or Data Engineer
              </span>{" "}
              roles.
            </p>
          </div>

          {/* Education Card */}
          <div className="bento-card scroll-reveal">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[rgba(233,30,140,0.14)] border border-[rgba(233,30,140,0.3)] flex items-center justify-center text-[var(--accent-hover)]">
                <FaGraduationCap />
              </div>
              <h3 className="font-bold text-lg text-white">Education</h3>
            </div>
            <div className="space-y-5">
              {education.map((edu, i) => (
                <div key={i} className="border-l-2 border-[var(--accent-2)] pl-4">
                  <p className="text-white font-medium text-sm">{edu.degree}</p>
                  <p className="text-[var(--muted)] text-xs mt-1">{edu.institution}</p>
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <span className="text-[var(--accent-hover)] text-xs font-mono font-medium">
                      {edu.duration}
                    </span>
                    <span className="text-white/85 text-xs">{edu.result}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Row */}
          {[
            { num: "06", label: "Production Systems\nShipped" },
            { num: "9.36", label: "M.Tech CGPA\nAcademic Topper" },
            { num: "03", label: "Professional\nCertifications" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bento-card flex flex-col justify-center items-center text-center py-8 scroll-reveal"
            >
              <div className="stat-number">{stat.num}</div>
              <div className="stat-label whitespace-pre-line">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══ 3. SKILLS ═══ */
const SkillsSection = () => {
  const categories = [
    { title: "Languages", items: skills.languages },
    { title: "AI / ML", items: skills.aiml },
    { title: "Web & Frameworks", items: skills.webFrameworks },
    { title: "Tools & Cloud", items: skills.tools },
  ];

  return (
    <section id="skills" className="section-padding">
      <div className="container mx-auto max-w-6xl">
        <p className="section-label scroll-reveal">{"// TECH STACK"}</p>

        <h2 className="section-heading mb-6 scroll-reveal">
          TOOLS OF THE <span className="accent">TRADE.</span>
        </h2>

        {/* Marquee */}
        <div className="overflow-hidden mb-14 -mx-4 md:-mx-8 scroll-reveal">
          <div className="marquee-track">
            {[...allSkillNames, ...allSkillNames].map((name, i) => (
              <span key={i} className="marquee-item">
                {name}
                <span className="text-[rgba(78,134,235,0.4)] mx-4">•</span>
              </span>
            ))}
          </div>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {categories.map((cat, catIdx) => (
            <div key={catIdx} className="bento-card scroll-reveal">
              <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--muted)] mb-5">
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {cat.items.map((skill, i) => (
                  <div key={i} className="tech-tag group">
                    <span className="text-base text-white/90 group-hover:text-[var(--accent-hover)] transition-colors">
                      {skill.icon}
                    </span>
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══ 4. PROJECTS ═══ */
const ProjectsSection = () => {
  return (
    <section id="projects" className="section-padding">
      <div className="container mx-auto max-w-6xl">
        <p className="section-label scroll-reveal">{"// SELECTED WORK"}</p>

        <h2 className="section-heading mb-14 scroll-reveal">
          PROJECTS THAT
          <br />
          <span className="accent">MAKE AN IMPACT.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project, index) => (
            <div key={index} className="project-card scroll-reveal">
              <div className="project-num">/{project.num}</div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.description}</p>

              {/* Stack Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.stack.map((tech, i) => (
                  <span key={i} className="tech-tag text-xs">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Metrics */}
              <div className="space-y-2 mb-5">
                {project.metrics.map((metric, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[var(--muted)]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                    <span>{metric}</span>
                  </div>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-3 mt-auto pt-4 border-t border-[rgba(78,134,235,0.22)]">
                {project.github && (
                  <Link
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[rgba(29,99,200,0.18)] hover:bg-[rgba(233,30,140,0.2)] border border-[rgba(78,134,235,0.36)] hover:border-[var(--accent)] transition-all duration-300 text-white text-xs font-medium"
                  >
                    <FaGithub className="text-sm" />
                    <span>GitHub</span>
                  </Link>
                )}
                {project.live && (
                  <Link
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pill-btn pill-btn-magenta py-2 px-4 text-xs"
                  >
                    <BsArrowUpRight className="text-sm" />
                    <span>Live</span>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══ 5. EXPERIENCE ═══ */
const ExperienceSection = () => {
  return (
    <section id="experience" className="section-padding">
      <div className="container mx-auto max-w-6xl">
        <p className="section-label scroll-reveal">{"// EXPERIENCE"}</p>

        <h2 className="section-heading mb-14 scroll-reveal">
          WHERE I&apos;VE <span className="accent">WORKED.</span>
        </h2>

        <div className="space-y-5">
          {experience.map((exp, index) => (
            <div key={index} className="bento-card scroll-reveal">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div>
                  <h3 className="font-bold text-xl text-white mb-1">{exp.role}</h3>
                  <p className="text-[var(--accent-hover)] text-sm font-medium">{exp.company}</p>
                </div>
                <div className="status-badge w-fit">
                  <div className="w-2 h-2 bg-[var(--accent)] rounded-full" />
                  <span className="text-xs font-mono text-white">{exp.duration}</span>
                </div>
              </div>

              <p className="text-[var(--muted)] text-sm leading-relaxed mb-6">{exp.description}</p>

              {/* Key Responsibilities */}
              <div className="mb-6">
                <h4 className="text-white/85 text-xs uppercase tracking-wider font-mono mb-3">
                  Key Responsibilities
                </h4>
                <ul className="space-y-2">
                  {exp.responsibilities.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[var(--muted)] text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-2 flex-shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div className="mb-6">
                <h4 className="text-white/85 text-xs uppercase tracking-wider font-mono mb-3">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {exp.stack.map((tech, i) => (
                    <span key={i} className="tech-tag text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Achievements */}
              <div className="pt-6 border-t border-[rgba(78,134,235,0.22)]">
                <h4 className="text-white/85 text-xs uppercase tracking-wider font-mono mb-3">
                  Key Achievements
                </h4>
                <div className="space-y-2">
                  {exp.achievements.map((achievement, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-[var(--muted)]">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══ 6. AWARDS & CERTIFICATIONS ═══ */
const AwardsSection = () => {
  return (
    <section id="awards" className="section-padding">
      <div className="container mx-auto max-w-6xl">
        <p className="section-label scroll-reveal">{"// RECOGNITION"}</p>

        <h2 className="section-heading mb-14 scroll-reveal">
          WINS WORTH <span className="accent">FRAMING.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Achievements */}
          <div className="bento-card scroll-reveal">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[rgba(233,30,140,0.14)] border border-[rgba(233,30,140,0.3)] flex items-center justify-center text-[var(--accent-hover)]">
                <FaTrophy />
              </div>
              <h3 className="font-bold text-lg text-white">Achievements</h3>
            </div>
            <div className="space-y-5">
              {achievements.map((item, i) => (
                <div key={i} className="border-l-2 border-[var(--accent-2)] pl-4">
                  <p className="text-white font-medium text-sm">{item.title}</p>
                  <p className="text-[var(--muted)] text-xs mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="bento-card scroll-reveal">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[rgba(233,30,140,0.14)] border border-[rgba(233,30,140,0.3)] flex items-center justify-center text-[var(--accent-hover)]">
                <FaCertificate />
              </div>
              <h3 className="font-bold text-lg text-white">Certifications</h3>
            </div>
            <div className="space-y-5">
              {certifications.map((cert, i) => (
                <div key={i} className="border-l-2 border-[var(--accent-2)] pl-4">
                  <p className="text-white font-medium text-sm">{cert.title}</p>
                  <p className="text-[var(--muted)] text-xs mt-1">{cert.details}</p>
                  <span className="text-[var(--accent-hover)] text-xs font-mono mt-2 inline-block">
                    {cert.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══ 7. FOOTER ═══ */
const FooterSection = () => {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden py-20 px-4 md:px-8 border-t border-[rgba(78,134,235,0.26)] bg-[#020c1d]"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Get in Touch */}
          <div>
            <h3 className="font-bold text-lg text-white mb-4">
              Get in Touch<span className="text-[var(--accent)]">.</span>
            </h3>
            <div className="space-y-3">
              <a
                href="tel:+918485833673"
                className="flex items-center gap-2.5 text-[var(--muted)] hover:text-[var(--accent-hover)] transition-colors text-sm"
              >
                <FaPhoneAlt className="text-xs text-[var(--accent-2)]" />
                <span>+91 84858 33673</span>
              </a>
              <a
                href="mailto:pawartushar8485@gmail.com"
                className="flex items-center gap-2.5 text-[var(--muted)] hover:text-[var(--accent-hover)] transition-colors text-sm"
              >
                <FaEnvelope className="text-xs text-[var(--accent-2)]" />
                <span>pawartushar8485@gmail.com</span>
              </a>
              <div className="flex items-center gap-2.5 text-[var(--muted)] text-sm">
                <FaMapMarkerAlt className="text-xs text-[var(--accent-2)]" />
                <span>Pune, Maharashtra - 411007</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg text-white mb-4">
              Quick Links<span className="text-[var(--accent)]">.</span>
            </h3>
            <div className="space-y-2">
              <a
                href="#about"
                className="block text-[var(--muted)] hover:text-[var(--accent-hover)] transition-colors text-sm"
              >
                About
              </a>
              <a
                href="#skills"
                className="block text-[var(--muted)] hover:text-[var(--accent-hover)] transition-colors text-sm"
              >
                Skills
              </a>
              <a
                href="#projects"
                className="block text-[var(--muted)] hover:text-[var(--accent-hover)] transition-colors text-sm"
              >
                Projects
              </a>
              <a
                href="#experience"
                className="block text-[var(--muted)] hover:text-[var(--accent-hover)] transition-colors text-sm"
              >
                Experience
              </a>
              <a
                href="#awards"
                className="block text-[var(--muted)] hover:text-[var(--accent-hover)] transition-colors text-sm"
              >
                Awards
              </a>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-bold text-lg text-white mb-4">
              Connect<span className="text-[var(--accent)]">.</span>
            </h3>
            <Social />
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-[rgba(78,134,235,0.22)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-bold text-xl text-white">
            Tushar Pawar<span className="text-[var(--accent)]">.</span>
          </p>
          <p className="text-[var(--muted)] text-xs">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

/* ════════════════ PAGE ════════════════ */
export default function Home() {
  // Bento card 3D tilt + mouse spotlight effect
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (motionQuery.matches || !pointerQuery.matches) return;

    const cards = Array.from(document.querySelectorAll(".bento-card"));
    const cleanups = [];

    cards.forEach((card) => {
      const handleMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);

        const rotateY = ((x / rect.width) - 0.5) * 6;
        const rotateX = -((y / rect.height) - 0.5) * 6;
        card.style.setProperty("--tilt-x", `${rotateX.toFixed(2)}deg`);
        card.style.setProperty("--tilt-y", `${rotateY.toFixed(2)}deg`);
      };

      const handleLeave = () => {
        card.style.setProperty("--tilt-x", "0deg");
        card.style.setProperty("--tilt-y", "0deg");
      };

      card.addEventListener("mousemove", handleMove);
      card.addEventListener("mouseleave", handleLeave);
      cleanups.push(() => {
        card.removeEventListener("mousemove", handleMove);
        card.removeEventListener("mouseleave", handleLeave);
      });
    });

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <AwardsSection />
      <FooterSection />
    </>
  );
}
