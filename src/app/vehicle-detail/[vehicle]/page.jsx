
'use client'

import dynamic from "next/dynamic";

// ssr: false vì Elfsight dùng `window`, cần client-only
const Vehicle = dynamic(() => import("@/app/vehicle-detail/components/vehicle"), {
  ssr: false,
});

export default function ClientVehicleWrapper() {
  return <Vehicle />;
}
