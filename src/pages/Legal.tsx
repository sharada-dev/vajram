import { useRef } from "react";
import { usePageMotion } from "../lib/motion";
import PageBanner from "../components/PageBanner";

const CONTENT: Record<string, { title: string; accent: string; paras: string[] }> = {
  terms: {
    title: "Terms &", accent: "Conditions",
    paras: [
      "These terms govern your use of the Vajram website and the booking of our spaces and farm estates. By enquiring or reserving, you agree to coordinate dates, guest counts and arrangements directly with our team.",
      "Bookings are confirmed only on written agreement and any applicable advance. Cancellation, rescheduling and conduct policies are shared with your confirmation. Vajram reserves the right to refuse or amend a booking where necessary to protect the property, heritage objects and other guests.",
      "All imagery and content on this site is the property of Vajram Antiques & Gardens and may not be reproduced without permission.",
    ],
  },
  privacy: {
    title: "Privacy", accent: "Policy",
    paras: [
      "We collect only the information you share with us — name, contact details and event preferences — to respond to enquiries and arrange your visit or booking.",
      "We do not sell your data. Information is used to communicate with you about your enquiry and is retained only as long as needed for that purpose.",
      "For any request to access or remove your information, write to us at info@vajram.net.",
    ],
  },
};

export default function Legal({ kind }: { kind: "terms" | "privacy" }) {
  const root = useRef<HTMLDivElement>(null);
  usePageMotion(root, [kind]);
  const c = CONTENT[kind];
  return (
    <div className="page" ref={root}>
      <PageBanner crumbs={[{ label: "Home", to: "/" }, { label: c.title.replace(" &", "") + " " + c.accent }]} title={c.title} accent={c.accent} />
      <section className="block">
        <div className="article__wrap">
          {c.paras.map((p, i) => <p data-reveal key={i} className="legal__p">{p}</p>)}
        </div>
      </section>
    </div>
  );
}
