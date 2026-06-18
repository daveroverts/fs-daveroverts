"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import * as Fathom from "fathom-client";

function FathomTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    const siteId = process.env.NEXT_PUBLIC_FATHOM_SITE_ID;
    if (!siteId) return;

    Fathom.load(siteId, {
      includedDomains: ["fs.daveroverts.nl"],
    });
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    Fathom.trackPageview();
    // re-run on every navigation (App Router has no router.events)
  }, [pathname, searchParams]);

  return null;
}

export function Analytics() {
  // useSearchParams() requires a Suspense boundary in the App Router.
  return (
    <Suspense fallback={null}>
      <FathomTracker />
    </Suspense>
  );
}
