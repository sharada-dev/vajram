import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSmoothScroll } from "./lib/smooth";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import LifeEvents from "./pages/LifeEvents";
import VenueDetail from "./pages/VenueDetail";
import About from "./pages/About";
import Journals from "./pages/Journals";
import Article from "./pages/Article";
import ReachUs from "./pages/ReachUs";
import Shop from "./pages/Shop";
import Legal from "./pages/Legal";
import "./styles/site.css";

export default function App() {
  useSmoothScroll();
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "") || "/"}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/life-events" element={<LifeEvents />} />
          <Route path="/life-events/:cat/:slug" element={<VenueDetail />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/journals" element={<Journals />} />
          <Route path="/journals/:slug" element={<Article />} />
          <Route path="/reach-us" element={<ReachUs />} />
          <Route path="/terms" element={<Legal kind="terms" />} />
          <Route path="/privacy" element={<Legal kind="privacy" />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
