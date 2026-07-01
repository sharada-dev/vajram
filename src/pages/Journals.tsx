import { useRef } from "react";
import { Link } from "react-router-dom";
import { JOURNAL } from "../content";
import { usePageMotion } from "../lib/motion";
import PageBanner from "../components/PageBanner";

export default function Journals() {
  const root = useRef<HTMLDivElement>(null);
  usePageMotion(root, []);
  return (
    <div className="page" ref={root}>
      <PageBanner crumbs={[{ label: "Home", to: "/" }, { label: "Journals" }]} title="Stories &" accent="Insights" />

      <section className="block journals">
        <div className="wrap journals-grid">
          {JOURNAL.map((p) => (
            <article className="jcard" data-reveal key={p.slug}>
              <Link to={`/journals/${p.slug}`} className="jcard__media">
                <img src={p.image} alt={p.title} loading="lazy" />
                <span className="jcard__date"><b>{p.day}</b>{p.month}</span>
              </Link>
              <div className="jcard__body">
                <h3>{p.title}</h3>
                <p>{p.excerpt}</p>
                <Link className="btn-gold" to={`/journals/${p.slug}`}>Explore the Story</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
