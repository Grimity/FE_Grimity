import Profile from "./Profile/Profile";
import styles from "./ProfilePage.module.scss";
import IconComponent from "../Asset/Icon";
import Card from "../Layout/WholeFeed/Card/Card";
import { ProfilePageProps } from "./ProfilePage.types";
import { useUserData } from "@/api/users/getId";
import { useUserFeeds } from "@/api/users/getIdFeeds";
import { useRouter } from "next/router";
import { putView } from "@/api/feeds/putIdView";

export default function ProfilePage({ isMyProfile, id }: ProfilePageProps) {
  const { data: userData } = useUserData(id);
  const { data: userFeeds } = useUserFeeds({ id });
  const router = useRouter();

  const handleLinkClick = async (id: string) => {
    await putView(id);
    router.push(`/feeds/${id}`);
  };

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
                  <div
                    key={feed.id}
                    onClick={() => handleLinkClick(feed.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <Card
                      title={feed.title}
                      cards={feed.cards || []}
                      likeCount={feed.likeCount}
                      commentCount={feed.commentCount}
                      createdAt={feed.createdAt}
                      id={id}
                    />
                  </div>
                ))
              : null}
          </section>
        </div>
      </div>
    </div>
  );
}
