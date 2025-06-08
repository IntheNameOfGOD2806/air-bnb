"use client"
import React, { useState } from "react";
import NavBar from "../../components/NavBar/navbar";
import AppWrapper from "../wrapper";
const Blog = () => {
    const [selectedKey, setSelectedKey] = useState("3");
    return (
        <>
            <AppWrapper>
                <script src="https://static.elfsight.com/platform/platform.js" async></script>
                <div class="elfsight-app-a672d481-e953-4ab4-be13-92d85b6b1ad9" data-elfsight-app-lazy></div>
            </AppWrapper>
        </>
    )
}

export default Blog
