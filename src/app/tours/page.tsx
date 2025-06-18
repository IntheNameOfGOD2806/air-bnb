
'use client'

import dynamic from "next/dynamic";

// ssr: false vì Elfsight dùng `window`, cần client-only
const Tours = dynamic(() => import("@/app/tours/components/tours"), {
  ssr: false,
});

export default function ClientToursWrapper() {
  return <Tours />;
}
