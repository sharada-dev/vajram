import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePageMotion } from "../lib/motion";
import Magnetic from "../components/Magnetic";
import CountUp from "../components/CountUp";
import { SHOP_CATEGORIES, PRODUCTS } from "../content";

gsap.registerPlugin(ScrollTrigger);

/* =====================================================================
   Shop — landing. A gallery, not a storefront: enquiry-led like the
   original site (no prices, no cart).
   Signature motion: a pinned HORIZONTAL collection rail — the page
   scrolls the collection sideways through the viewport.
   ===================================================================== */

const A = import.meta.env.BASE_URL + "assets";
const MARQUEE = "Thanjavur Gold · Volcanic Stone · Antique Craft · Living Heritage · ";

export default function Shop() {
  const root = useRef<HTMLDivElement>(null);
  usePageMotion(root, []);

  useLayoutEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // hero image slow zoom while pinned
        gsap.fromTo(".shp-hero__img", { scale: 1 }, {
          scale: 1.18, ease: "none",
          scrollTrigger: { trigger: ".shp-hero", start: "top top", end: "bottom top", scrub: true },
        });
        // marquee drift tied to scroll direction-agnostic time loop is CSS; add scroll skew flourish
        gsap.to(".shp-marquee__inner", {
          xPercent: -50, ease: "none",
          scrollTrigger: { trigger: ".shp-marquee", start: "top bottom", end: "bottom top", scrub: 1.2 },
        });
      });
      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 761px)", () => {
        // pinned horizontal rail
        const track = document.querySelector<HTMLElement>(".shx__track");
        if (track) {
          const dist = () => track.scrollWidth - window.innerWidth;
          gsap.to(track, {
            x: () => -dist(), ease: "none",
            scrollTrigger: {
              trigger: ".shx", start: "top top", end: () => "+=" + dist(),
              scrub: true, pin: true, invalidateOnRefresh: true, anticipatePin: 1,
            },
          });
          // each card's image gently zooms out as the rail travels
          gsap.utils.toArray<HTMLElement>(".shx-card img").forEach((img) => {
            gsap.fromTo(img, { scale: 1.18 }, {
              scale: 1, ease: "none",
              scrollTrigger: { trigger: ".shx", start: "top top", end: () => "+=" + dist(), scrub: true },
            });
          });
        }
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div className="page shp" ref={root}>
      {/* hero */}
      <section className="shp-hero">
        <div className="shp-hero__pin">
          <img className="shp-hero__img" src={`${A}/shop-hero-interior.png`} alt="Inside the Vajram collection" />
          <div className="vd-scrim" aria-hidden />
          <div className="vhero__veil" aria-hidden />
          <div className="shp-hero__inner" data-hero>
            <p className="vd-mono vd-eyebrow" data-anim>The Vajram Shop</p>
            <h1 data-split>Objects with ancestors.</h1>
            <div className="vd-rule" aria-hidden />
            <p className="shp-hero__sub" data-anim>Thanjavur gold and carved volcanic stone — collected, restored, and ready for their next hundred years.</p>
          </div>
        </div>
      </section>

      {/* marquee ribbon */}
      <div className="shp-marquee" aria-hidden>
        <div className="shp-marquee__inner">
          <span>{MARQUEE.repeat(4)}</span>
        </div>
      </div>

      {/* category diptych */}
      <section className="shp-cats">
        {SHOP_CATEGORIES.map((c, i) => (
          <Link key={c.slug} className="shp-cat" to={`/shop/${c.slug}`} data-reveal>
            <span className="shp-cat__num vd-mono">{String(i + 1).padStart(2, "0")}</span>
            <div className="shp-cat__media"><img src={c.image} alt={c.name} loading="lazy" /></div>
            <div className="shp-cat__body">
              <h2>{c.name}</h2>
              <p>{c.tagline}</p>
              <span className="vle-more vd-mono">Enter the collection</span>
            </div>
          </Link>
        ))}
      </section>

      {/* pinned horizontal collection rail */}
      <section className="shx">
        <div className="shx__head">
          <p className="vd-mono vd-k" data-reveal>The Collection</p>
          <h2 data-split>Eleven pieces, one lineage.</h2>
          <p className="vd-mono shx__hint" data-reveal>Scroll ↓ to travel →</p>
        </div>
        <div className="shx__track">
          {PRODUCTS.map((p, i) => (
            <Link key={p.slug} className="shx-card" to={`/shop/${p.cat}/${p.slug}`}>
              <span className="shx-card__num">{String(i + 1).padStart(2, "0")}</span>
              <div className="shx-card__media"><img src={p.image} alt={p.name} loading="lazy" /></div>
              <h3>{p.name}</h3>
              <p className="vd-mono">{p.cat === "thanjavur-paintings" ? "Thanjavur" : "Bali"}</p>
            </Link>
          ))}
          <div className="shx-card shx-card--end">
            <p className="shx-end__big">…and the pieces that never make it online.</p>
            <Magnetic><Link className="vd-btn vd-mono" to="/reach-us">Visit the Gallery</Link></Magnetic>
          </div>
        </div>
      </section>

      {/* craft facts band */}
      <section className="shp-facts">
        <p className="vd-mono vd-k vd-k--goldsoft" data-reveal>Craft Notes</p>
        <h2 data-split>Numbers the hands remember.</h2>
        <div className="shp-facts__grid">
          <div className="shp-fact" data-reveal><b><CountUp end={22} suffix="K" /></b><span className="vd-mono">gold leaf on every Thanjavur crown</span></div>
          <div className="shp-fact" data-reveal><b><CountUp end={5} /></b><span className="vd-mono">layers from plank to painting</span></div>
          <div className="shp-fact" data-reveal><b><CountUp end={400} suffix="+" /></b><span className="vd-mono">years of court tradition</span></div>
          <div className="shp-fact" data-reveal><b><CountUp end={1} /></b><span className="vd-mono">block of stone per Bali piece</span></div>
        </div>
      </section>

      {/* CTA */}
      <section className="vd-invite shp-invite">
        <h2 data-split>Every piece is an enquiry away.</h2>
        <p className="vd-invite__sub" data-reveal>No carts, no checkout — tell us what moved you and we'll walk you through its story, condition and price.</p>
        <div className="vd-invite__actions" data-reveal>
          <Magnetic><Link className="vd-btn vd-mono" to="/reach-us">Enquire</Link></Magnetic>
        </div>
      </section>
    </div>
  );
}
