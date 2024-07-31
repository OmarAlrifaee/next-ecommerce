// components/SwiperComponent.tsx
"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

type SwiperComponentProps = {
  children: React.ReactNode;
};

const SwiperComponent: React.FC<SwiperComponentProps> = ({ children }) => {
  return (
    <Swiper
      breakpoints={{
        0: {
          spaceBetween: 1,
          slidesPerView: 1,
        },
        767: {
          spaceBetween: 1,
          slidesPerView: 2,
        },
        1000: {
          spaceBetween: 2,
          slidesPerView: 2,
        },
        1280: {
          spaceBetween: 1,
          slidesPerView: 4,
        },
      }}
      navigation
      modules={[Navigation]}
      loop
    >
      {React.Children.map(children, (child, index) => (
        <SwiperSlide key={index}>{child}</SwiperSlide>
      ))}
    </Swiper>
  );
};
export default SwiperComponent;
