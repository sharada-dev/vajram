/* =====================================================================
   Vajram — site content. Sourced from the approved design bundle.
   Single source of truth for every page.
   ===================================================================== */
const A = "/assets";

export type NavItem = { label: string; to: string };
export const NAV: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "Life Events", to: "/life-events" },
  { label: "Shop", to: "/shop" },
  { label: "About Us", to: "/about" },
  { label: "Journals", to: "/journals" },
];

export const CONTACT = {
  hours: "Monday – Friday · 8:00 AM – 6:00 PM",
  address: "1036, 30th Main Rd, Poornaprajna Layout, Uttarahalli Hobli, Bengaluru, Karnataka 560061",
  email: "info@vajram.net",
};

export const BRAND_BLURB =
  "Vajram was born from a deep reverence for India's artisanal heritage — a place where the past is not merely preserved, but breathed into everyday life. From our curated antique spaces to our thriving organic farms, every corner of Vajram tells a story.";

export const PERFECT_FOR = [
  "Intimate Weddings & Engagement Ceremonies",
  "Mehendi & Haldi Functions",
  "Birthday Celebrations & Private Parties",
  "Corporate Gatherings & Team Offsites",
  "Workshops, Art Shows & Creative Sessions",
];

export type Chapter = { n: string; title: string; body: string; img: string };
export type Venue = {
  slug: string;
  cat: "spaces" | "farms";
  catLabel: string;
  catPath: string;
  path: string;
  name: string;
  guests: number;
  location: string;
  hero: string;
  lead: string;
  chapters: Chapter[];
  gallery: string[];
  coords: [number, number]; // [lng, lat]
};

export const VENUES: Venue[] = [
  {
    slug: "backyard",
    coords: [77.5946, 12.9716],
    cat: "spaces",
    catLabel: "Vajram Spaces",
    catPath: "/life-events#spaces",
    path: "/life-events/vajram-spaces/backyard",
    name: "Backyard Vajram Antiques & Gardens",
    guests: 170,
    location: "Bengaluru",
    hero: `${A}/hero-door.jpg`,
    lead: "An open, green sanctuary framed by heritage antiques — the perfect threshold between the city and a timeless world of craftsmanship, ideal for both intimate ceremonies and grand celebrations.",
    chapters: [
      { n: "01", title: "A Space for Every Occasion", img: `${A}/life-backyard.png`,
        body: "Vajram Spaces hosts naming ceremonies, sreemantha, family get-togethers, half-saree functions, engagements, marriages and birthdays — up to a hundred and seventy guests." },
      { n: "02", title: "Antiques in the Open Air", img: `${A}/life/space-aerial.jpg`,
        body: "Heritage pieces are set into a living garden, so every gathering unfolds among curated craft and greenery rather than within four plain walls." },
    ],
    gallery: [`${A}/hero-door.jpg`, `${A}/life/space-02.jpg`, `${A}/life/space-aerial.jpg`, `${A}/life-backyard.png`],
  },
  {
    slug: "channarayapatna",
    coords: [76.3886, 12.9066],
    cat: "farms",
    catLabel: "Vajram Farms",
    catPath: "/life-events#farms",
    path: "/life-events/vajram-farms/channarayapatna",
    name: "Channarayapatna",
    guests: 25,
    location: "Channarayapatna, Karnataka",
    hero: `${A}/life/farms-entrance.jpg`,
    lead: "A Thotti Mane (ತೊಟ್ಟಿ ಮನೆ) is a traditional vernacular style of courtyard housing prevalent in Karnataka — especially across the heavy-rainfall regions of Malnad and the coastal belts. The name translates to “Tank House” or “Courtyard House,” after the signature open-to-sky central courtyard that is the architectural heart and soul of the home.",
    chapters: [
      { n: "01", title: "The Thotti — Central Courtyard", img: `${A}/life/chan-02.jpg`,
        body: "A rectangular sunken area left completely open to the sky. It draws warm air up and out while channelling cool breezes into the rooms around it." },
      { n: "02", title: "Sloping Terracotta Roofs", img: `${A}/life/chan-05.jpg`,
        body: "Heavy wooden frameworks support pitched roofs clad in clay tiles, their inward-sloping eaves channelling the monsoon into the thotti, where a collection tank harvests the rainwater." },
      { n: "03", title: "Carved Wooden Pillars", img: `${A}/life/chan-08.jpg`,
        body: "The load around the central quadrangle is borne by rows of beautifully detailed columns — frequently carved from heavy teak or rosewood — resting on stone bases." },
      { n: "04", title: "The Jagali — Verandah", img: `${A}/life/chan-11.jpg`,
        body: "A raised, covered platform at the front entrance — historically a semi-public threshold to welcome visitors and rest, without compromising family privacy." },
      { n: "05", title: "Communal, Multi-Generational Living", img: `${A}/life/chan-14.jpg`,
        body: "Engineered for large joint families: kitchen, bedrooms and dining arranged along the periphery of the core, so the household gathers naturally in the shared open space." },
      { n: "06", title: "Spiritual Centerpiece", img: `${A}/life/chan-16.jpg`,
        body: "A sacred Tulsi planter, or a small water fountain, sits at the exact centre of the courtyard — a peaceful, meditative heart." },
    ],
    gallery: [
      "chan-01","chan-03","chan-04","chan-09","chan-10","chan-07","chan-18","chan-13",
      "chan-12","chan-19","chan-06","chan-15","chan-17",
    ].map((s) => `${A}/life/${s}.jpg`),
  },
  {
    slug: "kolur",
    coords: [77.4, 13.05],
    cat: "farms",
    catLabel: "Vajram Farms",
    catPath: "/life-events#farms",
    path: "/life-events/vajram-farms/kolur",
    name: "Kolur",
    guests: 6,
    location: "Kolur, Karnataka",
    hero: `${A}/life/kolur-entrance.jpg`,
    lead: "The most intimate of the Vajram Farms — a heritage cottage for no more than six, where handcrafted detail and an open garden meet, and where a stay feels entirely your own.",
    chapters: [
      { n: "01", title: "Athangudi Heritage Tiles", img: `${A}/life/kolur-06.jpg`,
        body: "The floors are laid in handcrafted Athangudi tiles from Tamil Nadu — sun-dried rather than kiln-fired, prized for their vibrant patterns and for keeping the rooms naturally cool." },
      { n: "02", title: "Indoor–Outdoor Flow", img: `${A}/life/kolur-03.jpg`,
        body: "Each space opens directly onto a private patio, deck or secret-garden courtyard, so the line between inside and garden all but disappears across the day." },
      { n: "03", title: "Quietly Self-Contained", img: `${A}/life/kolur-04.jpg`,
        body: "A private bathroom and self-catering essentials — a mini-fridge, microwave and small kitchenette — for a stay that asks nothing of you." },
    ],
    gallery: ["kolur-entrance","kolur-01","kolur-02","kolur-03","kolur-04","kolur-05","kolur-06","kolur-07","kolur-08"]
      .map((s) => `${A}/life/${s}.jpg`),
  },
];

export const venueBySlug = (slug?: string) => VENUES.find((v) => v.slug === slug);

export type JournalPost = {
  slug: string; title: string; day: string; month: string; image: string; excerpt: string; body: string[];
};
export const JOURNAL: JournalPost[] = [
  {
    slug: "timeless-beauty-of-artisan-craftsmanship",
    title: "The Timeless Beauty of Artisan Craftsmanship",
    day: "06", month: "May",
    image: `${A}/story-lakshmi.png`,
    excerpt: "In a world that moves fast and favors convenience, true craftsmanship stands still — rooted in patience, precision, and purpose.",
    body: [
      "In a world that moves fast and favors convenience, true craftsmanship stands still — rooted in patience, precision, and purpose. Artisan work is not just about creating objects; it is about preserving a way of seeing, a lineage of hands that have shaped material into meaning for generations.",
      "Every Tanjore painting, every carved pillar, every hand-laid tile carries the quiet authority of time. The maker's intent lives in the smallest imperfection — proof that a human, not a machine, was here.",
      "At Vajram, we collect and care for these objects not as relics behind glass, but as living things — placed in gardens, courtyards and rooms where people gather. Heritage, for us, is not preserved. It is breathed into everyday life.",
    ],
  },
];

export const HOME = {
  heroEyebrow: "Antiques & Gardens · Bengaluru",
  heroTitle: "Vajram",
  heroSub: "Heritage spaces, thriving organic farms, and the craft of gathering — where the past is breathed into everyday life.",
  storyEyebrow: "Our Story",
  storyTitleTop: "The Vajram",
  storyTitleAccent: "Difference",
  storyParas: [
    BRAND_BLURB,
    "Our founder's vision was simple yet profound: to create spaces where people could reconnect with craftsmanship, nature, and one another.",
  ],
  storyImgA: `${A}/story-lakshmi.png`,
  storyImgB: `${A}/story-buddha.png`,
};
