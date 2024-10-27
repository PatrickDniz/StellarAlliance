"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import styles from "./style.module.css";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

export default function SectionHero() { 
  const images = ["/banners/fullbanner01.png", "/banners/fullbanner02.png"];

  return (
    <section className={styles.section}>
      <div className={styles.swiperContainer}>
        <Swiper
          loop={true}
          pagination={{
            clickable: true,
          }}
          speed={1500}
          autoplay={{
            delay: 2500,
            disableOnInteraction: true,
          }}
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          spaceBetween={16}
          freeMode={true}
          allowTouchMove={true}
        >
          {images.map((image, index) => (
            <SwiperSlide className={styles.fullbanner} key={index}>
              <Image src={image} alt={"fullbanner"} width={1980} height={1080} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={styles.titleBar}>
        <h2>{"StellarAlliance"}</h2>
        <h3>{"Unindo forças para proteger o cosmos!"}</h3>
      </div>
    </section>
  );
}
