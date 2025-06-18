"use client"
import React, { useState } from "react";
import AppWrapper from "../../wrapper";
const Blog = () => {
    const [selectedKey, setSelectedKey] = useState("3");
    return (
        <>
            <AppWrapper>
            {/* Elfsight Blog | Untitled Blog */}
            <script src="https://static.elfsight.com/platform/platform.js" async></script>
            <div class="elfsight-app-9c32a411-42aa-4d5a-ae01-c29ba1197f80" data-elfsight-app-lazy></div>
            </AppWrapper>
        </>
    )
}

export default Blog
