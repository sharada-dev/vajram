import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { NAV } from "../content";
import Magnetic from "./Magnetic";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [loc.pathname]);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}>
      <Link className="brand" to="/" aria-label="Vajram — Antiques & Gardens">
        <span className="brand-mark" aria-hidden>
          <svg viewBox="0 0 22 30" width="18" height="25" fill="none">
            <path d="M11 1 L20 11 L11 29 L2 11 Z" stroke="currentColor" strokeWidth="1.4" />
            <path d="M2 11 H20 M11 1 L7 11 L11 29 M11 1 L15 11 L11 29" stroke="currentColor" strokeWidth=".8" opacity=".65" />
          </svg>
        </span>
        <span className="brand-name">VAJRAM</span>
      </Link>

      <nav className="site-nav" aria-label="Primary">
        {NAV.map((n) => (
          <NavLink key={n.to} to={n.to} end={n.to === "/"}
            className={({ isActive }) =>
              (isActive || (n.to === "/life-events" && loc.pathname.startsWith("/life-events"))) ? "active" : ""}>
            {n.label}
          </NavLink>
        ))}
        <Magnetic><Link className="btn-avail" to="/reach-us">Check Availability</Link></Magnetic>
      </nav>

      <button className={`burger${open ? " on" : ""}`} aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <span /><span /><span />
      </button>

      <nav className={`mobile-nav${open ? " show" : ""}`} aria-label="Mobile">
        {NAV.map((n) => <NavLink key={n.to} to={n.to} end={n.to === "/"}>{n.label}</NavLink>)}
        <Link className="btn-avail" to="/reach-us">Check Availability</Link>
      </nav>
    </header>
  );
}
