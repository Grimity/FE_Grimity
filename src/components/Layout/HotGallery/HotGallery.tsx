import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode } from "swiper/modules";
import Hot from "./Hot/Hot";
import styles from "./HotGallery.module.scss";

export default function HotGallery() {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>🔥 오늘의 핫한 그림</h3>
      <Swiper
        spaceBetween={20}
        freeMode={true}
        slidesPerView="auto"
        modules={[FreeMode]}
        className={styles.hotContainer}
      >
        {Array(7)
          .fill(0)
          .map((_, index) => (
            <SwiperSlide key={index} className={styles.slide}>
              <Hot />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
