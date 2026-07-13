import { useRef, type MouseEvent } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { usePageMotion } from "../lib/motion";
import { categoryBySlug, PRODUCTS, type Product } from "../content";

/* Shop category — editorial grid with 3D-tilt cards. */

export default function ShopCategory() {
  const { category } = useParams();
  const cat = categoryBySlug(category);
  const root = useRef<HTMLDivElement>(null);
  usePageMotion(root, [category]);

  if (!cat) return <Navigate to="/shop" replace />;
  const items = PRODUCTS.filter((p) => p.cat === cat.slug);

  return (
    <div className="page shc" ref={root}>
      <section className="shc-hero" data-hero>
        <img src={cat.image} alt={cat.name} />
        <div className="vd-scrim" aria-hidden />
        <div className="vhero__veil" aria-hidden />
        <nav className="shc-crumb vd-mono" aria-label="Breadcrumb">
          <Link to="/shop">Shop</Link><span>/</span><em>{cat.name}</em>
        </nav>
        <div className="shc-hero__inner">
          <p className="vd-mono vd-eyebrow" data-anim>{items.length} pieces</p>
          <h1 data-split>{cat.name}</h1>
          <div className="vd-rule" aria-hidden />
        </div>
      </section>

      <section className="shc-craft">
        <p className="vd-mono vd-k" data-reveal>The Craft</p>
        <p className="shc-craft__text" data-reveal>{cat.craft}</p>
        <div className="shc-craft__facts">
          {cat.facts.map((f) => (
            <div key={f.l} className="shp-fact shp-fact--ink" data-reveal><b>{f.n}</b><span className="vd-mono">{f.l}</span></div>
          ))}
        </div>
      </section>

      <section className="shc-grid">
        {items.map((p, i) => <TiltCard key={p.slug} p={p} i={i} />)}
      </section>

      <section className="vd-invite">
        <h2 data-split>See them in person.</h2>
        <p className="vd-invite__sub" data-reveal>Photographs flatten gold and stone. The gallery in Bengaluru does not.</p>
        <div className="vd-invite__actions" data-reveal>
          <Link className="vd-btn vd-mono" to="/reach-us">Plan a Visit</Link>
        </div>
      </section>
    </div>
  );
}

function TiltCard({ p, i }: { p: Product; i: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 140, damping: 18 });
  const sy = useSpring(my, { stiffness: 140, damping: 18 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-7, 7]);

  const onMove = (e: MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.div ref={ref} className="shc-card" data-reveal
      onMouseMove={onMove} onMouseLeave={onLeave}
      style={reduce ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d", transformPerspective: 1100 }}>
      <Link to={`/shop/${p.cat}/${p.slug}`}>
        <span className="shc-card__num vd-mono">{String(i + 1).padStart(2, "0")}</span>
        <div className="shc-card__media"><img src={p.image} alt={p.name} loading="lazy" /></div>
        <h3>{p.name}</h3>
        <p>{p.line}</p>
        <span className="vle-more vd-mono">View the piece</span>
      </Link>
    </motion.div>
  );
}
