import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* =====================================================================
   ScatterGallery — the "Alethia Solves" pattern as a photo gallery.
   A tall cream section; centered pill + headline; photos scattered
   around the copy, each drifting at its own parallax speed while
   zooming in (0.9 → 1.06) as it crosses the viewport. Click → lightbox.
   Reduced motion: cards render statically (no scrubs registered).
   ===================================================================== */

type Slot = { top?: string; bottom?: string; left?: string; right?: string; w: string; ar: string; speed: number };

/* 13 slots — edges stay busy, the centre band stays clear for the copy. */
const SLOTS: Slot[] = [
  { top: "2%",  left: "4%",   w: "clamp(140px,16vw,290px)", ar: "4/3", speed: -1.2 },
  { top: "5%",  right: "6%",  w: "clamp(130px,14vw,250px)", ar: "3/4", speed: 1.0 },
  { top: "15%", left: "25%",  w: "clamp(110px,12vw,220px)", ar: "4/3", speed: 0.7 },
  { top: "21%", right: "23%", w: "clamp(100px,11vw,200px)", ar: "4/3", speed: -0.9 },
  { top: "33%", left: "3%",   w: "clamp(120px,13vw,240px)", ar: "3/4", speed: 1.3 },
  { top: "39%", right: "4%",  w: "clamp(140px,15vw,270px)", ar: "4/3", speed: -1.1 },
  { top: "52%", left: "7%",   w: "clamp(100px,11vw,210px)", ar: "4/3", speed: 0.8 },
  { top: "55%", right: "9%",  w: "clamp(110px,12vw,220px)", ar: "3/4", speed: -0.7 },
  { bottom: "17%", left: "23%",  w: "clamp(120px,13vw,240px)", ar: "4/3", speed: 1.1 },
  { bottom: "13%", right: "24%", w: "clamp(100px,11vw,210px)", ar: "4/3", speed: -1.3 },
  { bottom: "3%",  left: "5%",   w: "clamp(140px,15vw,270px)", ar: "4/3", speed: 0.9 },
  { bottom: "5%",  right: "5%",  w: "clamp(130px,14vw,250px)", ar: "3/4", speed: -0.8 },
  { bottom: "1%",  left: "43%",  w: "clamp(110px,12vw,220px)", ar: "4/3", speed: 1.2 },
];

export default function ScatterGallery({ images, name, onOpen }:
  { images: string[]; name: string; onOpen: (i: number) => void }) {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 761px)", () => {
        gsap.utils.toArray<HTMLElement>(".sg-card").forEach((el) => {
          const speed = parseFloat(el.dataset.speed || "0");
          if (speed) {
            gsap.fromTo(el, { yPercent: 22 * speed }, {
              yPercent: -22 * speed, ease: "none",
              scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
            });
          }
          // zoom in → out as the card itself crosses the viewport
          gsap.fromTo(el.querySelector("img"), { scale: 0.9 }, {
            scale: 1.08, ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          });
        });
      });
    }, root);
    return () => ctx.revert();
  }, [images]);

  return (
    <section className="sg" ref={root}>
      <div className="sg__center">
        <span className="al-pill" data-reveal>The Gallery</span>
        <h2 data-split>Explore {name}.</h2>
        <p className="sg__sub" data-reveal>Courtyards, verandahs and gardens — select any photograph to view it full-size.</p>
      </div>
      {images.map((src, i) => {
        const s = SLOTS[i % SLOTS.length];
        return (
          <figure key={src} className="sg-card" data-speed={s.speed}
            style={{ top: s.top, bottom: s.bottom, left: s.left, right: s.right, width: s.w, aspectRatio: s.ar }}
            onClick={() => onOpen(i)}>
            <img src={src} alt={`${name} — photograph ${i + 1}`} loading="lazy" draggable={false} />
          </figure>
        );
      })}
    </section>
  );
}
