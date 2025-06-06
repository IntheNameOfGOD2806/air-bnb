// components/CustomCarousel.tsx
import React from "react";
import { Carousel } from "antd";
import type { CarouselProps } from "antd";

type CustomCarouselProps = {
  slides: React.ReactNode[]; // array of components or JSX
  autoplay?: boolean;
  dots?: boolean;
  effect?: CarouselProps["effect"];
  arrows?: boolean;
  className?: string;
  dotPosition?: CarouselProps["dotPosition"];
};

const CustomCarousel: React.FC<CustomCarouselProps> = ({
  slides,
  autoplay = true,
  dots = true,
  effect = "scrollx",
  arrows = false,
  className = "",
  dotPosition = "bottom",
}) => {
  return (
    <Carousel
      autoplay={autoplay}
      dots={dots}
      effect={effect}
      dotPosition={dotPosition}
      className={className}
      arrows={arrows}
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className="h-[500px] w-full bg-gray-100 rounded-lg overflow-hidden"
        >
          {slide}
        </div>
      ))}
    </Carousel>
  );
};

export default CustomCarousel;
