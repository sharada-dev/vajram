import { Link } from "react-router-dom";
import type { Venue } from "../content";

export default function VenueCard({ venue }: { venue: Venue }) {
  return (
    <Link className="venue-card" to={venue.path} data-reveal>
      <div className="venue-card__img"><img src={venue.hero} alt={venue.name} loading="lazy" /></div>
      <div className="venue-card__scrim" />
      <div className="venue-card__body">
        <h3>{venue.name}</h3>
        <div className="venue-card__meta">
          <span>Up to {venue.guests} guests</span>
          <span className="venue-card__cta">View Details →</span>
        </div>
      </div>
    </Link>
  );
}
