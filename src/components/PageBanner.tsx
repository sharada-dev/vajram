import { Link } from "react-router-dom";

type Crumb = { label: string; to?: string };
export default function PageBanner({ crumbs, title, accent }: { crumbs: Crumb[]; title: string; accent?: string }) {
  return (
    <section className="banner" data-hero>
      <div className="banner__veil" aria-hidden />
      <nav className="banner__crumb" aria-label="Breadcrumb">
        {crumbs.map((c, i) => (
          <span key={i}>
            {c.to ? <Link to={c.to}>{c.label}</Link> : <span className="current">{c.label}</span>}
            {i < crumbs.length - 1 && <span className="sep">/</span>}
          </span>
        ))}
      </nav>
      <h1 className="hero-title banner__title">{title}{accent && <em> {accent}</em>}</h1>
    </section>
  );
}
