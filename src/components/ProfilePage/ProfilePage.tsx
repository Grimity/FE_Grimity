import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery, useQueryClient } from "react-query";
import { useUserData } from "@/api/users/getId";
import { getUserFeeds } from "@/api/users/getIdFeeds";
import Profile from "./Profile/Profile";
import styles from "./ProfilePage.module.scss";
import IconComponent from "../Asset/Icon";
import Card from "../Layout/WholeFeed/Card/Card";
import { ProfilePageProps } from "./ProfilePage.types";

type SortOption = "latest" | "like" | "view" | "oldest";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "latest", label: "최신 순" },
  { value: "like", label: "좋아요 순" },
  { value: "view", label: "조회수 순" },
  { value: "oldest", label: "오래된 순" },
];

const PAGE_SIZE = 12;

export default function ProfilePage({ isMyProfile, id }: ProfilePageProps) {
  const [sortBy, setSortBy] = useState<SortOption>("latest");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: userData } = useUserData(id);
  const { ref, inView } = useInView();
  const [feeds, setFeeds] = useState<any[]>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const queryClient = useQueryClient();

  const {
    data: feedsData,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery(
    ["userFeeds", id, sortBy],
    async ({ pageParam = 0 }) => {
      const data = await getUserFeeds({
        id,
        size: PAGE_SIZE,
        sort: sortBy,
        index: pageParam,
      });
      return { items: data, nextPage: pageParam + 1 };
    },
    {
      getNextPageParam: (lastPage) => {
        if (!lastPage.items || lastPage.items.length < PAGE_SIZE) {
          return undefined;
        }
        return lastPage.nextPage;
      },
      keepPreviousData: true,
    }
  );

  // Sort 변경 시 데이터 초기화, 인덱스를 0으로
  useEffect(() => {
    // 쿼리 데이터 리셋
    queryClient.resetQueries(["userFeeds", id, sortBy]);

    setPageIndex(0);
    setFeeds([]);
    refetch();
  }, [sortBy, id, queryClient, refetch]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  // feedsData 업데이트 시 feeds 배열을 업데이트
  useEffect(() => {
    if (feedsData?.pages) {
      const newFeeds = feedsData.pages.flatMap((page) => page.items);
      if (pageIndex === 0) {
        setFeeds(newFeeds);
      } else {
        setFeeds((prevFeeds) => [...prevFeeds, ...newFeeds]);
      }
    }
  }, [feedsData, pageIndex]);

  const handleSortChange = (option: SortOption) => {
    setSortBy(option);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const allFeeds = feeds;

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
            <div className={styles.sortWrapper} ref={dropdownRef}>
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
            {allFeeds.map((feed, index) => (
              <div key={`${feed.id}-${index}`}>
                <Card
                  title={feed.title}
                  cards={feed.cards}
                  likeCount={feed.likeCount}
                  commentCount={feed.commentCount}
                  createdAt={feed.createdAt}
                  id={feed.id}
                />
              </div>
            ))}
            <div ref={ref} />
          </section>
        </div>
      </div>
    </div>
  );
}
