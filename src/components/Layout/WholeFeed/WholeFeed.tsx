import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import Card from "./Card/Card";
import styles from "./WholeFeed.module.scss";
import { getFeeds, FeedsResponse } from "@/api/feeds/getFeeds";
import Loader from "@/components/Layout/Loader/Loader";

const ITEMS_PER_PAGE = 12;

export default function WholeFeed() {
  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery(
    ["feeds"],
    ({ pageParam = { lastCreatedAt: undefined, lastId: undefined } }) =>
      getFeeds({
        lastCreatedAt: pageParam.lastCreatedAt,
        lastId: pageParam.lastId,
      }),
    {
      getNextPageParam: (lastPage) => {
        if (!lastPage || lastPage.length < ITEMS_PER_PAGE) return undefined;
        const lastItem = lastPage[lastPage.length - 1];
        return {
          lastCreatedAt: lastItem.createdAt,
          lastId: lastItem.id,
        };
      },
    }
  );

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return <Loader />;
  }

  const allFeeds = data?.pages.flat() ?? [];

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h3 className={styles.title}>전체 그림</h3>
        <p className={styles.subtitle}>그리미티 작가들의 훌륭한 그림을 살펴보세요!</p>
      </div>
      <div className={styles.galleryGrid}>
        {allFeeds.map((feed) => (
          <Card
            key={feed.id}
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
        ))}
        <div ref={ref} style={{ height: "10px", gridColumn: "1/-1" }} />
      </div>
    </div>
  );
}
