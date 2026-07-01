import { useRef } from "react";
import { Link } from "react-router-dom";
import { HOME, BRAND_BLURB } from "../content";
import { usePageMotion } from "../lib/motion";
import PageBanner from "../components/PageBanner";

const PILLARS = [
  { n: "01", t: "Antiques", d: "Curated heritage objects — Tanjore paintings, carved stone, antique furniture — cared for as living things, not relics behind glass." },
  { n: "02", t: "Gardens", d: "Thriving organic farms and green sanctuaries where craft and landscape meet, beyond the edge of the city." },
  { n: "03", t: "Gatherings", d: "Spaces made for people to come together — ceremonies, celebrations and quiet retreats alike." },
];

export default function About() {
  const root = useRef<HTMLDivElement>(null);
  usePageMotion(root, []);
  return (
    <div className="page" ref={root}>
      <PageBanner crumbs={[{ label: "Home", to: "/" }, { label: "About Us" }]} title="Our" accent="Story" />

      <section className="block intro-center">
        <div className="wrap" data-reveal>
          <p className="kicker">The Vajram Difference</p>
          <h2>Heritage, breathed into everyday life.</h2>
          <p className="lead">{BRAND_BLURB}</p>
          <p className="lead">{HOME.storyParas[1]}</p>
        </div>
      </section>

      <section className="block story story--about">
        <div className="story__media" data-reveal>
          <div className="story__imgA"><img src={HOME.storyImgA} alt="Thanjavur Lakshmi painting" /></div>
          <div className="story__imgB"><img src={HOME.storyImgB} alt="Stone Buddha statue" /></div>
          <div className="story__badge"><span>Est.<br />Heritage</span></div>
        </div>
        <div className="story__text">
          <p className="kicker" data-reveal>What We Believe</p>
          <h2 data-reveal>The past is not preserved.<br /><em>It is lived in.</em></h2>
          <p className="story__p" data-reveal>From curated antique spaces to thriving organic farms, every corner of Vajram tells a story — and invites you into it.</p>
          <Link className="btn-gold" to="/life-events" data-reveal>Explore Life Events</Link>
        </div>
      </section>

      <section className="block occasions">
        <div className="wrap">
          <div className="occasions__head" data-reveal><div><p className="kicker">What We Do</p><h2>Three threads, one philosophy.</h2></div></div>
          <div className="feature-grid">
            {PILLARS.map((p) => (
              <div className="feature" data-reveal key={p.n}>
                <span className="feature__n">{p.n}</span><h3>{p.t}</h3><div className="feature__line" /><p>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
