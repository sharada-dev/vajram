import { Link } from "react-router-dom";
import { CONTACT, WHATSAPP } from "../content";

/** Terracotta footer: link row (restores Terms/Privacy + full IA) over the micro-row. */
export default function Footer() {
  return (
    <footer className="site-footer">
      <nav className="site-footer__links" aria-label="Footer">
        <Link to="/">Home</Link>
        <Link to="/life-events">Life Events</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/about">About</Link>
        <Link to="/journals">Journals</Link>
        <Link to="/reach-us">Reach Us</Link>
        <Link to="/terms">Terms &amp; Conditions</Link>
        <Link to="/privacy">Privacy Policy</Link>
      </nav>
      <div className="site-footer__row">
        <Link to="/">Vajram MMXXVI</Link>
        <span>Poornaprajna Layout · Bengaluru 560061</span>
        <span>Mon–Fri · 8AM–6PM</span>
        <span className="site-footer__contact">
          <a href={WHATSAPP} target="_blank" rel="noreferrer">WhatsApp</a>
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        </span>
      </div>
    </footer>
  );
}
