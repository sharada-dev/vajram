import { lazy, Suspense, useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { useReducedMotion } from "framer-motion";
import { HOME, VENUES, JOURNAL } from "../content";
import { usePageMotion } from "../lib/motion";
import VenueCard from "../components/VenueCard";
import Magnetic from "../components/Magnetic";

const GoldDust = lazy(() => import("../components/GoldDust"));

export default function Home() {
  const root = useRef<HTMLDivElement>(null);
  usePageMotion(root, []);
  const reduce = useReducedMotion();

  // cinematic parallax (scrub) — distinct from the generic on-enter reveals
  useLayoutEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(".home-hero__bg img", {
          yPercent: 18, ease: "none",
          scrollTrigger: { trigger: ".home-hero", start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(".story__imgA", {
          yPercent: -12, ease: "none",
          scrollTrigger: { trigger: ".story", start: "top bottom", end: "bottom top", scrub: true },
        });
        gsap.to(".story__imgB", {
          yPercent: 10, ease: "none",
          scrollTrigger: { trigger: ".story", start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const post = JOURNAL[0];

  return (
    <div className="page home" ref={root}>
      {/* HERO */}
      <section className="home-hero" data-hero>
        <div className="home-hero__bg"><img src={import.meta.env.BASE_URL + "assets/hero-door.jpg"} alt="A heritage garden doorway at Vajram" /></div>
        <div className="home-hero__scrim" />
        {!reduce && <Suspense fallback={null}><GoldDust /></Suspense>}
        <div className="vhero__veil" aria-hidden />
        <div className="home-hero__inner">
          <p className="home-hero__eyebrow" data-anim>{HOME.heroEyebrow}</p>
          <h1 className="hero-title home-hero__title">{HOME.heroTitle}</h1>
          <div className="home-hero__rule" data-anim />
          <p className="home-hero__sub" data-anim>{HOME.heroSub}</p>
          <div className="home-hero__actions" data-anim>
            <Magnetic><Link className="btn-gold" to="/life-events">Explore Spaces &amp; Farms</Link></Magnetic>
            <Magnetic><Link className="btn-ghost" to="/about">Our Story</Link></Magnetic>
          </div>
        </div>
        <div className="home-hero__cue" data-anim>Scroll</div>
      </section>

      {/* STORY — The Vajram Difference */}
      <section className="block story">
        <div className="story__media" data-reveal>
          <div className="story__imgA"><img src={HOME.storyImgA} alt="Thanjavur Lakshmi painting" /></div>
          <div className="story__imgB"><img src={HOME.storyImgB} alt="Stone Buddha statue" /></div>
          <div className="story__badge"><span>Est.<br />Heritage</span></div>
        </div>
        <div className="story__text">
          <p className="kicker" data-reveal>{HOME.storyEyebrow}</p>
          <h2 data-reveal>{HOME.storyTitleTop}<br /><em>{HOME.storyTitleAccent}</em></h2>
          {HOME.storyParas.map((p, i) => <p className="story__p" data-reveal key={i}>{p}</p>)}
          <Link className="btn-gold" to="/about" data-reveal>Read the Full Story</Link>
        </div>
      </section>

      {/* LIFE EVENTS teaser */}
      <section className="block life-teaser">
        <div className="wrap">
          <div className="life-teaser__head" data-reveal>
            <p className="kicker">Life Events</p>
            <h2 data-split>Spaces &amp; estates for the moments that matter.</h2>
          </div>
          <div className="venue-grid">
            {VENUES.map((v) => <VenueCard key={v.slug} venue={v} />)}
          </div>
        </div>
      </section>

      {/* JOURNAL teaser */}
      <section className="block journal-teaser">
        <div className="wrap journal-teaser__inner">
          <div className="journal-teaser__media" data-reveal><img src={post.image} alt={post.title} /></div>
          <div className="journal-teaser__text" data-reveal>
            <p className="kicker">From the Journal</p>
            <h2 data-split>{post.title}</h2>
            <p>{post.excerpt}</p>
            <Link className="btn-gold" to={`/journals/${post.slug}`}>Explore the Story</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
