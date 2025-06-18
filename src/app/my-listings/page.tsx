
'use client'

import dynamic from "next/dynamic";

// ssr: false vì Elfsight dùng `window`, cần client-only
const MyListings = dynamic(() => import("@/app/my-listings/components/my-listings"), {
  ssr: false,
});

export default function ClientMyListingsWrapper() {
  return <MyListings />;
}
