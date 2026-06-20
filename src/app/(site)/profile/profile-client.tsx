"use client";

import { useEffect, useRef } from "react";

const SERVICES = [
  {
    num: "01",
    title: "Web Development",
    desc: "Custom websites and web applications built with Next.js, React, and TypeScript. Blazing-fast performance, SEO-optimized, and designed to convert.",
    tags: ["Next.js", "React", "TypeScript"],
  },
  {
    num: "02",
    title: "Mobile Apps",
    desc: "Native and cross-platform mobile applications for iOS and Android. Smooth, responsive interfaces that users love to interact with.",
    tags: ["React Native", "iOS", "Android"],
  },
  {
    num: "03",
    title: "Platform Development",
    desc: "Scalable SaaS platforms and enterprise systems built on cloud infrastructure. Reliable, secure, and engineered for growth.",
    tags: ["AWS", "Node.js", "PostgreSQL"],
  },
  {
    num: "04",
    title: "E-Commerce Solutions",
    desc: "End-to-end online stores and marketplaces. From product catalogs to checkout flows, we build commerce experiences that drive revenue.",
    tags: ["Shopify", "WooCommerce", "Stripe"],
  },
  {
    num: "05",
    title: "Social Media Marketing",
    desc: "Data-driven social media strategies that grow your audience and engagement. Content creation, ad campaigns, and performance analytics.",
    tags: ["Instagram", "Meta Ads", "Analytics"],
  },
  {
    num: "06",
    title: "Digital Strategy",
    desc: "Comprehensive digital roadmaps that align technology with business goals. Market research, competitive analysis, and growth frameworks.",
    tags: ["Consulting", "Analytics", "Growth"],
  },
];

const CLIENTS = ["CoolTech International", "Ginger Designs", "GrabToGo", "Ziera Inc"];

export function ProfileClient() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = rootRef.current?.querySelectorAll(".pf-reveal-up");
    if (!els || els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="profile-page" ref={rootRef}>
      {/* ===== Hero ===== */}
      <section className="pf-hero">
        <div className="pf-hero-glow" aria-hidden />
        <div className="pf-hero-grid" aria-hidden />
        <div className="pf-wrap pf-hero-inner">
          <p className="pf-eyebrow pf-reveal-up">Premium Web Development &amp; Digital Solutions</p>
          <h1 className="pf-display pf-reveal-up">
            We Craft
            <br />
            <span className="pf-accent">Digital&nbsp;</span>
            <span className="pf-outline">Futures.</span>
          </h1>
          <p className="pf-hero-sub pf-reveal-up">
            Premium web experiences, mobile apps &amp; platforms for businesses that demand excellence and innovation.
          </p>
          <div className="pf-hero-actions pf-reveal-up">
            <a href="#pf-contact" className="pf-btn pf-btn-primary">
              Start a Project <span className="pf-arrow">→</span>
            </a>
            <a href="#pf-work" className="pf-btn pf-btn-ghost">
              View Our Work
            </a>
          </div>
          <div className="pf-hero-meta pf-reveal-up">
            <span className="pf-dot" aria-hidden />
            Digital innovation agency · Koratty, Thrissur, Kerala
          </div>
        </div>
      </section>

      {/* ===== Services ===== */}
      <section className="pf-section" id="pf-services">
        <div className="pf-wrap">
          <header className="pf-head pf-reveal-up">
            <span className="pf-eyebrow">01 — What we do</span>
            <h2 className="pf-display">Services engineered for growth</h2>
            <p>Transform your vision into reality with our world-class team — across web, mobile, platforms and growth.</p>
          </header>

          <div className="pf-services">
            {SERVICES.map((s) => (
              <article className="pf-service pf-reveal-up" key={s.num}>
                <span className="pf-service-num pf-mono">{s.num}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <ul className="pf-tags">
                  {s.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Selected Work ===== */}
      <section className="pf-section pf-section--alt" id="pf-work">
        <div className="pf-wrap">
          <header className="pf-head pf-reveal-up">
            <span className="pf-eyebrow">02 — Selected work</span>
            <h2 className="pf-display">Products we build, brands we partner with</h2>
          </header>

          {/* CaterFlow */}
          <article className="pf-feature pf-reveal-up">
            <div>
              <span className="pf-pill">Our Product</span>
              <h3>CaterFlow</h3>
              <p className="pf-feature-tag">Catering Management, Simplified.</p>
              <p>A platform for order management, inventory tracking, and analytics — purpose-built for modern caterers.</p>
              <div className="pf-stats">
                <div className="pf-stat">
                  <span className="pf-stat-num">12K+</span>
                  <span className="pf-stat-label">Orders Managed</span>
                </div>
                <div className="pf-stat">
                  <span className="pf-stat-num">50+</span>
                  <span className="pf-stat-label">Active Caterers</span>
                </div>
                <div className="pf-stat">
                  <span className="pf-stat-num">99.9%</span>
                  <span className="pf-stat-label">Uptime</span>
                </div>
              </div>
            </div>
            <div className="pf-feature-aside" aria-hidden>
              <div className="pf-orb-card">
                <span className="pf-orb" />
                <span className="pf-orb-label pf-mono">CaterFlow</span>
              </div>
            </div>
          </article>

          {/* Invenex ERP */}
          <article className="pf-feature pf-feature--soon pf-reveal-up">
            <div>
              <span className="pf-pill pf-pill--muted">Coming Soon</span>
              <h3>Invenex ERP</h3>
              <p>An enterprise resource platform engineered for growth — currently in development.</p>
            </div>
          </article>

          {/* Clients */}
          <div className="pf-clients pf-reveal-up">
            <p className="pf-clients-label">Brands we&apos;ve worked with</p>
            <ul className="pf-clients-grid">
              {CLIENTS.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ===== About ===== */}
      <section className="pf-section" id="pf-about">
        <div className="pf-wrap pf-about">
          <header className="pf-head pf-reveal-up" style={{ marginBottom: 0 }}>
            <span className="pf-eyebrow">03 — About</span>
            <h2 className="pf-display">About Invenex</h2>
          </header>
          <div className="pf-reveal-up">
            <p className="pf-lead">
              Premium web development, mobile apps, and digital solutions. Transform your vision into reality with our world-class team.
            </p>
            <p>
              We&apos;re a digital innovation agency building premium web experiences, mobile apps &amp; platforms for businesses that demand
              excellence and innovation — from custom websites to scalable SaaS platforms and our own products.
            </p>
            <p className="pf-made">Made within India · Based in Koratty, Thrissur, Kerala.</p>
          </div>
        </div>
      </section>

      {/* ===== Contact ===== */}
      <section className="pf-section pf-section--alt" id="pf-contact">
        <div className="pf-wrap pf-contact">
          <header className="pf-head pf-reveal-up">
            <span className="pf-eyebrow">04 — Start a project</span>
            <h2 className="pf-display">Have an idea worth building?</h2>
            <p>Let&apos;s talk.</p>
          </header>

          <div className="pf-contact-cards pf-reveal-up">
            <a className="pf-contact-card" href="mailto:info@invenex.in">
              <span className="pf-contact-k">Email</span>
              <span className="pf-contact-v">info@invenex.in</span>
            </a>
            <a className="pf-contact-card" href="tel:+918848414848">
              <span className="pf-contact-k">Phone</span>
              <span className="pf-contact-v">+91 88484 14848</span>
            </a>
            <a className="pf-contact-card" href="https://wa.me/918848414848" target="_blank" rel="noopener noreferrer">
              <span className="pf-contact-k">WhatsApp</span>
              <span className="pf-contact-v">Message us</span>
            </a>
          </div>

          <a href="mailto:info@invenex.in" className="pf-btn pf-btn-primary pf-btn-lg pf-reveal-up">
            Start a Project <span className="pf-arrow">→</span>
          </a>
        </div>
      </section>
    </div>
  );
}
