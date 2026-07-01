import { lazy, Suspense, useRef, useState } from "react";
import { VENUES } from "../content";
import { usePageMotion } from "../lib/motion";
import PageBanner from "../components/PageBanner";
import VenueCard from "../components/VenueCard";

const LocationsMap = lazy(() => import("../components/LocationsMap"));

export default function LifeEvents() {
  const root = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState<"spaces" | "farms">(
    typeof window !== "undefined" && window.location.hash === "#farms" ? "farms" : "spaces"
  );
  usePageMotion(root, [tab]);

  const shown = VENUES.filter((v) => v.cat === tab);

  return (
    <div className="page" ref={root}>
      <PageBanner crumbs={[{ label: "Home", to: "/" }, { label: "Life Events" }]} title="Life" accent="Events" />

      <section className="block life">
        <div className="wrap">
          <div className="tabs" data-reveal>
            <button className={tab === "spaces" ? "on" : ""} onClick={() => setTab("spaces")}>Vajram Spaces</button>
            <button className={tab === "farms" ? "on" : ""} onClick={() => setTab("farms")}>Vajram Farms</button>
          </div>
          <p className="life__lead" data-reveal>
            {tab === "spaces"
              ? "Curated antique spaces in the heart of Bengaluru — open, green, and made for gathering."
              : "Heritage farm estates beyond the city, where craft and landscape hold the moments that matter."}
          </p>
          <div className={`venue-grid${shown.length === 1 ? " is-single" : ""}`}>
            {shown.map((v) => <VenueCard key={v.slug} venue={v} />)}
          </div>
        </div>
      </section>

      <section className="block map-section">
        <div className="map-head" data-reveal>
          <p className="kicker">Where to Find Us</p>
          <h2 data-split>Rooted in Karnataka.</h2>
          <p>From the heart of Bengaluru to the courtyards of Channarayapatna and Kolur — select a location to explore the estate.</p>
        </div>
        <Suspense fallback={null}><LocationsMap /></Suspense>
      </section>
    </div>
  );
}
