import { useRef } from "react";
import { Link } from "react-router-dom";
import { usePageMotion } from "../lib/motion";
import Magnetic from "../components/Magnetic";

/* Implemented from "Vajram Life Events.dc.html" (Claude Design). */

const A = import.meta.env.BASE_URL + "assets";

const PILLS = ["Weddings & Engagements", "Mehendi & Haldi", "Birthdays", "Corporate Offsites", "Workshops & Art Shows"];

const CHAPTERS = [
  { n: "Chapter 01", t: "The courtyard",        img: `${A}/life/chan-02.jpg`, alt: "Open-to-sky courtyard",
    p: "The thotti — an open-to-sky heart that harvests the monsoon itself. Every room opens onto it; every day is lived around it." },
  { n: "Chapter 02", t: "Terracotta roofs",     img: `${A}/life/chan-03.jpg`, alt: "Terracotta tiled roofline",
    p: "Hand-laid Mangalore tiles that breathe with the weather — cool in summer, drumming softly in the rains." },
  { n: "Chapter 03", t: "Carved pillars",       img: `${A}/life/chan-04.jpg`, alt: "Carved teak pillars",
    p: "Teak columns carved generations ago, still carrying the roof — and the stories — of the house." },
  { n: "Chapter 04", t: "The jagali verandah",  img: `${A}/life/chan-05.jpg`, alt: "Jagali verandah",
    p: "The raised verandah where visitors were received and evenings were spent — the threshold between farm and home." },
  { n: "Chapter 05", t: "Communal living",      img: `${A}/life/chan-06.jpg`, alt: "Communal living hall",
    p: "One long hall, many mats, shared meals — the Thotti Mane was built for households that gathered, and it still is." },
  { n: "Chapter 06", t: "The tulsi at the centre", img: `${A}/life/chan-07.jpg`, alt: "Tulsi katte at the courtyard centre",
    p: "At the exact heart of the courtyard, a tulsi katte — tended every morning, as it has been for a century." },
];

const FARM_STRIP = ["chan-08", "chan-09", "chan-10", "chan-11", "chan-12", "chan-13"];
const KOLUR_STRIP = ["kolur-01", "kolur-02", "kolur-03", "kolur-04"];

export default function LifeEvents() {
  const root = useRef<HTMLDivElement>(null);
  usePageMotion(root, []);

  return (
    <div className="page vle" ref={root}>
      {/* hero */}
      <section className="vle-hero" data-hero>
        <img src={`${A}/life/chan-01.jpg`} alt="Thotti Mane courtyard house" />
        <div className="vd-scrim" aria-hidden />
        <div className="vhero__veil" aria-hidden />
        <div className="vle-hero__inner">
          <p className="vd-mono vd-eyebrow" data-anim>Life Events</p>
          <h1 data-split>Spaces for the moments that matter.</h1>
          <div className="vd-rule" aria-hidden />
        </div>
      </section>

      {/* perfect for */}
      <section className="vle-pills">
        <p className="vd-mono vd-k" data-reveal>Perfect For</p>
        <div className="vle-pills__row" data-reveal>
          {PILLS.map((p) => <span key={p} className="vle-pill vd-mono">{p}</span>)}
        </div>
      </section>

      {/* ESTATE 01 · BACKYARD */}
      <section className="vle-estate">
        <div className="vle-split">
          <div>
            <p className="vd-mono vd-k" data-reveal>Estate 01 — Vajram Spaces</p>
            <h2 data-reveal>Backyard Antiques <em>&amp; Gardens</em></h2>
            <p className="vle-body" data-reveal>A curated antique garden in the heart of Bengaluru — carved doorways, stone courtyards and green canopies that hold up to 170 guests for ceremonies and gatherings.</p>
            <p className="vd-mono vle-meta" data-reveal>Bengaluru · Up to 170 guests</p>
            <Link className="vle-more vd-mono" to="/life-events/vajram-spaces/backyard" data-reveal>Explore the estate</Link>
          </div>
          <div className="vle-split__img tall" data-reveal><img src={`${A}/hero-door.jpg`} alt="Carved heritage doorway" loading="lazy" /></div>
        </div>
        <div className="vle-strip cols-3">
          <div data-reveal><img src={`${A}/life/space-02.jpg`} alt="Garden pavilion" loading="lazy" /></div>
          <div data-reveal><img src={`${A}/life/space-aerial.jpg`} alt="Aerial view of the gardens" loading="lazy" /></div>
          <div data-reveal><img src={`${A}/life-backyard.png`} alt="Backyard gathering space" loading="lazy" /></div>
        </div>
      </section>

      {/* ESTATE 02 · CHANNARAYAPATNA — terracotta band */}
      <section className="vle-band">
        <p className="vd-mono vd-k vd-k--goldsoft" data-reveal>Estate 02 — Vajram Farms</p>
        <h2 data-split>Channarayapatna — the Thotti Mane.</h2>
        <p className="vle-band__sub" data-reveal>A traditional courtyard home of Karnataka — a house built around the sky, restored beam by beam on a working organic farm. Stays for up to 25 guests.</p>
        <Link className="vle-more vle-more--parch vd-mono" to="/life-events/vajram-farms/channarayapatna" data-reveal>Visit the estate</Link>
      </section>

      {/* chapters */}
      <section className="vle-chapters">
        {CHAPTERS.map((c, i) => (
          <div className={`vle-split${i % 2 === 0 ? "" : " flip"}`} key={c.n}>
            <div className="vle-split__img" data-reveal><img src={c.img} alt={c.alt} loading="lazy" /></div>
            <div>
              <p className="vd-mono vd-k" data-reveal>{c.n}</p>
              <h3 data-reveal>{c.t}</h3>
              <p className="vle-body" data-reveal>{c.p}</p>
            </div>
          </div>
        ))}
      </section>

      {/* farm gallery strip */}
      <section className="vle-gallerystrip">
        <p className="vd-mono vd-k" data-reveal>From the farm</p>
        <div className="vle-strip cols-6">
          {FARM_STRIP.map((s) => (
            <div key={s} data-reveal><img src={`${A}/life/${s}.jpg`} alt="Farm detail" loading="lazy" /></div>
          ))}
        </div>
      </section>

      {/* ESTATE 03 · KOLUR */}
      <section className="vle-estate">
        <div className="vle-split flip">
          <div className="vle-split__img tall" data-reveal><img src={`${A}/life/kolur-entrance.jpg`} alt="Kolur heritage cottage entrance" loading="lazy" /></div>
          <div>
            <p className="vd-mono vd-k" data-reveal>Estate 03 — Vajram Farms</p>
            <h2 data-reveal>Kolur <em>heritage cottage</em></h2>
            <p className="vle-body" data-reveal>An intimate farm cottage laid with hand-made Athangudi tiles — a quiet stay for six, surrounded by fields and birdsong.</p>
            <p className="vd-mono vle-meta" data-reveal>Karnataka · Sleeps 6</p>
            <Link className="vle-more vd-mono" to="/life-events/vajram-farms/kolur" data-reveal>Explore the cottage</Link>
          </div>
        </div>
        <div className="vle-strip cols-4">
          {KOLUR_STRIP.map((s) => (
            <div key={s} data-reveal><img src={`${A}/life/${s}.jpg`} alt="Kolur cottage" loading="lazy" /></div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="vd-invite">
        <h2 data-split>Hold your day at Vajram.</h2>
        <p className="vd-invite__sub" data-reveal>Tell us the occasion — we'll suggest the estate, the season, and the setting.</p>
        <div className="vd-invite__actions" data-reveal>
          <Magnetic><Link className="vd-btn vd-mono" to="/reach-us">Check Availability</Link></Magnetic>
        </div>
      </section>
    </div>
  );
}
