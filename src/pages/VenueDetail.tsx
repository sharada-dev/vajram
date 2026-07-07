import { useRef, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { venueBySlug, PERFECT_FOR } from "../content";
import { usePageMotion } from "../lib/motion";
import Lightbox from "../components/Lightbox";
import CoverflowGallery from "../components/CoverflowGallery";
import ScatterGallery from "../components/ScatterGallery";
import CountUp from "../components/CountUp";

export default function VenueDetail() {
  const { slug } = useParams();
  const venue = venueBySlug(slug);
  const root = useRef<HTMLDivElement>(null);
  const [lb, setLb] = useState<number | null>(null);
  usePageMotion(root, [slug]);

  if (!venue) return <Navigate to="/life-events" replace />;

  return (
    <div className="page venue" ref={root}>
      {/* HERO */}
      <section className="vhero" data-hero>
        <div className="vhero__bg"><img src={venue.hero} alt={venue.name} /></div>
        <div className="vhero__scrim" />
        <div className="vhero__veil" aria-hidden />
        <nav className="vhero__crumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link><span>/</span>
          <Link to="/life-events">Life Events</Link><span>/</span>
          <Link to="/life-events">{venue.catLabel}</Link><span>/</span>
          <span className="current">{venue.name}</span>
        </nav>
        <div className="vhero__inner">
          <p className="vhero__eyebrow" data-anim>{venue.catLabel} · Up to {venue.guests} Guests</p>
          <h1 className="hero-title vhero__title">{venue.name}</h1>
          <div className="vhero__rule" data-anim />
          <p className="vhero__sub" data-anim>{venue.location}</p>
        </div>
        <div className="vhero__cue" data-anim>Scroll</div>
      </section>

      {/* INTRO */}
      <section className="block intro-center">
        <div className="wrap" data-reveal>
          <p className="kicker">The Estate</p>
          <h2>{venue.name}</h2>
          <p className="lead">{venue.lead}</p>
          <div className="stats">
            <div className="stat"><div className="stat__n"><CountUp end={venue.guests} /></div><div className="stat__l">Guests</div></div>
            <div className="stat"><div className="stat__n">{venue.catLabel.replace("Vajram ", "")}</div><div className="stat__l">Vajram</div></div>
            <div className="stat"><div className="stat__n">{venue.location.split(",")[0]}</div><div className="stat__l">Location</div></div>
          </div>
        </div>
      </section>

      {/* CHAPTERS */}
      {venue.chapters.length > 0 && (
        <section className="block chapters">
          {venue.chapters.map((c, i) => (
            <div className="chapter" data-chapter data-from={i % 2 === 1 ? "right" : "left"} key={c.n}>
              <div className={`c-media${i % 2 === 1 ? " is-right" : ""}`}><img src={c.img} alt={c.title} loading="lazy" /></div>
              <div className="c-body">
                <span className="chapter__n">{c.n}</span>
                <h3>{c.title}</h3>
                <div className="chapter__rule" />
                <p>{c.body}</p>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* PERFECT FOR */}
      <section className="block occasions">
        <div className="wrap">
          <div className="occasions__head" data-reveal>
            <div><p className="kicker">Made for Gatherings</p><h2 data-split>Perfect for your occasion.</h2></div>
          </div>
          <div className="occ-grid">
            {PERFECT_FOR.map((o, i) => (
              <div className="occ" data-reveal key={i}><span className="occ__i">❖</span><h3>{o}</h3></div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY — Channarayapatna gets the scatter treatment; others keep coverflow */}
      {venue.slug === "channarayapatna" ? (
        <ScatterGallery images={venue.gallery} name={venue.name} onOpen={setLb} />
      ) : (
        <section className="block gallery">
          <div className="wrap">
            <div className="gallery__head" data-reveal>
              <p className="kicker">The Gallery</p>
              <h2>Explore <em>{venue.name}</em></h2>
              <p>Across the courtyards, verandahs and gardens of the estate. Select any image to view it full-size.</p>
            </div>
            <CoverflowGallery images={venue.gallery} onOpen={setLb} />
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="block cta">
        <div className="wrap" data-reveal>
          <p className="kicker">Plan Your Event</p>
          <h2>Host your occasion at {venue.name.split(" ")[0]}.</h2>
          <p className="cta__sub">Tell us about your celebration and we'll help you reserve the estate for your dates.</p>
          <Link className="btn-solid" to="/reach-us">Check Availability</Link>
        </div>
      </section>

      <Lightbox images={venue.gallery} index={lb} setIndex={setLb} />
    </div>
  );
}
