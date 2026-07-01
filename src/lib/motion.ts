import { useLayoutEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * One cohesive, reusable motion system for the whole site.
 * Pages opt in by annotating markup with data-attributes:
 *
 *   [data-hero]            staged on-load entrance for its [data-anim] children
 *       .hero-title        gets a mask-rise (clip + translate + overshoot)
 *   [data-chapter]         alternating media/text chapter (scroll-triggered)
 *       .c-media / img / .c-body > *
 *       [data-from="right"]  wipe direction
 *   [data-montage]         3-up clip-wipe + headline
 *   [data-reveal]          generic rise-in on scroll
 *   [data-gallery] figure  batched stagger reveal
 *
 * All gated by prefers-reduced-motion (no GSAP runs → CSS final state shows).
 */
export function usePageMotion(scope: RefObject<HTMLElement | null>, deps: unknown[] = []) {
  useLayoutEffect(() => {
    if (!scope.current) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const E = "power3.out";
        const BACK = "back.out(1.5)";

        // ---- hero (on load) ----
        const hero = scope.current!.querySelector("[data-hero]");
        if (hero) {
          const tl = gsap.timeline({ defaults: { ease: E } });
          const title = hero.querySelector(".hero-title");
          const els = hero.querySelectorAll<HTMLElement>("[data-anim]");
          if (title) {
            tl.fromTo(title,
              { autoAlpha: 0, clipPath: "inset(0 0 100% 0)", y: 64 },
              { autoAlpha: 1, clipPath: "inset(0 0 0 0)", y: 0, duration: 0.95, ease: BACK }, 0.45);
          }
          els.forEach((el, i) => {
            tl.from(el, { autoAlpha: 0, y: 32, duration: 0.7 }, 0.55 + i * 0.12);
          });
        }

        // ---- chapters ----
        gsap.utils.toArray<HTMLElement>("[data-chapter]").forEach((ch) => {
          const right = ch.getAttribute("data-from") === "right";
          const tl = gsap.timeline({ scrollTrigger: { trigger: ch, start: "top 78%" }, defaults: { ease: E } });
          const media = ch.querySelector(".c-media");
          const img = ch.querySelector(".c-media img");
          const body = ch.querySelectorAll<HTMLElement>(".c-body > *");
          if (media) tl.fromTo(media, { clipPath: right ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)" }, { clipPath: "inset(0px 0px 0px 0px)", duration: 0.6 });
          if (img) tl.fromTo(img, { scale: 1.2 }, { scale: 1, duration: 1.2 }, 0);
          if (body.length) tl.from(body, { y: 42, autoAlpha: 0, duration: 0.6, stagger: 0.1, ease: BACK }, 0.25);
        });

        // ---- montage ----
        const montage = scope.current!.querySelector("[data-montage]");
        if (montage) {
          gsap.timeline({ scrollTrigger: { trigger: montage, start: "top 75%" }, defaults: { ease: E } })
            .fromTo(montage.querySelectorAll(".m-fig"), { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0px)", duration: 0.6, stagger: 0.12 })
            .fromTo(montage.querySelectorAll(".m-fig img"), { scale: 1.18 }, { scale: 1, duration: 1.2 }, 0)
            .from(montage.querySelector(".m-title"), { y: 46, autoAlpha: 0, scale: 0.94, duration: 0.9, ease: BACK }, 0.25);
        }

        // ---- generic reveals ----
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.from(el, { y: 30, autoAlpha: 0, duration: 0.8, ease: E, scrollTrigger: { trigger: el, start: "top 86%" } });
        });

        // ---- split-word kinetic headlines ----
        gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
          if (!el.dataset.splitDone) {
            const words = (el.textContent || "").trim().split(/\s+/);
            el.innerHTML = words.map((w) => `<span class="w"><span class="wi">${w}</span></span>`).join(" ");
            el.dataset.splitDone = "1";
          }
          gsap.from(el.querySelectorAll(".wi"), {
            yPercent: 120, duration: 0.9, ease: "power4.out", stagger: 0.05,
            scrollTrigger: { trigger: el, start: "top 88%" },
          });
        });

        // ---- galleries (batched stagger) ----
        ScrollTrigger.batch("[data-gallery] figure", {
          start: "top 92%",
          onEnter: (els) => gsap.from(els, { y: 28, autoAlpha: 0, duration: 0.6, stagger: 0.07, ease: E, overwrite: true }),
        });
      });
    }, scope);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
