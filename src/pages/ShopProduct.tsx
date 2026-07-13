import { useLayoutEffect, useRef } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePageMotion } from "../lib/motion";
import Magnetic from "../components/Magnetic";
import { productBySlug, categoryBySlug, PRODUCTS, CONTACT } from "../content";

gsap.registerPlugin(ScrollTrigger);

/* Product detail — sticky portrait, oversized serif, craft note, enquiry CTA. */

export default function ShopProduct() {
  const { slug } = useParams();
  const p = productBySlug(slug);
  const root = useRef<HTMLDivElement>(null);
  usePageMotion(root, [slug]);

  useLayoutEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(".shd-media img", { scale: 1.14 }, {
          scale: 1, ease: "none",
          scrollTrigger: { trigger: ".shd", start: "top bottom", end: "top top", scrub: true },
        });
      });
    }, root);
    return () => ctx.revert();
  }, [slug]);

  if (!p) return <Navigate to="/shop" replace />;
  const cat = categoryBySlug(p.cat)!;
  const idx = PRODUCTS.findIndex((x) => x.slug === p.slug);
  const prev = PRODUCTS[(idx - 1 + PRODUCTS.length) % PRODUCTS.length];
  const next = PRODUCTS[(idx + 1) % PRODUCTS.length];
  const related = PRODUCTS.filter((x) => x.cat === p.cat && x.slug !== p.slug).slice(0, 3);
  const mail = `mailto:${CONTACT.email}?subject=${encodeURIComponent("Enquiry — " + p.name)}&body=${encodeURIComponent("I'd love to know more about \"" + p.name + "\" (" + cat.name + ") — story, condition and price.")}`;

  return (
    <div className="page shd" ref={root} key={p.slug}>
      <section className="shd-split">
        <div className="shd-media" data-reveal>
          <img src={p.image} alt={p.name} />
        </div>
        <div className="shd-body">
          <nav className="shd-crumb vd-mono" aria-label="Breadcrumb">
            <Link to="/shop">Shop</Link><span>/</span>
            <Link to={`/shop/${cat.slug}`}>{cat.name}</Link>
          </nav>
          <p className="vd-mono vd-k" data-reveal>№ {String(idx + 1).padStart(2, "0")} — {cat.name}</p>
          <h1 data-split>{p.name}</h1>
          <p className="shd-line" data-reveal>{p.line}</p>
          <div className="shd-note" data-reveal>
            <p className="vd-mono shd-note__k">Craft note</p>
            <p>{p.note}</p>
          </div>
          <div className="shd-actions" data-reveal>
            <Magnetic><a className="vd-btn vd-mono" href={mail}>Enquire about this piece</a></Magnetic>
            <a className="vle-more vd-mono" href={`https://wa.me/9187575085?text=${encodeURIComponent("Enquiry — " + p.name)}`} target="_blank" rel="noreferrer">WhatsApp</a>
          </div>
          <p className="vd-mono shd-fine" data-reveal>No prices online — every piece is priced on condition &amp; provenance.</p>
        </div>
      </section>

      {/* prev / next */}
      <nav className="shd-nav" aria-label="More pieces">
        <Link to={`/shop/${prev.cat}/${prev.slug}`} className="shd-nav__link">
          <span className="vd-mono">← Previous</span><em>{prev.name}</em>
        </Link>
        <Link to={`/shop/${next.cat}/${next.slug}`} className="shd-nav__link shd-nav__link--r">
          <span className="vd-mono">Next →</span><em>{next.name}</em>
        </Link>
      </nav>

      {/* related */}
      {related.length > 0 && (
        <section className="shd-related">
          <p className="vd-mono vd-k" data-reveal>From the same tradition</p>
          <div className="shd-related__grid">
            {related.map((r) => (
              <Link key={r.slug} className="shd-rel" to={`/shop/${r.cat}/${r.slug}`} data-reveal>
                <div className="shd-rel__media"><img src={r.image} alt={r.name} loading="lazy" /></div>
                <h3>{r.name}</h3>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
