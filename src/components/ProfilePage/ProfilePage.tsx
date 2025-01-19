import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import Profile from "./Profile/Profile";
import styles from "./ProfilePage.module.scss";
import IconComponent from "../Asset/Icon";
import Card from "../Layout/WholeFeed/Card/Card";
import { ProfilePageProps } from "./ProfilePage.types";
import { useUserData } from "@/api/users/getId";
import { getUserFeeds } from "@/api/users/getIdFeeds";

export default function ProfilePage({ isMyProfile, id }: ProfilePageProps) {
  const { data: userData } = useUserData(id);
  const { ref, inView } = useInView();

  const {
    data: feedsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["userFeeds", id],
    ({ pageParam = { lastCreatedAt: undefined, lastId: undefined } }) =>
      getUserFeeds({
        id,
        lastCreatedAt: pageParam.lastCreatedAt,
        lastId: pageParam.lastId,
      }),
    {
      getNextPageParam: (lastPage) => {
        if (!lastPage || lastPage.length < 12) return undefined;
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

  const allFeeds = feedsData?.pages.flat() ?? [];

  return (
    <div className={styles.container}>
      <div className={styles.center}>
        <Profile isMyProfile={isMyProfile} id={id} />
        <div className={styles.bar} />
        <div className={styles.feedContainer}>
          <section className={styles.header}>
            <div className={styles.title}>
              {isMyProfile ? "나의 그림" : "전체 그림"}
              <p className={styles.feedCount}>{userData?.feedCount}</p>
            </div>
            <div className={styles.sort}>
              최신순 <IconComponent name="down" width={20} height={20} />
            </div>
          </section>
          <section className={styles.cardContainer}>
            {allFeeds.map((feed) => (
              <div key={feed.id}>
                <Card
                  title={feed.title}
                  cards={feed.cards || []}
                  likeCount={feed.likeCount}
                  commentCount={feed.commentCount}
                  createdAt={feed.createdAt}
                  id={feed.id}
                />
              </div>
            ))}
            <div ref={ref} style={{ height: "10px" }} />
          </section>
          {isFetchingNextPage && <div className={styles.loading}>Loading more...</div>}
        </div>
      </div>
    </div>
  );
}
