import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";

/* =====================================================================
   LampGate — "pull the cord, light the house."
   A first-visit gate: a brass pendant lamp sways in the dark; pulling
   the cord (drag down, or simply click/tap/Enter) clicks the light on,
   floods the screen warm, and reveals the homepage.
   Guardrails: session-once, skippable, auto-lights after 6s idle,
   never shown to reduced-motion users or after deep-link navigation.
   ===================================================================== */

const PULL_DISTANCE = 110;

/* In-memory flag: resets on every real page load (refresh / new tab), so the
   lamp greets every load of the homepage — but not SPA hops back to "/". */
let shownThisLoad = false;

export function shouldShowLamp(): boolean {
  return !shownThisLoad;
}

export default function LampGate({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();
  const [lit, setLit] = useState(false);
  const [gone, setGone] = useState(false);
  const pulled = useRef(false);

  const y = useMotionValue(0);
  const ys = useSpring(y, { stiffness: 420, damping: 22, mass: 0.6 });
  // cord stretches from its 150px rest length as the knob travels
  const cordScale = useTransform(ys, (v) => 1 + Math.max(0, v) / 150);

  const light = () => {
    if (pulled.current) return;
    pulled.current = true;
    shownThisLoad = true;
    setLit(true);
    y.set(0); // cord snaps back on the spring
    setTimeout(() => setGone(true), 950);
    setTimeout(onDone, 1600);
  };

  // idle auto-light so nobody is ever stuck
  useEffect(() => {
    const t = setTimeout(light, 6000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // reduced motion: light immediately, no theatre
  useEffect(() => { if (reduce) light(); }, [reduce]); // eslint-disable-line react-hooks/exhaustive-deps

  if (gone && lit) {
    return null;
  }

  return (
    <motion.div className={`lamp${lit ? " is-lit" : ""}`} aria-label="Pull the cord to light the lamp"
      animate={lit ? { opacity: 0 } : { opacity: 1 }}
      transition={lit ? { duration: 0.7, delay: 0.85, ease: [0.22, 0.61, 0.36, 1] } : undefined}>

      {/* warm flood that blooms from the bulb when lit */}
      <div className="lamp__flood" aria-hidden />

      {/* swaying pendant */}
      <div className="lamp__rig" aria-hidden>
        <div className="lamp__wire" />
        <div className="lamp__pendant">
          <svg viewBox="0 0 120 96" width="120" height="96" fill="none">
            {/* shade */}
            <path d="M60 4 L96 56 H24 Z" fill="#8a5a28" stroke="#D89A44" strokeWidth="1.6" />
            <path d="M60 4 L96 56" stroke="#E9C888" strokeWidth=".9" opacity=".6" />
            <path d="M60 4 L24 56" stroke="#E9C888" strokeWidth=".9" opacity=".6" />
            <rect x="54" y="0" width="12" height="6" rx="2" fill="#D89A44" />
            {/* bulb */}
            <circle className="lamp__bulb" cx="60" cy="66" r="11" fill="#3a2a18" stroke="#D89A44" strokeWidth="1.2" />
          </svg>
          <span className="lamp__glow" />
        </div>

        {/* the cord — stretches with the knob */}
        <motion.div className="lamp__cord" style={{ scaleY: cordScale }} />
        <motion.button
          className="lamp__knob"
          style={{ y: ys }}
          drag="y"
          dragConstraints={{ top: 0, bottom: PULL_DISTANCE + 60 }}
          dragElastic={0.32}
          dragSnapToOrigin
          onDrag={(_, info) => { if (info.offset.y > PULL_DISTANCE) light(); }}
          onClick={light}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") light(); }}
          aria-label="Pull to light the lamp"
        />
      </div>

      <p className="lamp__hint">Pull the cord</p>
      <button className="lamp__skip" onClick={light}>Skip →</button>
    </motion.div>
  );
}
