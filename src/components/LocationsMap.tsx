import { useMemo, useState } from "react";
import { geoMercator, geoPath } from "d3-geo";
import { motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { VENUES } from "../content";
import karnataka from "../data/karnataka.json";

const W = 720, H = 760;

export default function LocationsMap() {
  const reduce = useReducedMotion();
  const nav = useNavigate();
  const [hover, setHover] = useState<string | null>(null);

  const { districts, pins, links } = useMemo(() => {
    const fc = karnataka as unknown as { features: unknown[] };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const proj = geoMercator().fitExtent([[36, 36], [W - 36, H - 36]], karnataka as any);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const path = geoPath(proj as any);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const districts = (fc.features as any[]).map((f) => path(f) || "");
    const pins = VENUES.map((v) => {
      const p = proj(v.coords) as [number, number] | null;
      return p ? { v, x: p[0], y: p[1] } : null;
    }).filter(Boolean) as { v: (typeof VENUES)[number]; x: number; y: number }[];
    const links = pins.slice(1).map((p, i) => ({ a: pins[i], b: p }));
    return { districts, pins, links };
  }, []);

  return (
    <div className="kmap-wrap">
      <svg viewBox={`0 0 ${W} ${H}`} className="kmap" role="img" aria-label="Map of Vajram locations across Karnataka">
        <g className="kmap__land">
          {districts.map((d, i) => (
            <motion.path key={i} d={d} className="kmap__district"
              initial={reduce ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ delay: 0.01 * i, duration: 0.5 }} />
          ))}
        </g>
        <g className="kmap__links">
          {links.map((l, i) => (
            <motion.line key={i} x1={l.a.x} y1={l.a.y} x2={l.b.x} y2={l.b.y} className="kmap__link"
              initial={reduce ? false : { pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.9 }} viewport={{ once: true }}
              transition={{ delay: 0.9 + 0.25 * i, duration: 1, ease: [0.22, 1, 0.36, 1] }} />
          ))}
        </g>
        <g className="kmap__pins">
          {pins.map((p, i) => (
            <g key={p.v.slug} transform={`translate(${p.x},${p.y})`}
              className={`kmap__pin${hover === p.v.slug ? " on" : ""}`}
              tabIndex={0} role="button" aria-label={p.v.name}
              onMouseEnter={() => setHover(p.v.slug)} onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(p.v.slug)} onBlur={() => setHover(null)}
              onClick={() => nav(p.v.path)}
              onKeyDown={(e) => { if (e.key === "Enter") nav(p.v.path); }}>
              {!reduce && (
                <motion.circle className="kmap__halo" r={7}
                  animate={{ r: [7, 22], opacity: [0.5, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: i * 0.5 }} />
              )}
              <motion.circle className="kmap__ring" r={11}
                initial={reduce ? false : { scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }}
                transition={{ delay: 1.3 + i * 0.15, type: "spring", stiffness: 200, damping: 14 }} />
              <motion.circle className="kmap__dot" r={5}
                initial={reduce ? false : { scale: 0 }}
                whileInView={{ scale: 1 }} viewport={{ once: true }}
                transition={{ delay: 1.4 + i * 0.15, type: "spring", stiffness: 220, damping: 15 }} />
            </g>
          ))}
        </g>
      </svg>

      {pins.map((p) => (
        <div key={p.v.slug} className={`kmap-tip${hover === p.v.slug ? " show" : ""}`}
          style={{ left: `${(p.x / W) * 100}%`, top: `${(p.y / H) * 100}%` }} aria-hidden>
          <b>{p.v.name}</b>
          <span>{p.v.catLabel} · Up to {p.v.guests} guests</span>
        </div>
      ))}
    </div>
  );
}
