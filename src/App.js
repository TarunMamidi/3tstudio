
import React, { useEffect, useRef, useState } from "react";
import "./App.css";

const EMAIL = "3tstudiosltd@gmail.com";
const INTRO_DURATION = 4800;

const services = [
  {
    no: "01",
    icon: "✳",
    title: "WEB DEVELOPMENT",
    description:
      "Fast, responsive and distinctive websites built with modern technology.",
    tags: ["REACT", "FRONTEND", "FULL-STACK"],
  },
  {
    no: "02",
    icon: "◈",
    title: "UI / UX DESIGN",
    description:
      "Thoughtful digital interfaces that are intuitive, functional and memorable.",
    tags: ["DESIGN", "UX", "PROTOTYPING"],
  },
  {
    no: "03",
    icon: "▣",
    title: "E-COMMERCE",
    description:
      "Modern online storefronts designed to help businesses grow.",
    tags: ["STORES", "PAYMENTS", "COMMERCE"],
  },
  {
    no: "04",
    icon: "↗",
    title: "CREATIVE DIGITAL",
    description:
      "Interactive experiences, animations and experimental web applications.",
    tags: ["MOTION", "INTERACTIVE", "CREATIVE"],
  },
];

const projects = [
  {
    no: "001",
    title: "LINUX WEB OS",
    category: "INTERACTIVE WEB APPLICATION",
    image: "/webos.png",
    description:
      "A Linux-inspired virtual operating system recreated inside a website. " +
      "Visitors can explore a desktop environment featuring Profile, About, " +
      "Terminal, Calculator, Browser, AI Chatbot and interactive Games.",
    technologies: ["WEB APPLICATION", "INTERACTIVE UI", "LINUX INSPIRED"],
    live: "https://myportfolio-srimantarun.vercel.app/",
    github: "",
    year: "2026",
    featured: true,
    status: "LIVE PROJECT",
  },
  
];

const steps = [
  ["01", "DISCOVER", "We explore your idea, goals and audience."],
  ["02", "DESIGN", "We create a distinctive visual direction and interface."],
  ["03", "DEVELOP", "We build, animate, optimize and test."],
  ["04", "DEPLOY", "We polish and launch your digital experience."],
];

function ParticleIntro({ onComplete }) {
  const canvasRef = useRef(null);
  const callbackRef = useRef(onComplete);
  const completedRef = useRef(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    callbackRef.current = onComplete;
  }, [onComplete]);

  const finish = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    setExiting(true);
    window.setTimeout(() => callbackRef.current?.(), 650);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: false });

    if (!ctx) {
      callbackRef.current?.();
      return;
    }

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      callbackRef.current?.();
      return;
    }

    let raf = 0;
    let timeout = 0;
    let disposed = false;
    let startTime = null;
    let particles = [];
    let width = 0;
    let height = 0;

    const image = new Image();
    image.src = `${process.env.PUBLIC_URL}/logo.png`;

    const clamp = (v) => Math.max(0, Math.min(1, v));
    const ease = (v) => 1 - Math.pow(1 - clamp(v), 3);

    function setup() {
      width = window.innerWidth;
      height = window.innerHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const off = document.createElement("canvas");
      off.width = 300;
      off.height = 300;

      const oc = off.getContext("2d", {
        willReadFrequently: true,
      });

      if (!oc) return;

      oc.fillStyle = "#000";
      oc.fillRect(0, 0, 300, 300);
      oc.drawImage(image, 0, 0, 300, 300);

      const pixels = oc.getImageData(0, 0, 300, 300).data;
      const size = Math.min(
        width * 0.72,
        height * 0.63,
        540
      );

      const points = [];
      const spacing = width < 600 ? 4 : 3;

      for (let y = 0; y < 300; y += spacing) {
        for (let x = 0; x < 300; x += spacing) {
          const i = (y * 300 + x) * 4;

          const brightness =
            (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;

          if (
            brightness > 125 &&
            Math.random() > 0.1
          ) {
            points.push({
              tx:
                width / 2 +
                (x / 300 - 0.5) * size,
              ty:
                height / 2 +
                (y / 300 - 0.5) * size,
            });
          }
        }
      }

      for (let i = points.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [points[i], points[j]] = [points[j], points[i]];
      }

      particles = points
        .slice(0, width < 600 ? 2100 : 3500)
        .map((point) => {
          const angle = Math.random() * Math.PI * 2;
          const distance =
            Math.max(width, height) *
            (0.25 + Math.random() * 0.75);

          return {
            ...point,
            sx:
              width / 2 +
              Math.cos(angle) * distance,
            sy:
              height / 2 +
              Math.sin(angle) * distance,
            delay: Math.random() * 0.33,
            radius: 0.65 + Math.random() * 1.15,
            phase: Math.random() * Math.PI * 2,
          };
        });
    }

    function draw(timestamp) {
      if (disposed) return;
      if (startTime === null) startTime = timestamp;

      const elapsed = timestamp - startTime;
      const progress = clamp(elapsed / INTRO_DURATION);
      const formation = clamp(progress / 0.65);
      const glitch =
        progress > 0.70 && progress < 0.84;

      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, width, height);

      for (const p of particles) {
        const t = ease(
          (formation - p.delay) / (1 - p.delay)
        );

        let x = p.sx + (p.tx - p.sx) * t;
        let y = p.sy + (p.ty - p.sy) * t;

        const drift = (1 - t) * 26;

        x +=
          Math.sin(elapsed * 0.002 + p.phase) * drift;

        y +=
          Math.cos(elapsed * 0.0017 + p.phase) * drift;

        if (glitch && Math.random() > 0.96) {
          x += (Math.random() - 0.5) * 75;
          y += (Math.random() - 0.5) * 10;
        }

        ctx.fillStyle = `rgba(255,255,255,${
          0.15 + t * 0.85
        })`;

        ctx.beginPath();
        ctx.arc(x, y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = "rgba(0,0,0,0.15)";

      for (let y = 0; y < height; y += 5) {
        ctx.fillRect(0, y, width, 1);
      }

      if (progress > 0.54 && progress < 0.89) {
        const scan = (progress - 0.54) / 0.35;
        const y = height * (0.17 + scan * 0.66);

        const gradient = ctx.createLinearGradient(
          0,
          y - 18,
          0,
          y + 18
        );

        gradient.addColorStop(
          0,
          "rgba(255,91,46,0)"
        );
        gradient.addColorStop(
          0.5,
          "rgba(255,91,46,0.24)"
        );
        gradient.addColorStop(
          1,
          "rgba(255,91,46,0)"
        );

        ctx.fillStyle = gradient;
        ctx.fillRect(0, y - 18, width, 36);
      }

      if (glitch && Math.random() > 0.65) {
        ctx.fillStyle = "rgba(255,91,46,0.85)";

        ctx.fillRect(
          Math.random() * width * 0.4,
          Math.random() * height,
          Math.random() * width * 0.5,
          2
        );
      }

      if (elapsed < INTRO_DURATION) {
        raf = requestAnimationFrame(draw);
      } else if (!completedRef.current) {
        completedRef.current = true;
        setExiting(true);

        timeout = window.setTimeout(() => {
          if (!disposed) callbackRef.current?.();
        }, 650);
      }
    }

    image.onload = () => {
      if (disposed) return;
      setup();
      raf = requestAnimationFrame(draw);
    };

    image.onerror = () => {
      if (!disposed) callbackRef.current?.();
    };

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
      image.onload = null;
      image.onerror = null;
    };
  }, []);

  return (
    <div
      className={`particle-intro ${
        exiting ? "particle-exit" : ""
      }`}
    >
      <canvas ref={canvasRef} aria-hidden="true" />

      <div className="intro-meta">
        <span>3T STUDIO®</span>
        <span>CREATIVE SYSTEM / 001</span>
      </div>

      <button
        type="button"
        className="skip-intro"
        onClick={finish}
      >
        SKIP INTRO ↗
      </button>

      <div className="intro-caption">
        <div>
          <strong>
            3T STUDIO<span>®</span>
          </strong>
          <small>DESIGN. DEVELOP. CREATE.</small>
        </div>

        <p>
          <i /> INITIALIZING DIGITAL EXPERIENCE
        </p>
      </div>

      <div className="intro-loading">
        <div />
      </div>
    </div>
  );
}

function ProjectCard({ project }) {
  const [imageError, setImageError] = useState(false);

  return (
    <article
      className={`project-card reveal ${
        project.featured ? "project-featured" : ""
      }`}
    >
      <div
        className={`project-art ${
          project.featured ? "linux-project-art" : ""
        }`}
      >
        <div className="project-art-top">
          <span>3T ARCHIVE / {project.no}</span>
          <span>{project.status}</span>
        </div>

        <div className="project-preview-wrap">
          {!imageError ? (
            <img
              src={`${process.env.PUBLIC_URL}${project.image}`}
              alt={`${project.title} preview`}
              className="project-preview"
              loading="lazy"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="project-fallback">
              <span className="fallback-icon">
                {project.featured ? "⌘" : "✳"}
              </span>
              <strong>{project.title}</strong>
              <small>3T STUDIO / PROJECT {project.no}</small>
            </div>
          )}
        </div>

        <div className="project-art-bottom">
          <span>{project.category}</span>
          <span>↗</span>
        </div>
      </div>

      <div className="project-info">
        <div className="project-details">
          <span className="project-category">
            {project.category}
          </span>

          <h3>{project.title}</h3>

          <p>{project.description}</p>

          {project.featured && (
            <div className="linux-apps">
              {[
                "PROFILE",
                "ABOUT",
                "TERMINAL",
                "CALCULATOR",
                "BROWSER",
                "AI CHATBOT",
                "GAMES",
              ].map((app) => (
                <span key={app}>{app}</span>
              ))}
            </div>
          )}

          <div className="project-tech">
            {project.technologies.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>

          <div className="project-links">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="project-live-btn"
              >
                {project.featured
                  ? "LAUNCH WEB OS"
                  : "VISIT WEBSITE"}
                <span>↗</span>
              </a>
            )}

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="project-github-btn"
              >
                VIEW SOURCE ↗
              </a>
            )}
          </div>
        </div>

        <span className="project-year">
          {project.year}
        </span>
      </div>
    </article>
  );
}

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "Website Development",
    message: "",
  });

  useEffect(() => {
    document.body.classList.toggle("dark-mode", dark);

    return () => {
      document.body.classList.remove("dark-mode");
    };
  }, [dark]);

  useEffect(() => {
    document.body.style.overflow = showIntro
      ? "hidden"
      : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [showIntro]);

  useEffect(() => {
    const update = () => {
      const max =
        document.documentElement.scrollHeight -
        window.innerHeight;

      setProgress(
        max > 0 ? (window.scrollY / max) * 100 : 0
      );
    };

    window.addEventListener("scroll", update, {
      passive: true,
    });

    update();

    return () => {
      window.removeEventListener("scroll", update);
    };
  }, []);

  useEffect(() => {
    if (showIntro) return;

    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach((el) => {
        el.classList.add("visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".reveal").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [showIntro]);

  function updateForm(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function submitForm(event) {
    event.preventDefault();

    const subject = encodeURIComponent(
      `3T Studio Project Inquiry — ${form.service}`
    );

    const body = encodeURIComponent(
      `Name: ${form.name}\n` +
      `Email: ${form.email}\n` +
      `Service: ${form.service}\n\n` +
      `Project:\n${form.message}`
    );

    window.location.href =
      `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  }

  return (
    <>
      {showIntro && (
        <ParticleIntro
          onComplete={() => setShowIntro(false)}
        />
      )}

      <div className="site-shell">
        <div
          className="scroll-progress"
          style={{ width: `${progress}%` }}
        />

        <header className="header">
          <a
            href="#home"
            className="brand"
            onClick={() => setMenuOpen(false)}
          >
            <span className="brand-icon">3T</span>

            <span className="brand-name">
              3T STUDIO<span>®</span>
              <small>INDEPENDENT DIGITAL STUDIO</small>
            </span>
          </a>

          <nav
            className={`nav ${
              menuOpen ? "nav-open" : ""
            }`}
          >
            {[
              ["WORK", "#work"],
              ["SERVICES", "#services"],
              ["ABOUT", "#about"],
              ["PROCESS", "#process"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}

            <a
              href="#contact"
              className="nav-contact"
              onClick={() => setMenuOpen(false)}
            >
              LET'S TALK ↗
            </a>
          </nav>

          <div className="header-actions">
            <button
              type="button"
              className="theme-toggle"
              onClick={() => setDark(!dark)}
              aria-label="Toggle dark mode"
            >
              {dark ? "☀" : "◐"}
            </button>

            <button
              type="button"
              className="menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </header>

        <main>
          {/* HERO */}
          <section className="hero" id="home">
            <div className="hero-topline">
              <span>
                <i className="status-dot" />
                AVAILABLE FOR NEW PROJECTS
              </span>

              <span>
                INDEPENDENT WEB DEVELOPMENT STUDIO
              </span>

              <span>EST. 2026 / UK</span>
            </div>

            <div className="hero-content">
              <div className="hero-copy">
                <div className="eyebrow">
                  <span className="eyebrow-square" />
                  HELLO, WE ARE 3T STUDIO
                </div>

                <h1>
                  WE MAKE
                  <br />
                  <span className="outlined">
                    DIGITAL
                  </span>
                  <br />
                  <span className="hero-orange">
                    THINGS
                    <span className="asterisk">
                      ✳
                    </span>
                  </span>
                </h1>

                <p className="hero-description">
                  We design and develop distinctive
                  websites for brands, businesses and
                  people who refuse to be ordinary.
                </p>

                <div className="hero-buttons">
                  <a
                    className="btn btn-dark"
                    href="#work"
                  >
                    EXPLORE OUR WORK
                    <span>↗</span>
                  </a>

                  <a
                    className="btn btn-outline"
                    href="#contact"
                  >
                    START A PROJECT
                    <span>→</span>
                  </a>
                </div>
              </div>

              <div className="hero-visual">
                <div className="device">
                  <div className="device-top">
                    <span>3T / CREATIVE UNIT</span>
                    <span>MODEL 001 — 2026</span>
                  </div>

                  <div className="device-screen">
                    <div className="device-screen-label">
                      <span>
                        VISUAL IDENTITY MODULE
                      </span>
                      <span>● ACTIVE</span>
                    </div>

                    <img
                      className="hero-logo"
                      src={`${process.env.PUBLIC_URL}/3t-logo.png`}
                      alt="3T Studio logo"
                    />

                    <div className="device-screen-bottom">
                      <span>3T STUDIO®</span>
                      <span>
                        DESIGN / CODE / CREATE
                      </span>
                    </div>
                  </div>

                  <div className="device-controls">
                    <div className="control-left">
                      <span className="control-label">
                        SYSTEM STATUS
                      </span>

                      <div className="led-row">
                        <span className="led led-orange" />
                        <span className="led led-green" />
                        <span className="led" />
                        <span className="led" />
                      </div>

                      <small>READY TO CREATE</small>
                    </div>

                    <div className="control-right">
                      <div className="knob">
                        <div className="knob-indicator" />
                      </div>
                      <span>CREATIVITY</span>
                    </div>
                  </div>

                  <div className="device-footer">
                    <span>
                      POWERED BY IMAGINATION
                    </span>
                    <span>© 3T STUDIO</span>
                  </div>
                </div>

                <div className="hero-sticker">
                  100%
                  <br />
                  ORIGINAL
                  <br />
                  IDEAS ↗
                </div>
              </div>
            </div>

            <div className="hero-bottom">
              <span>SCROLL TO EXPLORE ↓</span>
              <span>
                CREATIVITY IS OUR DEFAULT SETTING.
              </span>
              <span>3T_OS / SYSTEM ONLINE</span>
            </div>
          </section>

          {/* MARQUEE */}
          <div className="marquee">
            <div className="marquee-track">
              {Array.from(
                { length: 4 },
                (_, i) => (
                  <span key={i}>
                    DESIGN <b>✳</b> DEVELOP <b>✳</b>
                    CREATE <b>✳</b> REPEAT <b>✳</b>
                  </span>
                )
              )}
            </div>
          </div>

          {/* SERVICES */}
          <section
            className="section services-section"
            id="services"
          >
            <div className="section-heading reveal">
              <div>
                <div className="section-kicker">
                  [ 01 / WHAT WE DO ]
                </div>

                <h2>
                  OUR <span>SERVICES.</span>
                </h2>
              </div>

              <p>
                Everything you need to make your
                digital presence stand out.
              </p>
            </div>

            <div className="services-grid">
              {services.map((service) => (
                <article
                  className="service-card reveal"
                  key={service.no}
                >
                  <div className="service-top">
                    <span>
                      SERVICE / {service.no}
                    </span>
                    <span className="service-arrow">
                      ↗
                    </span>
                  </div>

                  <div className="service-icon">
                    {service.icon}
                  </div>

                  <h3>{service.title}</h3>
                  <p>{service.description}</p>

                  <div className="service-tags">
                    {service.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* REAL PROJECTS */}
          <section
            className="section work-section"
            id="work"
          >
            <div className="section-heading reveal">
              <div>
                <div className="section-kicker">
                  [ 02 / THE ARCHIVE ]
                </div>

                <h2>
                  SELECTED <span>WORK.</span>
                </h2>
              </div>

              <p>
                Real projects, interactive experiments
                and digital experiences we've built.
              </p>
            </div>

            <div className="projects-grid">
              {projects.map((project) => (
                <ProjectCard
                  key={project.no}
                  project={project}
                />
              ))}
            </div>

            <div className="archive-note">
              <span>
                ※ 3T STUDIO / PROJECT ARCHIVE
              </span>

              <a href="#contact">
                HAVE A PROJECT? ↗
              </a>
            </div>
          </section>

          {/* ABOUT */}
          <section
            className="about-section"
            id="about"
          >
            <div className="about-inner">
              <div className="about-left reveal">
                <div className="section-kicker">
                  [ 03 / WHO WE ARE ]
                </div>

                <h2>
                  SMALL
                  <br />
                  STUDIO.
                  <br />
                  <span>BIG IDEAS.</span>
                </h2>

                <div className="about-star">
                  ✳
                </div>
              </div>

              <div className="about-right reveal">
                <div className="about-index">
                  3T / MANIFESTO / 001
                </div>

                <p className="about-lead">
                  We believe the internet should be{" "}
                  <em>interesting again.</em>
                </p>

                <p>
                  3T Studio is an independent creative
                  web development studio focused on
                  memorable digital experiences.
                </p>

                <p>
                  We combine thoughtful design, modern
                  technology and attention to detail to
                  create websites that feel different.
                </p>

                <p>
                  No boring templates. No unnecessary
                  complexity. Just good ideas brought
                  to life with purpose.
                </p>

                <div className="about-stats">
                  <div>
                    <strong>01</strong>
                    <span>
                      INDEPENDENT STUDIO
                    </span>
                  </div>

                  <div>
                    <strong>∞</strong>
                    <span>
                      CREATIVE POSSIBILITIES
                    </span>
                  </div>

                  <div>
                    <strong>100%</strong>
                    <span>
                      PERSONAL ATTENTION
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* PROCESS */}
          <section
            className="section process-section"
            id="process"
          >
            <div className="section-heading reveal">
              <div>
                <div className="section-kicker">
                  [ 04 / HOW IT WORKS ]
                </div>

                <h2>
                  THE <span>PROCESS.</span>
                </h2>
              </div>

              <p>
                From the first conversation to
                the final pixel.
              </p>
            </div>

            <div className="process-list">
              {steps.map(
                ([no, title, description]) => (
                  <div
                    className="process-item reveal"
                    key={no}
                  >
                    <span className="process-number">
                      /{no}
                    </span>

                    <h3>{title}</h3>

                    <p>{description}</p>

                    <span className="process-icon">
                      ↗
                    </span>
                  </div>
                )
              )}
            </div>
          </section>

          {/* STATEMENT */}
          <section className="statement-section">
            <div className="statement-label">
              3T STUDIO® / CREATIVE PHILOSOPHY
            </div>

            <h2>
              GOOD DESIGN
              <br />
              IS <span>GOOD BUSINESS.</span>
            </h2>

            <div className="statement-bottom">
              <span>
                MAKE SOMETHING THAT MATTERS.
              </span>
              <span>✳</span>
              <span>EST. 2026</span>
            </div>
          </section>

          {/* CONTACT */}
          <section
            className="section contact-section"
            id="contact"
          >
            <div className="section-heading reveal">
              <div>
                <div className="section-kicker">
                  [ 05 / SAY HELLO ]
                </div>

                <h2>
                  LET'S MAKE{" "}
                  <span>IT HAPPEN.</span>
                </h2>
              </div>

              <p>
                Have an idea? Let's turn it
                into something real.
              </p>
            </div>

            <div className="contact-grid">
              <div className="contact-info reveal">
                <div className="availability">
                  <i className="status-dot" />
                  OPEN FOR NEW PROJECTS
                </div>

                <h3>
                  YOUR NEXT
                  <br />
                  BIG IDEA
                  <br />
                  STARTS HERE<span>.</span>
                </h3>

                <p>
                  Tell us what you're dreaming up.
                  We'd love to hear it.
                </p>

                <a
                  className="email-link"
                  href={`mailto:${EMAIL}`}
                >
                  {EMAIL} ↗
                </a>

                <div className="contact-location">
                  <span>
                    BASED IN THE UNITED KINGDOM
                  </span>
                  <span>
                    WORKING EVERYWHERE ↗
                  </span>
                </div>
              </div>

              <form
                className="contact-form reveal"
                onSubmit={submitForm}
              >
                <div className="form-header">
                  <span>NEW PROJECT REQUEST</span>
                  <span>FORM / 001</span>
                </div>

                <label htmlFor="name">
                  01 / YOUR NAME
                </label>

                <input
                  id="name"
                  name="name"
                  required
                  placeholder="WHAT SHOULD WE CALL YOU?"
                  value={form.name}
                  onChange={updateForm}
                />

                <label htmlFor="email">
                  02 / EMAIL ADDRESS
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="YOUR@EMAIL.COM"
                  value={form.email}
                  onChange={updateForm}
                />

                <label htmlFor="service">
                  03 / WHAT DO YOU NEED?
                </label>

                <select
                  id="service"
                  name="service"
                  value={form.service}
                  onChange={updateForm}
                >
                  <option>
                    Website Development
                  </option>
                  <option>
                    UI / UX Design
                  </option>
                  <option>
                    E-Commerce
                  </option>
                  <option>
                    Creative Digital Experience
                  </option>
                  <option>
                    Something Else
                  </option>
                </select>

                <label htmlFor="message">
                  04 / YOUR IDEA
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                  placeholder="THE BIG IDEA STARTS HERE..."
                  value={form.message}
                  onChange={updateForm}
                />

                <button
                  type="submit"
                  className="submit-btn"
                >
                  SEND PROJECT INQUIRY
                  <span>↗</span>
                </button>

                <small>
                  Opens your email application.
                  No information is stored on this site.
                </small>
              </form>
            </div>
          </section>
        </main>

        {/* FOOTER */}
        <footer className="footer">
          <div className="footer-main">
            <div>
              <a
                href="#home"
                className="footer-logo"
              >
                3T<span>®</span>
              </a>

              <p>
                INDEPENDENT CREATIVE STUDIO.
                <br />
                DESIGNING THE UNEXPECTED.
              </p>
            </div>

            <div className="footer-links">
              <div>
                <span>NAVIGATION</span>
                <a href="#home">HOME</a>
                <a href="#work">WORK</a>
                <a href="#services">SERVICES</a>
                <a href="#about">ABOUT</a>
              </div>

              <div>
                <span>GET IN TOUCH</span>
                <a href="#contact">
                  START A PROJECT
                </a>
                <a href={`mailto:${EMAIL}`}>
                  EMAIL US
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} 3T STUDIO.
            </span>

            <span>
              DESIGNED WITH INTENTION.
              BUILT WITH ♥.
            </span>

            <a href="#home">
              BACK TO TOP ↑
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
