import { lazy, Suspense, useRef } from "react";
import { CONTACT } from "../content";
import { usePageMotion } from "../lib/motion";
import PageBanner from "../components/PageBanner";

const LocationsMap = lazy(() => import("../components/LocationsMap"));

export default function ReachUs() {
  const root = useRef<HTMLDivElement>(null);
  usePageMotion(root, []);
  return (
    <div className="page" ref={root}>
      <PageBanner crumbs={[{ label: "Home", to: "/" }, { label: "Reach Us" }]} title="Reach" accent="Us" />

      <section className="block reach">
        <div className="wrap reach-grid">
          <div className="reach__info" data-reveal>
            <p className="kicker">Get in Touch</p>
            <h2>Plan your visit or your event.</h2>
            <p className="lead">Tell us what you're dreaming up — an intimate ceremony, a gathering, or a quiet retreat among heritage and gardens — and we'll help you make it happen.</p>
            <ul className="reach__list">
              <li><b>We're Open</b><span>{CONTACT.hours}</span></li>
              <li><b>Office Location</b><span>{CONTACT.address}</span></li>
              <li><b>Send a Message</b><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
            </ul>
          </div>

          <form className="reach__form" data-reveal onSubmit={(e) => e.preventDefault()}>
            <label>Name<input type="text" placeholder="Your name" /></label>
            <label>Email<input type="email" placeholder="you@example.com" /></label>
            <label>Occasion<input type="text" placeholder="Wedding, gathering, retreat…" /></label>
            <label>Message<textarea rows={4} placeholder="Tell us about your event" /></label>
            <a className="btn-solid" href={`mailto:${CONTACT.email}?subject=Vajram%20Enquiry`}>Send Enquiry</a>
          </form>
        </div>
      </section>

      <section className="block map-section">
        <div className="map-head" data-reveal>
          <p className="kicker">Where to Find Us</p>
          <h2 data-split>Rooted in Karnataka.</h2>
          <p>Our spaces and farm estates across the state — select a location to explore it.</p>
        </div>
        <Suspense fallback={null}><LocationsMap /></Suspense>
      </section>
    </div>
  );
}
