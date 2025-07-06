
'use client'

import dynamic from "next/dynamic";

// ssr: false vì Elfsight dùng `window`, cần client-only
const Vehicles = dynamic(() => import("@/app/vehicles/components/vehicles"), {
  ssr: false,
});

export default function ClientVehiclesWrapper() {
  return <Vehicles />;
}
