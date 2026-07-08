import { lazy, Suspense, useRef, useState, type FormEvent } from "react";
import { CONTACT } from "../content";
import { usePageMotion } from "../lib/motion";
import Magnetic from "../components/Magnetic";

const LocationsMap = lazy(() => import("../components/LocationsMap"));

const A = import.meta.env.BASE_URL + "assets";

const OCCASIONS = [
  "Wedding or Engagement",
  "Mehendi & Haldi",
  "Birthday",
  "Corporate Offsite",
  "Workshop or Art Show",
  "Farm Stay",
];

export default function ReachUs() {
  const root = useRef<HTMLDivElement>(null);
  usePageMotion(root, []);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", date: "", type: OCCASIONS[0], msg: "" });
  const set = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPreferred date: ${form.date}\nOccasion: ${form.type}\n\n${form.msg}`
    );
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent("Enquiry — " + form.type)}&body=${body}`;
    setSent(true);
  };

  return (
    <div className="page ruz" ref={root}>
      {/* hero band */}
      <section className="ruz-hero" data-hero>
        <img className="ruz-hero__img" src={`${A}/hero-door.jpg`} alt="Vajram entrance doorway" />
        <div className="ruz-hero__scrim" aria-hidden />
        <div className="vhero__veil" aria-hidden />
        <div className="ruz-hero__inner">
          <p className="ruz-mono ruz-eyebrow" data-anim>Reach Us</p>
          <h1 data-split>Begin the conversation.</h1>
          <div className="ruz-rule" aria-hidden />
        </div>
      </section>

      {/* contact + form */}
      <section className="ruz-grid">
        <div className="ruz-info">
          <div data-reveal>
            <p className="ruz-mono ruz-k">Visit</p>
            <p>1036, 30th Main Rd, Poornaprajna Layout,<br />Uttarahalli Hobli, Bengaluru 560061</p>
          </div>
          <div data-reveal>
            <p className="ruz-mono ruz-k">Hours</p>
            <p>Monday – Friday<br />8:00 AM – 6:00 PM</p>
          </div>
          <div data-reveal>
            <p className="ruz-mono ruz-k">Write</p>
            <a className="ruz-mail" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </div>
          <div className="ruz-photo" data-reveal>
            <img src={`${A}/life/space-02.jpg`} alt="Vajram gardens" loading="lazy" />
          </div>
        </div>

        <form className="ruz-form" data-reveal onSubmit={submit}>
          <p className="ruz-mono ruz-k">Enquiry</p>
          <h2>Tell us the occasion.</h2>
          <div className="ruz-fields">
            <label>
              <span className="ruz-mono">Name</span>
              <input type="text" placeholder="Your name" value={form.name} onChange={set("name")} />
            </label>
            <label>
              <span className="ruz-mono">Email</span>
              <input type="email" placeholder="you@example.com" value={form.email} onChange={set("email")} />
            </label>
            <label>
              <span className="ruz-mono">Preferred Date</span>
              <input type="date" value={form.date} onChange={set("date")} />
            </label>
            <label>
              <span className="ruz-mono">Occasion</span>
              <select value={form.type} onChange={set("type")}>
                {OCCASIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
            </label>
            <label className="ruz-full">
              <span className="ruz-mono">Message</span>
              <textarea rows={5} placeholder="Guests, season, anything we should know…" value={form.msg} onChange={set("msg")} />
            </label>
          </div>
          <Magnetic>
            <button className="ruz-submit ruz-mono" type="submit">
              {sent ? "Received — we'll write back" : "Send Enquiry"}
            </button>
          </Magnetic>
        </form>
      </section>

      {/* locations map (kept from the app — the design notes list it as a keeper) */}
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
