import { lazy, Suspense, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { usePageMotion } from "../lib/motion";
import Magnetic from "../components/Magnetic";
import LampGate, { shouldShowLamp } from "../components/LampGate";
import Home from "./Home";

const GoldDust = lazy(() => import("../components/GoldDust"));

gsap.registerPlugin(ScrollTrigger);

/* =====================================================================
   Home — implemented from "Vajram Home.dc.html" (Claude Design).
   Act I   Arrival: pinned hero-reveal, giant VAJRAM wordmark, gold dust.
   Act II  Heritage: white sheet slides over; drifting photo cards + stat
           chips around a centered headline.
   Act III Gardens: pinned zoom-out reveal, headline rises mid-pin.
   Act IV  Estates: terracotta band, three editorial estate cards.
   Act V   Invitation: terracotta close.
   Reduced motion → classic home.
   ===================================================================== */

const A = import.meta.env.BASE_URL + "assets";

const CHAPTERS = ["Arrival", "Heritage", "Gardens", "Estates", "Invitation"];

type Card =
  | { kind: "img"; src: string; alt: string; left: string; top: number; w: string; ar: string; speed: number }
  | { kind: "chip"; n: string; l: string; left: string; top: number; speed: number };

/* positions from the design source (1500px-tall field) */
const CARDS: Card[] = [
  { kind: "img", src: `${A}/story-buddha.png`,   alt: "Stone Buddha",        left: "75%",   top: 120,  w: "clamp(150px,19vw,280px)", ar: "7/9",   speed: 1.1 },
  { kind: "img", src: `${A}/story-lakshmi.png`,  alt: "Thanjavur Lakshmi",   left: "5.5%",  top: 180,  w: "clamp(130px,16vw,240px)", ar: "3/4",   speed: -0.7 },
  { kind: "img", src: `${A}/life/chan-02.jpg`,   alt: "Courtyard pillars",   left: "62.5%", top: 660,  w: "clamp(180px,25vw,360px)", ar: "18/13", speed: -0.6 },
  { kind: "img", src: `${A}/life/space-02.jpg`,  alt: "Antique spaces",      left: "9.7%",  top: 640,  w: "clamp(190px,26vw,380px)", ar: "19/14", speed: 0.85 },
  { kind: "img", src: `${A}/prod-stone-pot.png`, alt: "Carved stone pot",    left: "41%",   top: 790,  w: "clamp(140px,18vw,260px)", ar: "13/17", speed: 1.4 },
  { kind: "chip", n: "170", l: "Guests Hosted",        left: "79%",   top: 560,  speed: -1.1 },
  { kind: "chip", n: "03",  l: "Estates in Karnataka", left: "26.4%", top: 560,  speed: 1.2 },
  { kind: "chip", n: "EST.", l: "Bengaluru · Karnataka", left: "80%", top: 1080, speed: 0.7 },
];

const ESTATES = [
  { src: `${A}/life-backyard.png`,      name: "Backyard Antiques & Gardens", meta: "Bengaluru · 170 guests",   to: "/life-events/vajram-spaces/backyard" },
  { src: `${A}/life/chan-01.jpg`,       name: "Channarayapatna",             meta: "Thotti Mane · 25 guests",  to: "/life-events/vajram-farms/channarayapatna" },
  { src: `${A}/life/kolur-entrance.jpg`, name: "Kolur",                      meta: "Heritage cottage · 6 guests", to: "/life-events/vajram-farms/kolur" },
];

export default function Home3D() {
  const reduce = useReducedMotion();
  if (reduce) return <Home />;
  return <DesignHome />;
}

function DesignHome() {
  const root = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [lampOn, setLampOn] = useState(shouldShowLamp);
  usePageMotion(root, []);

  useLayoutEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ".vd", start: "top top", end: "bottom bottom",
        onUpdate: (self) => {
          if (fillRef.current) fillRef.current.style.transform = `scaleY(${self.progress})`;
          if (railRef.current) {
            const idx = Math.min(CHAPTERS.length - 1, Math.floor(self.progress * CHAPTERS.length));
            railRef.current.querySelectorAll(".j3d-rail__label").forEach((el, i) =>
              el.classList.toggle("on", i === idx));
          }
        },
      });

      // Act I — hero zooms in through the pin
      gsap.fromTo(".vd-hero__img", { scale: 1 }, {
        scale: 1.22, ease: "none",
        scrollTrigger: { trigger: ".vd-arrival", start: "top top", end: "bottom top", scrub: true },
      });

      // Act II — cards drift + settle in
      gsap.utils.toArray<HTMLElement>(".vd-card").forEach((el) => {
        const speed = parseFloat(el.dataset.speed || "0");
        if (speed) {
          gsap.fromTo(el, { yPercent: 24 * speed }, {
            yPercent: -24 * speed, ease: "none",
            scrollTrigger: { trigger: ".vd-heritage", start: "top bottom", end: "bottom top", scrub: true },
          });
        }
        gsap.fromTo(el, { scale: 0.86, autoAlpha: 0 }, {
          scale: 1, autoAlpha: 1, ease: "none",
          scrollTrigger: { trigger: el, start: "top 105%", end: "top 55%", scrub: true },
        });
      });

      // Act III — zoom-out reveal then ease past; headline rises mid-pin
      gsap.fromTo(".vd-gardens__img", { scale: 1.35 }, {
        scale: 1, ease: "none",
        scrollTrigger: { trigger: ".vd-gardens", start: "top bottom", end: "top top", scrub: true },
      });
      gsap.fromTo(".vd-gardens__img", { scale: 1 }, {
        scale: 1.12, ease: "none", immediateRender: false,
        scrollTrigger: { trigger: ".vd-gardens", start: "top top", end: "bottom top", scrub: true },
      });
      gsap.fromTo(".vd-gardens__head", { autoAlpha: 0, y: 46 }, {
        autoAlpha: 1, y: 0, ease: "none",
        scrollTrigger: { trigger: ".vd-gardens", start: "top 20%", end: "top -40%", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div className="page vd" ref={root}>
      {lampOn && <LampGate onDone={() => setLampOn(false)} />}
      {/* ============ ACT I · ARRIVAL ============ */}
      <section className="vd-arrival">
        <div className="vd-pin">
          <img className="vd-hero__img" src={`${A}/hero-reveal.png`} alt="Vajram heritage entrance" />
          <div className="vd-scrim" aria-hidden />
          <Suspense fallback={null}><GoldDust /></Suspense>
          <div className="vd-hero__inner" data-hero>
            <div className="vhero__veil" aria-hidden />
            <p className="vd-mono vd-eyebrow" data-anim>Antiques &amp; Gardens</p>
            <div className="vd-wordmark hero-title">VAJRAM</div>
            <div className="vd-rule" aria-hidden />
            <p className="vd-mono vd-tagline" data-anim>The past, breathed into everyday life</p>
          </div>
          <div className="vd-cue" aria-hidden><span className="vd-mono">Scroll</span><i /></div>
        </div>
      </section>

      {/* ============ ACT II · HERITAGE ============ */}
      <section className="vd-heritage">
        <div className="vd-heritage__center">
          <p className="vd-mono vd-k" data-reveal>Act II — Heritage</p>
          <h2 data-split>Collected, carved, and kept alive.</h2>
          <p className="vd-sub" data-reveal>Idols, stonework and Tanjore paintings — gathered not as relics behind glass, but as living things placed where people gather.</p>
        </div>
        {CARDS.map((c, i) =>
          c.kind === "img" ? (
            <figure key={i} className="vd-card vd-card--img" data-speed={c.speed}
              style={{ left: c.left, top: c.top, width: c.w, aspectRatio: c.ar }}>
              <img src={c.src} alt={c.alt} loading="lazy" />
            </figure>
          ) : (
            <div key={i} className="vd-card vd-card--chip" data-speed={c.speed} style={{ left: c.left, top: c.top }}>
              <b>{c.n}</b><span className="vd-mono">{c.l}</span>
            </div>
          )
        )}
      </section>

      {/* ============ ACT III · GARDENS ============ */}
      <section className="vd-gardens">
        <div className="vd-pin">
          <img className="vd-gardens__img" src={`${A}/life/farms-entrance.jpg`} alt="Vajram farm gardens" />
          <div className="vd-scrim" aria-hidden />
          <div className="vd-gardens__head">
            <p className="vd-mono vd-k vd-k--gold">Act III — Gardens</p>
            <h2>Organic farms,<br />living courtyards.</h2>
          </div>
        </div>
      </section>

      {/* ============ ACT IV · ESTATES ============ */}
      <section className="vd-estates">
        <div className="vd-estates__head">
          <span className="vd-pill vd-mono" data-reveal>Life Events</span>
          <span className="vd-mono vd-actlabel">Act IV</span>
        </div>
        <h2 data-split>Three estates for the moments that matter.</h2>
        <div className="vd-estates__grid">
          {ESTATES.map((e) => (
            <Link key={e.name} className="vd-estate" to={e.to}>
              <div className="vd-estate__media"><img src={e.src} alt={e.name} loading="lazy" /><span className="vd-estate__scrim" /></div>
              <h3>{e.name}</h3>
              <p className="vd-mono">{e.meta}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ============ ACT V · INVITATION ============ */}
      <section className="vd-invite">
        <p className="vd-mono vd-k vd-k--goldsoft" data-reveal>Act V — Invitation</p>
        <h2 data-split>Begin your Vajram story.</h2>
        <p className="vd-invite__sub" data-reveal>Walk the gardens, sit beneath the carved pillars, and let the estates speak for themselves.</p>
        <div className="vd-invite__actions" data-reveal>
          <Magnetic><Link className="vd-btn vd-mono" to="/reach-us">Check Availability</Link></Magnetic>
          <Magnetic><Link className="vd-btn vd-btn--ghost vd-mono" to="/reach-us">Write to Us</Link></Magnetic>
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
