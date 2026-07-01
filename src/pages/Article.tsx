import { useRef } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { JOURNAL } from "../content";
import { usePageMotion } from "../lib/motion";

export default function Article() {
  const { slug } = useParams();
  const post = JOURNAL.find((p) => p.slug === slug);
  const root = useRef<HTMLDivElement>(null);
  usePageMotion(root, [slug]);
  if (!post) return <Navigate to="/journals" replace />;

  return (
    <div className="page article" ref={root}>
      <section className="vhero article__hero" data-hero>
        <div className="vhero__bg"><img src={post.image} alt={post.title} /></div>
        <div className="vhero__scrim" />
        <div className="vhero__veil" aria-hidden />
        <nav className="vhero__crumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link><span>/</span><Link to="/journals">Journals</Link><span>/</span>
          <span className="current">{post.title}</span>
        </nav>
        <div className="vhero__inner">
          <p className="vhero__eyebrow" data-anim>Vajram Journal · {post.day} {post.month}</p>
          <h1 className="hero-title vhero__title article__title">{post.title}</h1>
        </div>
      </section>

      <section className="block article__body">
        <div className="article__wrap">
          {post.body.map((para, i) => (
            <p data-reveal key={i} className={i === 0 ? "article__lead" : ""}>{para}</p>
          ))}
          <Link className="btn-gold article__back" to="/journals" data-reveal>← All Stories</Link>
        </div>
      </section>
    </div>
  );
}
