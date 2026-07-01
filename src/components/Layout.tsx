import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "./Header";
import Footer from "./Footer";
import CustomCursor from "./CustomCursor";
import RouteTransition from "./RouteTransition";

export default function Layout() {
  const loc = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    // let the new page mount, then recompute trigger positions
    const t = setTimeout(() => ScrollTrigger.refresh(), 80);
    return () => clearTimeout(t);
  }, [loc.pathname]);

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
    </>
  );
}
