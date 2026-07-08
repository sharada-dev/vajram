import { useRef } from "react";
import { Link } from "react-router-dom";
import { usePageMotion } from "../lib/motion";
import Magnetic from "../components/Magnetic";
import { HOME, JOURNAL } from "../content";

/* Implemented from "Vajram About.dc.html" (Claude Design). */

const A = import.meta.env.BASE_URL + "assets";

export default function About() {
  const root = useRef<HTMLDivElement>(null);
  usePageMotion(root, []);
  const post = JOURNAL[0];

  return (
    <div className="page vab" ref={root}>
      {/* hero */}
      <section className="vle-hero vab-hero" data-hero>
        <img src={`${A}/shop-hero-interior.png`} alt="Inside the Vajram antique collection" />
        <div className="vd-scrim" aria-hidden />
        <div className="vhero__veil" aria-hidden />
        <div className="vle-hero__inner">
          <p className="vd-mono vd-eyebrow" data-anim>About Vajram</p>
          <h1 data-split>A reverence, kept alive.</h1>
          <div className="vd-rule" aria-hidden />
        </div>
      </section>

      {/* story */}
      <section className="vab-story">
        <div className="vab-story__media">
          <div className="vab-story__imgA" data-reveal><img src={`${A}/story-lakshmi.png`} alt="Thanjavur Lakshmi painting" /></div>
          <div className="vab-story__imgB" data-reveal><img src={`${A}/story-buddha.png`} alt="Stone Buddha statue" /></div>
        </div>
        <div>
          <p className="vd-mono vd-k" data-reveal>Our Story</p>
          <h2 data-reveal>The Vajram <em>difference</em></h2>
          {HOME.storyParas.map((p, i) => <p className="vle-body" data-reveal key={i}>{p}</p>)}
          <Link className="vle-more vd-mono" to="/life-events" data-reveal>Visit the Estates</Link>
        </div>
      </section>

      {/* quote band */}
      <section className="vab-quote">
        <p data-split>"Heritage, for us, is not preserved. It is breathed into everyday life."</p>
      </section>

      {/* journal */}
      <section className="vab-journal">
        <div>
          <p className="vd-mono vd-k" data-reveal>From the Journal</p>
          <h2 data-reveal>{post.title}</h2>
          <p className="vle-body" data-reveal>{post.excerpt}</p>
          <p className="vd-mono vle-meta" data-reveal>{post.month} {post.day} · Journal</p>
          <Link className="vle-more vd-mono" to={`/journals/${post.slug}`} data-reveal>Read the story</Link>
        </div>
        <div className="vle-split__img tall" data-reveal><img src={`${A}/prod-stone-buddha.png`} alt="Hand-carved stone sculpture" loading="lazy" /></div>
      </section>

      {/* CTA */}
      <section className="vd-invite">
        <h2 data-split>Come walk the gardens.</h2>
        <p className="vd-invite__sub" data-reveal>The best way to know Vajram is to visit it.</p>
        <div className="vd-invite__actions" data-reveal>
          <Magnetic><Link className="vd-btn vd-mono" to="/reach-us">Plan a Visit</Link></Magnetic>
        </div>
      </section>
    </div>
  );
}
