import Profile from "./Profile/Profile";
import styles from "./ProfilePage.module.scss";
import IconComponent from "../Asset/Icon";
import Card from "../Layout/WholeFeed/Card/Card";
import { ProfilePageProps } from "./ProfilePage.types";
import { useUserData } from "@/api/users/getId";
import { useUserFeeds } from "@/api/users/getIdFeeds";
import Link from "next/link";

export default function ProfilePage({ isMyProfile, id }: ProfilePageProps) {
  const { data: userData } = useUserData(id);
  const { data: userFeeds } = useUserFeeds({ id });

  return (
    <div className={styles.container}>
      <div className={styles.center}>
        <Profile isMyProfile={isMyProfile} id={id} />
        <div className={styles.bar} />
        <div className={styles.feedContainer}>
          <section className={styles.header}>
            <h2 className={styles.title}>
              {isMyProfile ? "나의 그림" : "전체 그림"}
              <p className={styles.feedCount}>{userData?.feedCount}</p>
            </h2>
            <div className={styles.sort}>
              최신순 <IconComponent name="down" width={20} height={20} />
            </div>
          </section>
          <section className={styles.cardContainer}>
            {userFeeds
              ? userFeeds.map((feed) => (
                  <Link href={`/feeds/${feed.id}`}>
                    <Card
                      key={feed.id}
                      title={feed.title}
                      cards={feed.cards || []}
                      likeCount={feed.likeCount}
                      commentCount={feed.commentCount}
                      createdAt={feed.createdAt}
                      id={id}
                    />
                  </Link>
                ))
              : null}
          </section>
        </div>
      </div>
    </div>
  );
}
