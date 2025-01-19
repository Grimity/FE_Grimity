import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import { useEffect, useState, useMemo } from "react";
import Profile from "./Profile/Profile";
import styles from "./ProfilePage.module.scss";
import IconComponent from "../Asset/Icon";
import Card from "../Layout/WholeFeed/Card/Card";
import { ProfilePageProps } from "./ProfilePage.types";
import { useUserData } from "@/api/users/getId";
import { getUserFeeds } from "@/api/users/getIdFeeds";

type SortOption = "latest" | "likes" | "views" | "oldest";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "latest", label: "최신 순" },
  { value: "likes", label: "좋아요 순" },
  { value: "views", label: "조회수 순" },
  { value: "oldest", label: "오래된 순" },
];

export default function ProfilePage({ isMyProfile, id }: ProfilePageProps) {
  const [sortBy, setSortBy] = useState<SortOption>("latest");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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

  const handleSortChange = (option: SortOption) => {
    setSortBy(option);
    setIsDropdownOpen(false);
  };

  const allFeeds = feedsData?.pages.flat() ?? [];

  const sortedFeeds = useMemo(() => {
    return [...allFeeds].sort((a, b) => {
      switch (sortBy) {
        case "latest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case "likes":
          return b.likeCount - a.likeCount;
        case "views":
          return b.viewCount - a.viewCount;
        default:
          return 0;
      }
    });
  }, [allFeeds, sortBy]);

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
            <div className={styles.sortWrapper}>
              <div
                className={styles.sortButton}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                role="button"
                tabIndex={0}
              >
                {sortOptions.find((option) => option.value === sortBy)?.label}
                <div className={`${styles.icon} ${isDropdownOpen ? styles.iconRotated : ""}`}>
                  <IconComponent name="down" width={20} height={20} />
                </div>
              </div>
              {isDropdownOpen && (
                <div className={styles.dropdown}>
                  {sortOptions.map((option) => (
                    <div
                      key={option.value}
                      className={`${styles.dropdownItem} ${
                        sortBy === option.value ? styles.active : ""
                      }`}
                      onClick={() => handleSortChange(option.value)}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
          <section className={styles.cardContainer}>
            {sortedFeeds.map((feed) => (
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
