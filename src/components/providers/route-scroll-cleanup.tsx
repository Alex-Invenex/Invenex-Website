"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, type ReactNode } from "react";

/**
 * RouteScrollCleanup - Kills all GSAP ScrollTrigger instances on route change.
 *
 * GSAP ScrollTrigger's `pin: true` wraps elements in a `pin-spacer` div,
 * modifying the DOM tree outside React's knowledge. When React navigates
 * (client-side) and tries to reconcile/unmount the old page, it can't find
 * nodes that GSAP reparented, causing:
 *   "NotFoundError: Failed to execute 'removeChild' on 'Node'"
 *
 * This component:
 * 1. Detects route changes via `usePathname()`
 * 2. Synchronously kills all ScrollTrigger instances (which unwraps pins)
 *    BEFORE React commits the new DOM
 * 3. Uses `key={pathname}` to force full unmount/remount, ensuring
 *    `useGSAP` cleanup runs in the correct order
 */
export function RouteScrollCleanup({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  useLayoutEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;

      // Dynamically import to avoid adding ScrollTrigger to every page's bundle
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      });
    }
  }, [pathname]);

  return <div key={pathname}>{children}</div>;
}
