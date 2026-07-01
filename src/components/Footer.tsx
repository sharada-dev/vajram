import { Link } from "react-router-dom";
import { CONTACT, BRAND_BLURB } from "../content";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <span className="brand-mark" aria-hidden>
            <svg viewBox="0 0 22 30" width="22" height="30" fill="none">
              <path d="M11 1 L20 11 L11 29 L2 11 Z" stroke="currentColor" strokeWidth="1.4" />
              <path d="M2 11 H20 M11 1 L7 11 L11 29 M11 1 L15 11 L11 29" stroke="currentColor" strokeWidth=".8" opacity=".65" />
            </svg>
          </span>
          <span className="brand-name">VAJRAM</span>
          <span className="brand-sub">Antiques &amp; Gardens</span>
          <p>{BRAND_BLURB.split(".").slice(0, 2).join(".") + "."}</p>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <Link to="/">Home</Link>
          <Link to="/life-events">Life Events</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/about">About Us</Link>
          <Link to="/journals">Journals</Link>
          <Link to="/reach-us">Reach Us</Link>
        </div>

        <div className="footer-col">
          <h4>Our Services</h4>
          <Link to="/life-events">Life Events</Link>
        </div>

        <div className="footer-col footer-contact">
          <h4>We're Open</h4>
          <p>{CONTACT.hours}</p>
          <h4>Office Location</h4>
          <p>{CONTACT.address}</p>
          <h4>Send a Message</h4>
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        </div>
      </div>

      <div className="footer-bar">
        <span>Copyright {new Date().getFullYear()} — Vajram Antiques and Gardens</span>
        <span className="footer-legal"><Link to="/terms">Terms &amp; Conditions</Link><Link to="/privacy">Privacy Policy</Link></span>
      </div>
    </footer>
  );
}
