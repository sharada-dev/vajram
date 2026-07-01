import { useEffect, useRef, useState, type PointerEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion, type MotionValue } from "framer-motion";

/**
 * Coverflow gallery — adapted from Mantrika's hero CardStage.
 * A spring-smoothed motion value drives every image's transform by its
 * distance from the active index (x / scale / opacity / rotateY / z).
 * Auto-advances, pauses on hover, swipeable, with a progress-dot scroller.
 */
const AUTO_MS = 3200;

export default function CoverflowGallery({ images, onOpen }: { images: string[]; onOpen?: (i: number) => void }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const N = images.length;

  const activeMv = useMotionValue(0);
  const smooth = useSpring(activeMv, { stiffness: 110, damping: 24, mass: 0.8, restDelta: 0.001 });
  useEffect(() => { activeMv.set(active); }, [active, activeMv]);

  const go = (i: number) => setActive((i + N) % N);

  // auto-advance
  useEffect(() => {
    if (paused || reduce || N <= 1) return;
    const t = setInterval(() => setActive((i) => (i + 1) % N), AUTO_MS);
    return () => clearInterval(t);
  }, [paused, reduce, N]);

  // swipe / drag
  const down = useRef<number | null>(null);
  const onDown = (e: PointerEvent) => { down.current = e.clientX; setPaused(true); };
  const onUp = (e: PointerEvent) => {
    if (down.current !== null) {
      const dx = e.clientX - down.current;
      if (dx < -45) go(active + 1);
      else if (dx > 45) go(active - 1);
    }
    down.current = null;
  };

  // reduced motion → simple responsive grid (no movement)
  if (reduce) {
    return (
      <div className="cf-grid">
        {images.map((src, i) => (
          <figure key={i} onClick={() => onOpen?.(i)}><img src={src} alt={`Image ${i + 1}`} loading="lazy" /></figure>
        ))}
      </div>
    );
  }

  return (
    <motion.div className="cf" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
      <button className="cf-arrow cf-prev" aria-label="Previous" onClick={() => go(active - 1)}>‹</button>

      <div className="cf-stage"
        onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
        onPointerDown={onDown} onPointerUp={onUp} onPointerCancel={() => (down.current = null)}>
        <span className="cf-glow" aria-hidden />
        {images.map((src, i) => (
          <CoverflowItem key={i} src={src} index={i} smooth={smooth}
            isActive={i === active}
            onClick={() => (i === active ? onOpen?.(i) : go(i))} />
        ))}
      </div>

      <button className="cf-arrow cf-next" aria-label="Next" onClick={() => go(active + 1)}>›</button>

      <div className="cf-dots">
        {images.map((_, i) => (
          <button key={i} type="button" aria-label={`Go to image ${i + 1}`}
            className={`cf-dot${i === active ? " on" : ""}`} onClick={() => go(i)} />
        ))}
      </div>
      <div className="cf-count">{active + 1} <span>/</span> {N}</div>
    </motion.div>
  );
}

function CoverflowItem({ src, index, smooth, isActive, onClick }:
  { src: string; index: number; smooth: MotionValue<number>; isActive: boolean; onClick: () => void }) {
  const distance = useTransform(smooth, (a) => index - a);
  const x = useTransform(distance, (d) => d * 300);
  const scale = useTransform(distance, (d) => Math.max(0.6, 1 - Math.abs(d) * 0.16));
  const opacity = useTransform(distance, (d) => {
    const a = Math.abs(d);
    if (a < 0.5) return 1;
    if (a < 1.5) return 0.55;
    return Math.max(0.1, 1 - a * 0.3);
  });
  const rotateY = useTransform(distance, (d) => Math.max(-28, Math.min(28, -d * 14)));
  const z = useTransform(distance, (d) => -Math.abs(d) * 120);
  const zIndex = useTransform(distance, (d) => 50 - Math.round(Math.abs(d) * 10));

  return (
    <motion.figure className={`cf-card${isActive ? " is-active" : ""}`}
      style={{ x, scale, opacity, rotateY, z, zIndex, transformStyle: "preserve-3d", willChange: "transform, opacity" }}
      onClick={onClick}>
      <img src={src} alt={`Kolur ${index + 1}`} draggable={false} />
      {isActive && <span className="cf-zoom" aria-hidden>⤢</span>}
    </motion.figure>
  );
}
