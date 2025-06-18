
'use client'

import dynamic from "next/dynamic";

// ssr: false vì Elfsight dùng `window`, cần client-only
const TripTableComponent = dynamic(() => import("@/app/trips/components/trips"), {
  ssr: false,
});

export default function ClientTripTableWrapper() {
  return <TripTableComponent />;
}
