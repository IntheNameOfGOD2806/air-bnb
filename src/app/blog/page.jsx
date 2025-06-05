"use client"
import React, { useState } from "react";
import NavBar from "../../components/NavBar/navbar";
const Blog = () => {
    const [selectedKey, setSelectedKey] = useState("3");
    return (
        <>
            <div>
                <NavBar selectedKey={selectedKey} setSelectedKey={setSelectedKey}/>
                <script src="https://static.elfsight.com/platform/platform.js" async></script>
                <div class="elfsight-app-a672d481-e953-4ab4-be13-92d85b6b1ad9" data-elfsight-app-lazy></div>
            </div>
        </>
    )
}

export default Blog
