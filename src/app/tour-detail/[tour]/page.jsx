
'use client'

import dynamic from "next/dynamic";

// ssr: false vì Elfsight dùng `window`, cần client-only
const Tour = dynamic(() => import("@/app/tour-detail/components/tour"), {
  ssr: false,
});

export default function ClientTourWrapper() {
  return <Tour />;
}
