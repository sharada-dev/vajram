import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { usePageMotion } from "../lib/motion";
import Magnetic from "../components/Magnetic";
import VenueCard from "../components/VenueCard";
import { VENUES, BRAND_BLURB } from "../content";
import Home from "./Home";

gsap.registerPlugin(ScrollTrigger);

/* =====================================================================
   Cinematic home — alethia.earth's homepage grammar, Vajram's skin.

   Act 1  Full-bleed arrival: garden doorway fills the viewport, mono
          eyebrow top-left, statement text over it; the image ZOOMS IN
          as you scroll while pinned.
   Act 2  A cream editorial sheet slides up over it: centered headline
          with a scattered collage of photos + stat chips, each drifting
          at its own parallax speed and gently scaling.
   Act 3  Full-bleed zoom-OUT break: the aerial garden reveals from 1.35
          scale to full frame, a single line rising over it.
   Act 4  The three estates.   Act 5  Invitation.
   Reduced motion → classic home.
   ===================================================================== */

const A = import.meta.env.BASE_URL + "assets";

const CHAPTERS = ["Arrival", "Heritage", "Gardens", "Estates", "Invitation"];

/* Scatter collage — image cards and stat chips, alethia's bento-scatter.
   speed: parallax multiplier (± drift as the section passes). */
const CARDS = [
  { kind: "img", src: `${A}/story-lakshmi.png`,       cls: "c1", speed: -1.1, alt: "Thanjavur Lakshmi painting" },
  { kind: "chip", cls: "c2 chip-dark", n: "170", l: "guests · Backyard, Bengaluru" },
  { kind: "img", src: `${A}/life/chan-02.jpg`,        cls: "c3", speed: 1.3,  alt: "Thotti Mane courtyard" },
  { kind: "img", src: `${A}/prod-stone-buddha.png`,   cls: "c4", speed: -0.7, alt: "Stone Buddha" },
  { kind: "chip", cls: "c5 chip-gold", n: "ತೊಟ್ಟಿ ಮನೆ", l: "courtyard homes, kept alive" },
  { kind: "img", src: `${A}/life/kolur-entrance.jpg`, cls: "c6", speed: 0.9,  alt: "Kolur cottage entrance" },
  { kind: "chip", cls: "c7 chip-dark", n: "6 – 170", l: "guests · three estates" },
  { kind: "img", src: `${A}/life-backyard.png`,       cls: "c8", speed: -1.4, alt: "Backyard gardens" },
] as const;

export default function Home3D() {
  const reduce = useReducedMotion();
  if (reduce) return <Home />;
  return <CinematicHome />;
}

function CinematicHome() {
  const root = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  usePageMotion(root, []);

  useLayoutEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      // page progress → rail
      ScrollTrigger.create({
        trigger: ".alhome", start: "top top", end: "bottom bottom",
        onUpdate: (self) => {
          if (fillRef.current) fillRef.current.style.transform = `scaleY(${self.progress})`;
          if (railRef.current) {
            const idx = Math.min(CHAPTERS.length - 1, Math.floor(self.progress * CHAPTERS.length));
            railRef.current.querySelectorAll(".j3d-rail__label").forEach((el, i) =>
              el.classList.toggle("on", i === idx));
          }
        },
      });

      // ACT 1 — pinned hero: image zooms IN, statement drifts and fades late
      gsap.fromTo(".al-hero__img", { scale: 1 }, {
        scale: 1.22, ease: "none",
        scrollTrigger: { trigger: ".al-hero", start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".al-hero__inner", {
        autoAlpha: 0, y: -60, ease: "none",
        scrollTrigger: { trigger: ".al-hero", start: "40% top", end: "bottom top", scrub: true },
      });

      // ACT 2 — scatter cards: per-card parallax drift + gentle zoom through
      gsap.utils.toArray<HTMLElement>(".al-card").forEach((el) => {
        const speed = parseFloat(el.dataset.speed || "0");
        if (speed) {
          gsap.fromTo(el, { yPercent: 26 * speed }, {
            yPercent: -26 * speed, ease: "none",
            scrollTrigger: { trigger: ".al-scatter", start: "top bottom", end: "bottom top", scrub: true },
          });
        }
        gsap.fromTo(el, { scale: 0.92 }, {
          scale: 1.04, ease: "none",
          scrollTrigger: { trigger: ".al-scatter", start: "top 85%", end: "bottom 15%", scrub: true },
        });
      });

      // ACT 3 — pinned break: aerial garden zooms OUT from 1.35 → 1, then eases past
      gsap.fromTo(".al-break__img", { scale: 1.35 }, {
        scale: 1, ease: "none",
        scrollTrigger: { trigger: ".al-break", start: "top bottom", end: "top top", scrub: true },
      });
      gsap.fromTo(".al-break__img", { scale: 1 }, {
        scale: 1.12, ease: "none", immediateRender: false,
        scrollTrigger: { trigger: ".al-break", start: "top top", end: "bottom top", scrub: true },
      });
      gsap.fromTo(".al-break__line", { autoAlpha: 0, y: 70 }, {
        autoAlpha: 1, y: 0, ease: "none",
        scrollTrigger: { trigger: ".al-break", start: "top 25%", end: "top -35%", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div className="page alhome" ref={root}>
      {/* ================= ACT 1 · ARRIVAL ================= */}
      <section className="al-hero">
        <div className="al-hero__pin">
          <img className="al-hero__img" src={`${A}/hero-door.jpg`} alt="The garden doorway at Vajram" />
          <div className="al-hero__scrim" aria-hidden />
          <div className="vhero__veil" aria-hidden />
          <div className="al-hero__inner" data-hero>
            <p className="al-mono" data-anim>Antiques · Gardens ·<br />Gatherings —<br />Bengaluru, Karnataka</p>
            <div className="al-hero__statement hero-title">
              <p>Born from a deep reverence for India's artisanal heritage — spaces where the past is not preserved, but breathed into everyday life.</p>
            </div>
            <div className="al-hero__brand" data-anim>Vajram</div>
            <div className="j3d-hero__cue al-hero__cue" data-anim>Scroll</div>
          </div>
        </div>
      </section>

      {/* ================= ACT 2 · HERITAGE (cream sheet + scatter) ================= */}
      <section className="al-scatter">
        <div className="al-scatter__center">
          <span className="al-pill" data-reveal>The Vajram Difference</span>
          <h2 data-split>Where craft, garden and gathering meet.</h2>
          <p className="al-scatter__sub" data-reveal>{BRAND_BLURB}</p>
        </div>
        {CARDS.map((c) =>
          c.kind === "img" ? (
            <figure key={c.cls} className={`al-card al-card--img ${c.cls}`} data-speed={c.speed}>
              <img src={c.src} alt={c.alt} loading="lazy" />
            </figure>
          ) : (
            <div key={c.cls} className={`al-card al-card--chip ${c.cls}`}>
              <b>{c.n}</b><span>{c.l}</span>
            </div>
          )
        )}
      </section>

      {/* ================= ACT 3 · GARDENS (zoom-out break) ================= */}
      <section className="al-break">
        <div className="al-break__pin">
          <img className="al-break__img" src={`${A}/life/space-aerial.jpg`} alt="Aerial view of the Vajram gardens" />
          <div className="al-break__scrim" aria-hidden />
          <div className="al-break__line">
            <p className="al-mono">02 · Gardens</p>
            <h2>A green sanctuary<br />inside the city.</h2>
          </div>
        </div>
      </section>

      {/* ================= ACT 4 · ESTATES ================= */}
      <section className="block al-estates">
        <div className="wrap">
          <div className="al-estates__head" data-reveal>
            <span className="al-pill">Life Events</span>
            <h2 data-split>Three estates for the moments that matter.</h2>
          </div>
          <div className="venue-grid">
            {VENUES.map((v) => <VenueCard key={v.slug} venue={v} />)}
          </div>
        </div>
      </section>

      {/* ================= ACT 5 · INVITATION ================= */}
      <section className="block al-cta">
        <div className="wrap" data-reveal>
          <span className="al-pill">Begin Yours</span>
          <h2 data-split>Every corner tells a story.</h2>
          <p className="al-cta__sub">Explore the spaces and farms, or tell us about the gathering you're dreaming of.</p>
          <div className="al-cta__actions">
            <Magnetic><Link className="btn-gold" to="/life-events">Explore Spaces &amp; Farms</Link></Magnetic>
            <Magnetic><Link className="btn-solid" to="/reach-us">Check Availability</Link></Magnetic>
          </div>
        </div>
      </section>

      {/* progress rail */}
      <div className="j3d-rail" ref={railRef} aria-hidden>
        <div className="j3d-rail__track"><div className="j3d-rail__fill" ref={fillRef} /></div>
        <div className="j3d-rail__labels">
          {CHAPTERS.map((c, i) => <span key={c} className={`j3d-rail__label${i === 0 ? " on" : ""}`}>{c}</span>)}
        </div>
      </div>
    </div>
  );
}
