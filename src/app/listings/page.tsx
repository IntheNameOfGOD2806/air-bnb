
'use client'

import dynamic from "next/dynamic";

// ssr: false vì Elfsight dùng `window`, cần client-only
const Listings = dynamic(() => import("@/app/listings/components/listings"), {
  ssr: false,
});

export default function ClientListingsWrapper() {
  return <Listings />;
}
