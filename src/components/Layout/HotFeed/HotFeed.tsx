import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode } from "swiper/modules";
import HotCard from "./HotCard/HotCard";
import styles from "./HotFeed.module.scss";
import { useHotFeed } from "@/api/feeds/getFeedsHot";

export default function HotFeed() {
  const { data: hotFeeds, isLoading } = useHotFeed();

  if (isLoading) return <p>로딩 중...</p>;

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
        {hotFeeds?.map((feed) => (
          <SwiperSlide key={feed.id} className={styles.slide}>
            <HotCard
              imageUrl={feed.cards[0]}
              authorName={feed.author.name}
              authorImage={feed.author.image}
              likeCount={feed.likeCount}
              key={feed.id}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
