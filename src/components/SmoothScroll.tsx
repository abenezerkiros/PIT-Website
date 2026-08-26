"use client";

import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1, // lower = smoother/heavier, higher = snappier. 0.1 feels premium without being sluggish.
        duration: 1.4,
        smoothWheel: true,
        syncTouch: false, // keep native touch scroll on mobile — smoothing touch usually feels laggy, not luxurious
      }}
    >
      {children}
    </ReactLenis>
  );
}
