import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode } from "swiper/modules";
import HotCard from "./HotCard/HotCard";
import styles from "./HotFeed.module.scss";
import { useHotFeed } from "@/api/feeds/getFeedsHot";
import Loader from "@/components/Layout/Loader/Loader";

export default function HotFeed() {
  const { data: hotFeeds, isLoading } = useHotFeed();

  if (isLoading) return <Loader />;

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
              key={feed.id}
              id={feed.id}
              imageUrl={feed.cards[0]}
              authorName={feed.author.name}
              authorImage={feed.author.image}
              authorId={feed.author.id}
              likeCount={feed.likeCount}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
