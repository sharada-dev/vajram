import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { NAV } from "../content";

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
          <svg viewBox="0 0 22 30" width="20" height="27" fill="none">
            <path d="M11 1 L20 11 L11 29 L2 11 Z" stroke="currentColor" strokeWidth="1.4" />
            <path d="M2 11 H20 M11 1 L7 11 L11 29 M11 1 L15 11 L11 29" stroke="currentColor" strokeWidth=".8" opacity=".65" />
          </svg>
        </span>
        <span className="brand-text">
          <span className="brand-name">VAJRAM</span>
          <span className="brand-sub">Antiques &amp; Gardens</span>
        </span>
      </Link>

      <nav className="site-nav" aria-label="Primary">
        {NAV.map((n) => (
          <NavLink key={n.to} to={n.to} end={n.to === "/"}
            className={({ isActive }) =>
              (isActive || (n.to === "/life-events" && loc.pathname.startsWith("/life-events"))) ? "active" : ""}>
            {n.label}
          </NavLink>
        ))}
      </nav>

      <div className="site-utils">
        <button className="util-ic" aria-label="Search"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.2-3.2" strokeLinecap="round" /></svg></button>
        <button className="util-ic" aria-label="Cart"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 7h13l-1.3 9.5a2 2 0 0 1-2 1.7H9.3a2 2 0 0 1-2-1.7L6 7Z" /><path d="M9 7a3 3 0 0 1 6 0" strokeLinecap="round" /></svg></button>
        <Link className="btn-avail" to="/reach-us">Check Availability</Link>
        <button className={`burger${open ? " on" : ""}`} aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          <span /><span /><span />
        </button>
      </div>

      <nav className={`mobile-nav${open ? " show" : ""}`} aria-label="Mobile">
        {NAV.map((n) => <NavLink key={n.to} to={n.to} end={n.to === "/"}>{n.label}</NavLink>)}
        <Link className="btn-avail" to="/reach-us">Check Availability</Link>
      </nav>
    </header>
  );
}
