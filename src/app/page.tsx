
'use client'

import dynamic from "next/dynamic";

// ssr: false vì Elfsight dùng `window`, cần client-only
const Home = dynamic(() => import("@/app/components/Home"), {
  ssr: false,
});

export default function ClientHomeWrapper() {
  return <Home />;
}
