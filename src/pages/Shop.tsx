import { useRef } from "react";
import { Link } from "react-router-dom";
import { usePageMotion } from "../lib/motion";
import PageBanner from "../components/PageBanner";

export default function Shop() {
  const root = useRef<HTMLDivElement>(null);
  usePageMotion(root, []);
  return (
    <div className="page" ref={root}>
      <PageBanner crumbs={[{ label: "Home", to: "/" }, { label: "Shop" }]} title="The" accent="Shop" />
      <section className="block intro-center">
        <div className="wrap" data-reveal>
          <p className="kicker">Coming Soon</p>
          <h2>Heritage craft, soon to your home.</h2>
          <p className="lead">Our curated collection of Tanjore paintings, stoneware and antique pieces is being prepared for the new store. In the meantime, we'd love to show you the originals in person.</p>
          <Link className="btn-solid" to="/reach-us">Reach Us</Link>
        </div>
      </section>
    </div>
  );
}
