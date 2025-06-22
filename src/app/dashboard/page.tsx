
'use client'

import dynamic from "next/dynamic";

// ssr: false vì Elfsight dùng `window`, cần client-only
const DashBoard = dynamic(() => import("@/app/dashboard/DashBoard"), {
  ssr: false,
});

export default function ClientDashBoardWrapper() {
  return <DashBoard />;
}
