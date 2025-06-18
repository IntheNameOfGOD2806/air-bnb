// src/app/blog/ClientBlog.tsx
'use client'

import dynamic from "next/dynamic";

// ssr: false vì Elfsight dùng `window`, cần client-only
const Blog = dynamic(() => import("@/app/blog/components/Blog"), {
  ssr: false,
});

export default function ClientBlogWrapper() {
  return <Blog />;
}
