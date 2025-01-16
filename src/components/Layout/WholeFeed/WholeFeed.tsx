import { useFeeds } from "@/api/feeds/getFeeds";
import Card from "./Card/Card";
import styles from "./WholeFeed.module.scss";
import Link from "next/link";

export default function WholeFeed() {
  const { data, isLoading, isError } = useFeeds({});

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading feeds</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h3 className={styles.title}>전체 그림</h3>
        <p className={styles.subtitle}>그리미티 작가들의 훌륭한 그림을 살펴보세요!</p>
      </div>
      <div className={styles.galleryGrid}>
        {data?.map((feed) => (
          <Link href={`/feeds/${feed.id}`} key={feed.id}>
            <Card
              isMain
              title={feed.title}
              cards={feed.cards}
              author={feed.author}
              likeCount={feed.likeCount}
              commentCount={feed.commentCount}
              createdAt={feed.createdAt}
              id={feed.id}
              isLike={feed.isLike}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
