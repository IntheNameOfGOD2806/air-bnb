/* eslint-disable no-undef */

import { useLayoutEffect, useState } from "react";

// Hook to monitor window width size based on Ant Design breakpoints
const UseWindowSize = (width, isLess = false) => {
  const [size, setSize] = useState(false);

  useLayoutEffect(() => {
    function updateSize() {
      const currentWidth = isLess
        ? global.window.innerWidth < width
        : global.window.innerWidth >= width;
      setSize(currentWidth);
    }

    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, [isLess, width]);

  return size;
};

// Hook to monitor window height size (if needed)
const UseWindowHeightSize = (height, isLess = false) => {
  const [size, setSize] = useState(false);

  useLayoutEffect(() => {
    function updateSize() {
      const currentHeight = isLess
        ? global.window.innerHeight < height
        : global.window.innerHeight >= height;
      setSize(currentHeight);
    }

    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, [isLess, height]);

  return size;
};

// Ant Design breakpoints

const isMobile = () => UseWindowSize(576, true); // (Mobile)
const isTablet = () => UseWindowSize(576); // (Tablet)
const isSmallLaptop = () => UseWindowSize(768); //  (Small Laptops)
const isLaptop = () => UseWindowSize(992); // (Laptops)
const isDesktop = () => UseWindowSize(1200); //  (Desktops)
const isLargeDesktop = () => UseWindowSize(1600); //  (Large Desktops)
const isSmallHeightLaptop = () => UseWindowHeightSize(768, true);

export {
  isSmallHeightLaptop,
  isMobile,
  isTablet,
  isSmallLaptop,
  isLaptop,
  isDesktop,
  isLargeDesktop,
};
