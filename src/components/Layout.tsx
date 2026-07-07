import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "./Header";
import Footer from "./Footer";
import CustomCursor from "./CustomCursor";
import RouteTransition from "./RouteTransition";
import ThemeSwitcher, { type PreviewTheme } from "./ThemeSwitcher";

export default function Layout() {
  const loc = useLocation();
  const [preview, setPreview] = useState<PreviewTheme>(
    () => (localStorage.getItem("vjPreview") as PreviewTheme) || "terracotta"
  );

  // scroll to top + recompute triggers on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    const t = setTimeout(() => ScrollTrigger.refresh(), 80);
    return () => clearTimeout(t);
  }, [loc.pathname]);

  // apply the chosen palette preview — Home route only, for now
  useEffect(() => {
    const onHome = loc.pathname === "/";
    document.body.classList.toggle("theme-terracotta", onHome && preview === "terracotta");
    document.body.classList.toggle("theme-indigo", onHome && preview === "indigo");
    try { localStorage.setItem("vjPreview", preview); } catch { /* no-op */ }
  }, [loc.pathname, preview]);

  return (
    <>
      <div className="grain" aria-hidden />
      <CustomCursor />
      <RouteTransition />
      <Header />
      <main key={loc.pathname}>
        <Outlet />
      </main>
      <Footer />
      {loc.pathname === "/" && <ThemeSwitcher value={preview} onChange={setPreview} />}
    </>
  );
}
