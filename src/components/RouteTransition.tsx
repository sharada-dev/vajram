import { useLocation } from "react-router-dom";

/** A gold curtain that sweeps across on every route change (and first load).
 *  Purely decorative overlay — content swaps underneath it. Remounts via key. */
export default function RouteTransition() {
  const loc = useLocation();
  return <div key={loc.pathname} className="route-curtain" aria-hidden />;
}
