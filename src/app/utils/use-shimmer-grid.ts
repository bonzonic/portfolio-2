"use client";

import { useEffect, useRef, type MouseEvent, type RefObject } from "react";

interface UseShimmerGrid<T extends HTMLElement> {
  ref: RefObject<T | null>;
  onMouseMove: (e: MouseEvent<T>) => void;
}

/**
 * Tracks the cursor position relative to the bound element and writes it to
 * `--shimmer-x`/`--shimmer-y` CSS custom properties for the `.shimmer-grid` overlay.
 * Also recomputes on scroll so the spotlight stays under the cursor instead of
 * drifting with the scrolled content (scroll events don't fire `mousemove`).
 */
export function useShimmerGrid<T extends HTMLElement>(): UseShimmerGrid<T> {
  const ref = useRef<T>(null);
  const lastMouse = useRef({ x: 0, y: 0 });

  const updatePosition = (clientX: number, clientY: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--shimmer-x", `${clientX - rect.left}px`);
    el.style.setProperty("--shimmer-y", `${clientY - rect.top}px`);
  };

  useEffect(() => {
    const handleScroll = () => updatePosition(lastMouse.current.x, lastMouse.current.y);
    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll, true);
  }, []);

  const onMouseMove = (e: MouseEvent<T>) => {
    lastMouse.current = { x: e.clientX, y: e.clientY };
    updatePosition(e.clientX, e.clientY);
  };

  return { ref, onMouseMove };
}
