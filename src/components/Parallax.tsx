"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";

type ParallaxProps = {
  children: React.ReactNode;
  /**
   * How far this layer drifts relative to scroll.
   * Positive = moves slower than scroll (background feel).
   * Negative = moves faster than scroll (foreground pop-out feel).
   * Keep it subtle — 0.15 to 0.35 reads as "premium," anything past
   * ~0.5 starts to look like a gimmick.
   */
  speed?: number;
  className?: string;
};

export default function Parallax({
  children,
  speed = 0.25,
  className = "",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const updateOffset = () => {
    const el = ref.current;
    if (!el || prefersReducedMotion) return;

    const rect = el.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Only compute while the element is anywhere near the viewport —
    // skip the math for offscreen sections.
    if (rect.bottom < -200 || rect.top > viewportHeight + 200) return;

    // Distance of the element's center from the viewport's center,
    // scaled by speed — this is what creates the drift as you scroll.
    const distanceFromCenter =
      rect.top + rect.height / 2 - viewportHeight / 2;
    setOffset(distanceFromCenter * speed * -1);
  };

  // Hook into Lenis's own scroll tick so this stays perfectly in sync
  // with the smooth-scrolled position rather than the raw scroll event.
  useLenis(() => {
    updateOffset();
  });

  // Also run once on mount / resize in case Lenis hasn't ticked yet
  // (e.g. page loaded already scrolled, or Lenis is absent).
  useEffect(() => {
    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReducedMotion]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div
        style={{
          transform: prefersReducedMotion
            ? undefined
            : `translate3d(0, ${offset}px, 0)`,
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
}
