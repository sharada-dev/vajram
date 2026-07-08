import { Link } from "react-router-dom";
import { CONTACT } from "../content";

/** Design-system footer: slim terracotta micro-row (Vajram MMXXVI · address · hours · email). */
export default function Footer() {
  return (
    <footer className="site-footer">
      <Link to="/">Vajram MMXXVI</Link>
      <span>Poornaprajna Layout · Bengaluru 560061</span>
      <span>Mon–Fri · 8AM–6PM</span>
      <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
    </footer>
  );
}
