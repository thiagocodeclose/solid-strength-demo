// @ts-nocheck
'use client';
import { useEffect, useState } from 'react';
import { siteData } from '@/lib/site-data';

const css = `
  :root {
    --so-bg: #050508;
    --so-surface: #0C0C12;
    --so-card: #111119;
    --so-primary: #1E6FD9;
    --so-primary-light: #3D8AEF;
    --so-accent: #00C2FF;
    --so-text: #F0F0F8;
    --so-muted: rgba(240,240,248,0.5);
    --so-border: rgba(30,111,217,0.15);
    --font-display: var(--font-barlow-condensed), 'Barlow Condensed', sans-serif;
    --font-body: var(--font-barlow), 'Barlow', sans-serif;
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: var(--font-body); background: var(--so-bg); color: var(--so-text); overflow-x: hidden; }

  /* NAV */
  .so-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 3rem; height: 64px;
    transition: background 0.3s, box-shadow 0.3s;
  }
  .so-nav.scrolled {
    background: rgba(5,5,8,0.97);
    box-shadow: 0 1px 20px rgba(0,0,0,0.6);
    backdrop-filter: blur(12px);
  }
  .so-nav-logo {
    font-family: var(--font-display);
    font-size: 2rem; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--so-text); text-decoration: none;
  }
  .so-nav-logo span { color: var(--so-primary); }
  .so-nav-links { display: flex; gap: 2rem; align-items: center; }
  .so-nav-links a {
    font-family: var(--font-display);
    font-size: 0.82rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--so-muted); text-decoration: none; transition: color 0.2s;
  }
  .so-nav-links a:hover { color: var(--so-primary); }
  .so-btn-nav {
    background: var(--so-primary); color: #fff;
    padding: 0.5rem 1.4rem;
    font-family: var(--font-display);
    font-size: 0.85rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
    text-decoration: none; transition: background 0.2s;
  }
  .so-btn-nav:hover { background: var(--so-primary-light); }

  /* ===== SPLIT-LAYOUT HERO ===== */
  .so-hero {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 55fr 45fr;
  }
  /* LEFT — video panel */
  .so-hero-video-panel {
    position: relative;
    overflow: hidden;
    min-height: 100vh;
  }
  .so-hero-video-panel video {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    object-fit: cover;
  }
  .so-hero-video-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to right, rgba(5,5,8,0.15) 0%, rgba(5,5,8,0.55) 100%);
  }
  /* Blue vertical stripe at the seam */
  .so-hero-seam {
    position: absolute; top: 0; right: 0; bottom: 0; width: 3px;
    background: var(--so-primary);
    z-index: 2;
  }
  /* Corner label on video */
  .so-video-corner {
    position: absolute; bottom: 2.5rem; left: 2.5rem; z-index: 3;
    display: flex; align-items: center; gap: 0.6rem;
  }
  .so-video-corner-dot {
    width: 8px; height: 8px; border-radius: 50%; background: var(--so-accent);
    animation: so-blink 2s infinite;
  }
  @keyframes so-blink { 0%,100%{opacity:1} 50%{opacity:0.2} }
  .so-video-corner-text {
    font-family: var(--font-display);
    font-size: 0.8rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
    color: rgba(255,255,255,0.7);
  }

  /* RIGHT — copy panel */
  .so-hero-copy-panel {
    background: var(--so-bg);
    display: flex; flex-direction: column; justify-content: center;
    padding: 7rem 3.5rem 4rem 4rem;
    position: relative;
  }
  .so-hero-tag {
    display: inline-flex; align-items: center; gap: 0.5rem;
    font-family: var(--font-display);
    font-size: 0.8rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--so-primary); margin-bottom: 1.5rem;
  }
  .so-hero-tag::before { content: ''; display: block; width: 16px; height: 2px; background: var(--so-primary); }
  .so-hero-title {
    font-family: var(--font-display);
    font-size: clamp(3.5rem, 5vw, 6rem);
    font-weight: 800; text-transform: uppercase; letter-spacing: 0.03em; line-height: 0.93;
    color: var(--so-text); margin-bottom: 1.5rem;
  }
  .so-hero-title em { font-style: normal; color: var(--so-primary); display: block; }
  .so-hero-sub { font-size: 1rem; line-height: 1.75; color: var(--so-muted); max-width: 400px; margin-bottom: 2.5rem; }
  .so-hero-actions { display: flex; gap: 0.75rem; flex-wrap: wrap; }
  .so-btn-primary {
    background: var(--so-primary); color: #fff;
    padding: 0.9rem 2rem;
    font-family: var(--font-display);
    font-weight: 700; font-size: 1rem; letter-spacing: 0.08em; text-transform: uppercase;
    text-decoration: none; transition: background 0.2s, transform 0.2s;
  }
  .so-btn-primary:hover { background: var(--so-primary-light); transform: translateY(-2px); }
  .so-btn-ghost {
    border: 2px solid rgba(240,240,248,0.12); color: var(--so-muted);
    padding: 0.9rem 2rem;
    font-family: var(--font-display);
    font-weight: 600; font-size: 1rem; letter-spacing: 0.08em; text-transform: uppercase;
    text-decoration: none; transition: border-color 0.2s, color 0.2s;
  }
  .so-btn-ghost:hover { border-color: var(--so-primary); color: var(--so-primary); }

  /* HERO bottom stat row */
  .so-hero-stats {
    position: absolute; bottom: 2.5rem; left: 4rem; right: 3.5rem;
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem;
    padding-top: 2rem; border-top: 1px solid rgba(240,240,248,0.07);
  }
  .so-hs-value { font-family: var(--font-display); font-size: 1.6rem; font-weight: 700; color: var(--so-primary); line-height: 1; margin-bottom: 0.15rem; }
  .so-hs-label { font-size: 0.68rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--so-muted); }

  /* SECTIONS */
  section { padding: 6rem 2rem; }
  .so-section-tag {
    font-family: var(--font-display);
    font-size: 0.8rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--so-primary); margin-bottom: 0.5rem; display: inline-block;
  }
  .so-section-title {
    font-family: var(--font-display);
    font-size: clamp(2.5rem, 4vw, 4rem);
    font-weight: 800; text-transform: uppercase; letter-spacing: 0.03em; line-height: 0.93;
    color: var(--so-text); margin-bottom: 1rem;
  }
  .so-section-sub { font-size: 1rem; line-height: 1.75; color: var(--so-muted); max-width: 540px; }

  /* METHOD */
  .so-method-section { background: var(--so-surface); }
  .so-method-inner { max-width: 1200px; margin: 0 auto; }
  .so-method-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 3rem; flex-wrap: wrap; gap: 2rem; }
  .so-method-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--so-border); border: 1px solid var(--so-border); }
  .so-method-cell { background: var(--so-card); padding: 2.5rem 2rem; transition: background 0.2s; }
  .so-method-cell:hover { background: #16161E; }
  .so-method-icon { font-size: 1.8rem; margin-bottom: 1rem; }
  .so-method-name {
    font-family: var(--font-display);
    font-size: 1.2rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em;
    color: var(--so-text); margin-bottom: 0.6rem;
  }
  .so-method-desc { font-size: 0.88rem; line-height: 1.65; color: var(--so-muted); }

  /* CLASSES */
  .so-classes-section { background: var(--so-bg); }
  .so-classes-inner { max-width: 1200px; margin: 0 auto; }
  .so-classes-header { margin-bottom: 3rem; }
  .so-classes-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--so-border); border: 1px solid var(--so-border); }
  .so-class-cell {
    background: var(--so-card); padding: 2rem;
    position: relative; overflow: hidden; transition: background 0.2s;
  }
  .so-class-cell:hover { background: #141420; }
  .so-class-cell::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: var(--so-primary); transform: scaleX(0); transform-origin: left;
    transition: transform 0.3s;
  }
  .so-class-cell:hover::before { transform: scaleX(1); }
  .so-class-badges { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
  .so-badge {
    font-size: 0.68rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
    padding: 0.25rem 0.65rem;
  }
  .so-badge-level { background: rgba(30,111,217,0.12); color: var(--so-primary); }
  .so-badge-dur { background: rgba(240,240,248,0.06); color: var(--so-muted); }
  .so-class-name {
    font-family: var(--font-display);
    font-size: 1.2rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;
    color: var(--so-text); margin-bottom: 0.75rem;
  }
  .so-class-desc { font-size: 0.88rem; line-height: 1.65; color: var(--so-muted); }

  /* PRICING */
  .so-pricing-section { background: var(--so-surface); }
  .so-pricing-inner { max-width: 1100px; margin: 0 auto; }
  .so-pricing-header { text-align: center; margin-bottom: 3.5rem; }
  .so-pricing-header .so-section-sub { margin: 0 auto; }
  .so-pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--so-border); border: 1px solid var(--so-border); }
  .so-price-card { background: var(--so-card); padding: 2.5rem 2rem; position: relative; }
  .so-price-card.highlight { background: #090914; border-top: 2px solid var(--so-primary); }
  .so-popular-badge {
    position: absolute; top: 0; left: 0; right: 0;
    background: var(--so-primary);
    font-family: var(--font-display);
    font-size: 0.72rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
    color: #fff; text-align: center; padding: 0.3rem;
  }
  .so-price-name {
    font-family: var(--font-display);
    font-size: 1rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;
    color: var(--so-muted); margin-bottom: 0.75rem; margin-top: 0.5rem;
  }
  .so-price-card.highlight .so-price-name { margin-top: 2rem; }
  .so-price-amount { font-family: var(--font-display); font-size: 3rem; font-weight: 800; color: var(--so-primary); line-height: 1; margin-bottom: 0.2rem; }
  .so-price-period { font-size: 0.82rem; color: var(--so-muted); margin-bottom: 1.75rem; }
  .so-price-features { list-style: none; display: flex; flex-direction: column; gap: 0.7rem; margin-bottom: 2rem; }
  .so-price-features li { display: flex; align-items: flex-start; gap: 0.6rem; font-size: 0.88rem; color: var(--so-muted); }
  .so-check { color: var(--so-primary); flex-shrink: 0; font-weight: 700; }
  .so-price-cta {
    display: block; text-align: center; padding: 0.9rem;
    font-family: var(--font-display);
    font-weight: 700; font-size: 0.9rem; letter-spacing: 0.1em; text-transform: uppercase;
    text-decoration: none; transition: all 0.2s;
  }
  .so-price-card.highlight .so-price-cta { background: var(--so-primary); color: #fff; }
  .so-price-card.highlight .so-price-cta:hover { background: var(--so-primary-light); }
  .so-price-card:not(.highlight) .so-price-cta { border: 1px solid rgba(240,240,248,0.1); color: var(--so-muted); }
  .so-price-card:not(.highlight) .so-price-cta:hover { border-color: var(--so-primary); color: var(--so-primary); }

  /* CTA */
  .so-cta-section { background: var(--so-bg); text-align: center; padding: 7rem 2rem; position: relative; overflow: hidden; }
  .so-cta-section::before {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(ellipse 65% 55% at 50% 50%, rgba(30,111,217,0.08) 0%, transparent 100%);
  }
  .so-cta-inner { max-width: 600px; margin: 0 auto; position: relative; }
  .so-cta-title {
    font-family: var(--font-display);
    font-size: clamp(3rem, 6vw, 6.5rem);
    font-weight: 800; text-transform: uppercase; letter-spacing: 0.03em; line-height: 0.93;
    color: var(--so-text); margin-bottom: 1.25rem;
  }
  .so-cta-title span { color: var(--so-primary); display: block; }
  .so-cta-sub { font-size: 1rem; color: var(--so-muted); margin-bottom: 2.5rem; line-height: 1.75; }
  .so-btn-cta {
    background: var(--so-primary); color: #fff;
    padding: 1.1rem 3rem;
    font-family: var(--font-display);
    font-weight: 700; font-size: 1rem; letter-spacing: 0.1em; text-transform: uppercase;
    text-decoration: none; display: inline-block;
    transition: background 0.2s, transform 0.2s;
  }
  .so-btn-cta:hover { background: var(--so-primary-light); transform: translateY(-2px); }

  /* FOOTER */
  .so-footer { background: #02020A; padding: 4rem 2rem 2rem; }
  .so-footer-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 3rem; }
  .so-footer-logo { font-family: var(--font-display); font-size: 1.6rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: var(--so-text); margin-bottom: 0.75rem; }
  .so-footer-logo span { color: var(--so-primary); }
  .so-footer-desc { font-size: 0.88rem; line-height: 1.6; color: var(--so-muted); max-width: 280px; }
  .so-footer-h { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(240,240,248,0.25); margin-bottom: 1rem; }
  .so-footer-links { list-style: none; display: flex; flex-direction: column; gap: 0.65rem; }
  .so-footer-links a { color: var(--so-muted); text-decoration: none; font-size: 0.9rem; transition: color 0.2s; }
  .so-footer-links a:hover { color: var(--so-primary); }
  .so-footer-bottom {
    max-width: 1200px; margin: 2.5rem auto 0;
    padding-top: 2rem; border-top: 1px solid rgba(240,240,248,0.05);
    display: flex; justify-content: space-between; align-items: center;
    font-size: 0.78rem; color: var(--so-muted); flex-wrap: wrap; gap: 0.5rem;
  }
  .so-footer-brand { color: var(--so-primary); text-decoration: none; font-weight: 700; }

  /* REVEAL */
  .reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.65s ease, transform 0.65s ease; }
  .reveal.visible { opacity: 1; transform: none; }

  @media (max-width: 900px) {
    .so-hero { grid-template-columns: 1fr; }
    .so-hero-video-panel { min-height: 50vh; }
    .so-hero-stats { display: none; }
    .so-method-grid { grid-template-columns: repeat(2, 1fr); }
    .so-classes-grid { grid-template-columns: 1fr; }
    .so-pricing-grid { grid-template-columns: 1fr; }
    .so-footer-inner { grid-template-columns: 1fr; }
    .so-nav-links { display: none; }
  }
`;

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function SolidPage() {
  const [scrolled, setScrolled] = useState(false);
  useReveal();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* NAV */}
      <nav className={`so-nav${scrolled ? ' scrolled' : ''}`}>
        <a href="#" className="so-nav-logo"><span>SOLID</span></a>
        <div className="so-nav-links">
          <a href="#classes">Classes</a>
          <a href="#method">Method</a>
          <a href="#pricing">Pricing</a>
          <a href="#contact">Contact</a>
          <a href="#first" className="so-btn-nav">First Class Free</a>
        </div>
      </nav>

      {/* SPLIT-LAYOUT HERO */}
      <section id="first" className="so-hero">
        {/* Left — video */}
        <div className="so-hero-video-panel">
          <video autoPlay muted loop playsInline
            poster="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=900&q=80"
          >
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-woman-doing-pilates-exercises-in-a-gym-22862-large.mp4"
              type="video/mp4"
            />
          </video>
          <div className="so-hero-video-overlay" />
          <div className="so-hero-seam" />
          <div className="so-video-corner">
            <span className="so-video-corner-dot" />
            <span className="so-video-corner-text">Live class — Core + Resistance</span>
          </div>
        </div>

        {/* Right — copy */}
        <div className="so-hero-copy-panel">
          <div className="so-hero-tag">San Francisco, CA</div>
          <h1 data-cg-el="hero_headline_1" className="so-hero-title">
            Reformer<br />Strength<br /><em>Redefined.</em>
          </h1>
          <p data-cg-el="hero_subtitle" className="so-hero-sub">
            Spring-loaded resistance. Precision coaching. 45 minutes that will change the way you think about Pilates — and your body.
          </p>
          <div className="so-hero-actions">
            <a data-cg-el="hero_cta_primary" href="#pricing" className="so-btn-primary">First Class Free</a>
            <a data-cg-el="hero_cta_secondary" href="#classes" className="so-btn-ghost">View Schedule</a>
          </div>

          <div className="so-hero-stats">
            {siteData.stats.map((s) => (
              <div key={s.label}>
                <div className="so-hs-value">{s.value}</div>
                <div className="so-hs-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* METHOD */}
      <section id="method" className="so-method-section">
        <div className="so-method-inner">
          <div className="so-method-header reveal">
            <div>
              <span className="so-section-tag">The SOLID Method</span>
              <h2 className="so-section-title">Built<br />Different</h2>
            </div>
            <p className="so-section-sub">
              Every principle in our system is chosen because it works. No filler, no fluff — just the mechanics of building real strength on a reformer.
            </p>
          </div>
          <div className="so-method-grid">
            {siteData.methods.map((m, i) => (
              <div key={m.name} className="so-method-cell reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="so-method-icon">{m.icon}</div>
                <div className="so-method-name">{m.name}</div>
                <p className="so-method-desc">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLASSES */}
      <section id="classes" className="so-classes-section">
        <div className="so-classes-inner">
          <div className="so-classes-header reveal">
            <span className="so-section-tag">Class Lineup</span>
            <h2 className="so-section-title">Every Class,<br />Full Effort</h2>
            <p className="so-section-sub">
              Six class formats designed to challenge every level — whether you&apos;re brand new to a reformer or a seasoned practitioner looking for more.
            </p>
          </div>
          <div className="so-classes-grid">
            {siteData.classes.map((c, i) => (
              <div key={c.name} className="so-class-cell reveal" style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="so-class-badges">
                  <span className="so-badge so-badge-level">{c.level}</span>
                  <span className="so-badge so-badge-dur">{c.duration}</span>
                </div>
                <div className="so-class-name">{c.name}</div>
                <p className="so-class-desc">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="so-pricing-section">
        <div className="so-pricing-inner">
          <div className="so-pricing-header reveal">
            <span className="so-section-tag">Membership</span>
            <h2 className="so-section-title">Invest<br />In Yourself</h2>
            <p className="so-section-sub">
              Simple pricing. No initiation fees. Your first class is always on us — then choose the plan that fits your routine.
            </p>
          </div>
          <div className="so-pricing-grid">
            {siteData.pricing.map((p, i) => (
              <div key={p.name} className={`so-price-card reveal${p.highlight ? ' highlight' : ''}`} style={{ transitionDelay: `${i * 100}ms` }}>
                {p.highlight && <span className="so-popular-badge">Best Value</span>}
                <div className="so-price-name">{p.name}</div>
                <div className="so-price-amount">{p.price}</div>
                <div className="so-price-period">{p.period}</div>
                <ul className="so-price-features">
                  {p.features.map((f) => (
                    <li key={f}><span className="so-check">✓</span>{f}</li>
                  ))}
                </ul>
                <a href="#first" className="so-price-cta">Get Started</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="so-cta-section">
        <div className="so-cta-inner">
          <h2 className="so-cta-title reveal">
            Get<br /><span>SOLID.</span>
          </h2>
          <p className="so-cta-sub reveal">
            Your first class is free. Come in, feel the resistance, and understand why our members show up five times a week.
          </p>
          <a href="#first" className="so-btn-cta reveal">Book Your Free Class</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="so-footer">
        <div className="so-footer-inner">
          <div>
            <div className="so-footer-logo"><span>SOLID</span> Strength</div>
            <p className="so-footer-desc">
              {siteData.gym.address}<br />
              {siteData.gym.phone}<br />
              {siteData.gym.email}
            </p>
          </div>
          <div>
            <div className="so-footer-h">Train</div>
            <ul className="so-footer-links">
              <li><a href="#classes">Schedule</a></li>
              <li><a href="#method">Our Method</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#">Corporate Wellness</a></li>
            </ul>
          </div>
          <div>
            <div className="so-footer-h">Studio</div>
            <ul className="so-footer-links">
              <li><a href="#">First Visit</a></li>
              <li><a href="#">Coaches</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="so-footer-bottom">
          <span>© {new Date().getFullYear()} SOLID Strength. All rights reserved.</span>
          <span>Powered by <a href="https://koriva.com" className="so-footer-brand">Koriva</a></span>
        </div>
      </footer>
    </>
  );
}
