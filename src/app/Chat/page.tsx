// app/CometChat/page.jsx
"use client";

import dynamic from "next/dynamic";
import '@cometchat/chat-uikit-react/css-variables.css';
// Chỉ render client-side
const CometChatNoSSR = dynamic(() => import("../CometChat/CometChatNoSSR/CometChatNoSSR"), {
  ssr: false,
});

export default function CometChatPage() {
  return <CometChatNoSSR />;
}