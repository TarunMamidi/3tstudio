
import React, { useEffect, useState } from "react";
import "./App.css";

const EMAIL = "hello@3tstudio.dev"; // Replace with your email

const services = [
  {
    number: "01",
    icon: "✳",
    title: "WEB DEVELOPMENT",
    description:
      "Fast, responsive websites built with modern technology and a little bit of magic.",
    tags: ["REACT", "FRONTEND", "FULL-STACK"],
  },
  {
    number: "02",
    icon: "◈",
    title: "UI / UX DESIGN",
    description:
      "Digital interfaces that are intuitive, expressive, and impossible to forget.",
    tags: ["DESIGN", "PROTOTYPING", "UX"],
  },
  {
    number: "03",
    icon: "▣",
    title: "E-COMMERCE",
    description:
      "Beautiful online stores that turn your products into unforgettable experiences.",
    tags: ["STORES", "PAYMENTS", "COMMERCE"],
  },
  {
    number: "04",
    icon: "↗",
    title: "CREATIVE DIGITAL",
    description:
      "Experimental interactions, animations, and experiences that push boundaries.",
    tags: ["ANIMATION", "INTERACTIVE", "CREATIVE"],
  },
];

const projects = [
  {
    number: "001",
    title: "PROJECT ONE",
    category: "WEB DESIGN / DEVELOPMENT",
    year: "2026",
    type: "project-one",
    symbol: "01",
    description: "A bold digital experience.",
  },
  {
    number: "002",
    title: "PROJECT TWO",
    category: "CREATIVE DEVELOPMENT",
    year: "2026",
    type: "project-two",
    symbol: "✳",
    description: "An interactive visual playground.",
  },
  {
    number: "003",
    title: "PROJECT THREE",
    category: "BRANDING / WEB",
    year: "2026",
    type: "project-three",
    symbol: "3T",
    description: "Identity meets technology.",
  },
];

const steps = [
  {
    number: "01",
    title: "DISCOVER",
    description:
      "We understand your idea, goals, audience, and what makes your brand different.",
  },
  {
    number: "02",
    title: "DESIGN",
    description:
      "We transform your vision into a unique, functional, and beautiful interface.",
  },
  {
    number: "03",
    title: "DEVELOP",
    description:
      "We build your website with clean code, smooth interactions, and modern tools.",
  },
  {
    number: "04",
    title: "DEPLOY",
    description:
      "We test, polish, launch, and help your digital presence go live.",
  },
];

function Arrow({ diagonal = false }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

function App() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [time, setTime] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "Website Development",
    message: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", dark);
    return () => document.body.classList.remove("dark-mode");
  }, [dark]);

  useEffect(() => {
    const updateScroll = () => {
      const total =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(
        total > 0 ? (window.scrollY / total) * 100 : 0
      );
    };

    window.addEventListener("scroll", updateScroll, { passive: true });
    updateScroll();

    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Europe/London",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date())
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll(".reveal").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [loading]);

  const closeMenu = () => setMenuOpen(false);

  const updateForm = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const submitForm = (event) => {
    event.preventDefault();

    const subject = encodeURIComponent(
      `3T Studio Project Inquiry — ${form.service}`
    );

    const body = encodeURIComponent(
      `Name: ${form.name}\n` +
      `Email: ${form.email}\n` +
      `Service: ${form.service}\n\n` +
      `Project Details:\n${form.message}`
    );

    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  if (loading) {
    return (
      <div className="boot-screen">
        <div className="boot-logo">3T<span>®</span></div>
        <div className="boot-line">
          <div className="boot-line-fill" />
        </div>
        <p>INITIALIZING CREATIVE SYSTEM...</p>
        <span className="boot-version">3T_OS / VERSION 01.00</span>
      </div>
    );
  }

  return (
    <div className="site-shell">
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      />

      <header className="header">
        <a href="#home" className="brand" onClick={closeMenu}>
          <span className="brand-icon">3T</span>
          <span className="brand-name">
            3T STUDIO<span>®</span>
            <small>INDEPENDENT DIGITAL STUDIO</small>
          </span>
        </a>

        <nav className={menuOpen ? "nav nav-open" : "nav"}>
          <a href="#work" onClick={closeMenu}>WORK</a>
          <a href="#services" onClick={closeMenu}>SERVICES</a>
          <a href="#about" onClick={closeMenu}>ABOUT</a>
          <a href="#process" onClick={closeMenu}>PROCESS</a>
          <a href="#contact" className="nav-contact" onClick={closeMenu}>
            LET'S TALK <Arrow diagonal />
          </a>
        </nav>

        <div className="header-actions">
          <button
            className="theme-toggle"
            onClick={() => setDark(!dark)}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            title="Toggle theme"
          >
            {dark ? "☀" : "◐"}
          </button>

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
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
              <span className="status-dot" />
              AVAILABLE FOR NEW PROJECTS
            </span>
            <span>INDEPENDENT WEB DEVELOPMENT STUDIO</span>
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
                <span className="outlined">DIGITAL</span>
                <br />
                <span className="hero-orange">THINGS<span className="asterisk">✳</span></span>
              </h1>

              <p className="hero-description">
                We design and develop distinctive websites
                for brands, businesses, and people who
                refuse to be ordinary.
              </p>

              <div className="hero-buttons">
                <a href="#work" className="btn btn-dark">
                  EXPLORE OUR WORK <Arrow diagonal />
                </a>
                <a href="#contact" className="btn btn-outline">
                  START A PROJECT <Arrow />
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
                    <span>VISUAL IDENTITY MODULE</span>
                    <span>● ACTIVE</span>
                  </div>

                  <img
                    src="/3t-logo.png"
                    alt="3T Studio logo"
                    className="hero-logo"
                  />

                  <div className="device-screen-bottom">
                    <span>3T STUDIO®</span>
                    <span>DESIGN / CODE / CREATE</span>
                  </div>
                </div>

                <div className="device-controls">
                  <div className="control-left">
                    <span className="control-label">SYSTEM STATUS</span>
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
                  <span>POWERED BY IMAGINATION</span>
                  <span>© 3T STUDIO</span>
                </div>
              </div>

              <div className="hero-sticker">100%<br />ORIGINAL<br />IDEAS ↗</div>
            </div>
          </div>

          <div className="hero-bottom">
            <span>SCROLL TO EXPLORE ↓</span>
            <span>CREATIVITY IS OUR DEFAULT SETTING.</span>
            <span>LOCAL TIME: {time || "--:--"} GMT/BST</span>
          </div>
        </section>

        {/* MARQUEE */}
        <div className="marquee" aria-label="Design, develop, create, repeat">
          <div className="marquee-track">
            {Array.from({ length: 4 }, (_, i) => (
              <span key={i} aria-hidden={i > 0}>
                DESIGN <b>✳</b> DEVELOP <b>✳</b> CREATE <b>✳</b> REPEAT <b>✳</b>
              </span>
            ))}
          </div>
        </div>

        {/* SERVICES */}
        <section className="section services-section" id="services">
          <div className="section-heading reveal">
            <div>
              <div className="section-kicker">[ 01 / WHAT WE DO ]</div>
              <h2>OUR <span>SERVICES.</span></h2>
            </div>
            <p>
              Everything you need to make your digital
              presence stand out from the noise.
            </p>
          </div>

          <div className="services-grid">
            {services.map((service) => (
              <article className="service-card reveal" key={service.number}>
                <div className="service-top">
                  <span>SERVICE / {service.number}</span>
                  <span className="service-arrow">↗</span>
                </div>

                <div className="service-icon">{service.icon}</div>
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

        {/* WORK */}
        <section className="section work-section" id="work">
          <div className="section-heading reveal">
            <div>
              <div className="section-kicker">[ 02 / THE ARCHIVE ]</div>
              <h2>SELECTED <span>WORK.</span></h2>
            </div>
            <p>
              A collection of ideas, experiments, and
              digital things we've brought to life.
            </p>
          </div>

          <div className="projects-grid">
            {projects.map((project) => (
              <article className="project-card reveal" key={project.number}>
                <div className={`project-art ${project.type}`}>
                  <div className="project-art-top">
                    <span>3T ARCHIVE / {project.number}</span>
                    <span>© 2026</span>
                  </div>

                  <div className="project-symbol">{project.symbol}</div>

                  <div className="project-art-bottom">
                    <span>EXPERIMENTAL DIGITAL WORK</span>
                    <span>↗</span>
                  </div>
                </div>

                <div className="project-info">
                  <div>
                    <span className="project-category">{project.category}</span>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                  </div>
                  <span className="project-year">{project.year}</span>
                </div>
              </article>
            ))}
          </div>

          <div className="archive-note">
            <span>※ PROJECTS SHOWN ARE PLACEHOLDERS — COMING SOON</span>
            <a href="#contact">HAVE A PROJECT IN MIND? <Arrow diagonal /></a>
          </div>
        </section>

        {/* ABOUT */}
        <section className="about-section" id="about">
          <div className="about-inner">
            <div className="about-left reveal">
              <div className="section-kicker">[ 03 / WHO WE ARE ]</div>
              <h2>
                SMALL
                <br />
                STUDIO.
                <br />
                <span>BIG IDEAS.</span>
              </h2>

              <div className="about-star">✳</div>
            </div>

            <div className="about-right reveal">
              <div className="about-index">3T / MANIFESTO / 001</div>

              <p className="about-lead">
                We believe the internet should be
                <em> interesting again.</em>
              </p>

              <p>
                3T Studio is an independent creative web
                development studio focused on building
                memorable digital experiences.
              </p>

              <p>
                We combine thoughtful design, modern
                technology, and a healthy obsession with
                details to create websites that feel
                different.
              </p>

              <p>
                No boring templates. No unnecessary
                complexity. Just good ideas brought
                to life with purpose.
              </p>

              <div className="about-stats">
                <div>
                  <strong>01</strong>
                  <span>INDEPENDENT STUDIO</span>
                </div>
                <div>
                  <strong>∞</strong>
                  <span>CREATIVE POSSIBILITIES</span>
                </div>
                <div>
                  <strong>100%</strong>
                  <span>PERSONAL ATTENTION</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="section process-section" id="process">
          <div className="section-heading reveal">
            <div>
              <div className="section-kicker">[ 04 / HOW IT WORKS ]</div>
              <h2>THE <span>PROCESS.</span></h2>
            </div>
            <p>
              A simple, collaborative approach.
              From the first conversation to the final pixel.
            </p>
          </div>

          <div className="process-list">
            {steps.map((step) => (
              <div className="process-item reveal" key={step.number}>
                <span className="process-number">/{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <span className="process-icon">↗</span>
              </div>
            ))}
          </div>
        </section>

        {/* BANNER */}
        <section className="statement-section">
          <div className="statement-label">3T STUDIO® / CREATIVE PHILOSOPHY</div>
          <h2>
            GOOD DESIGN
            <br />
            IS <span>GOOD BUSINESS.</span>
          </h2>
          <div className="statement-bottom">
            <span>MAKE SOMETHING THAT MATTERS.</span>
            <span>✳</span>
            <span>EST. 2026</span>
          </div>
        </section>

        {/* CONTACT */}
        <section className="section contact-section" id="contact">
          <div className="section-heading reveal">
            <div>
              <div className="section-kicker">[ 05 / SAY HELLO ]</div>
              <h2>LET'S MAKE <span>IT HAPPEN.</span></h2>
            </div>
            <p>
              Have an idea? Need a website?
              Let's turn your vision into something real.
            </p>
          </div>

          <div className="contact-grid">
            <div className="contact-info reveal">
              <div className="availability">
                <span className="status-dot" />
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
                We'd love to hear about it.
              </p>

              <a href={`mailto:${EMAIL}`} className="email-link">
                {EMAIL} ↗
              </a>

              <div className="contact-location">
                <span>BASED IN THE UNITED KINGDOM</span>
                <span>WORKING EVERYWHERE ↗</span>
              </div>
            </div>

            <form className="contact-form reveal" onSubmit={submitForm}>
              <div className="form-header">
                <span>NEW PROJECT REQUEST</span>
                <span>FORM / 001</span>
              </div>

              <label htmlFor="contact-name">01 / YOUR NAME</label>
              <input
                id="contact-name"
                type="text"
                name="name"
                placeholder="WHAT SHOULD WE CALL YOU?"
                value={form.name}
                onChange={updateForm}
                required
              />

              <label htmlFor="contact-email">02 / EMAIL ADDRESS</label>
              <input
                id="contact-email"
                type="email"
                name="email"
                placeholder="YOUR@EMAIL.COM"
                value={form.email}
                onChange={updateForm}
                required
              />

              <label htmlFor="contact-service">03 / WHAT DO YOU NEED?</label>
              <select
                id="contact-service"
                name="service"
                value={form.service}
                onChange={updateForm}
              >
                <option>Website Development</option>
                <option>UI / UX Design</option>
                <option>E-Commerce</option>
                <option>Creative Digital Experience</option>
                <option>Something Else</option>
              </select>

              <label htmlFor="contact-message">04 / TELL US ABOUT YOUR IDEA</label>
              <textarea
                id="contact-message"
                name="message"
                rows="5"
                placeholder="THE BIG IDEA STARTS HERE..."
                value={form.message}
                onChange={updateForm}
                required
              />

              <button className="submit-btn" type="submit">
                SEND PROJECT INQUIRY <Arrow diagonal />
              </button>

              <small>
                This opens your email app to send the inquiry.
                No information is stored on this website.
              </small>
            </form>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-main">
          <div>
            <a href="#home" className="footer-logo">3T<span>®</span></a>
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
              <a href="#contact">START A PROJECT</a>
              <a href={`mailto:${EMAIL}`}>EMAIL US</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} 3T STUDIO. ALL RIGHTS RESERVED.</span>
          <span>DESIGNED WITH INTENTION. BUILT WITH ♥.</span>
          <a href="#home">BACK TO TOP ↑</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
