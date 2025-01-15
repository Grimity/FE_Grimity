import Profile from "./Profile/Profile";
import styles from "./ProfilePage.module.scss";
import IconComponent from "../Asset/Icon";
import Card from "../Layout/WholeFeed/Card/Card";
import { ProfilePageProps } from "./ProfilePage.types";
import { useUserData } from "@/api/users/getId";

export default function ProfilePage({ isMyProfile, id }: ProfilePageProps) {
  const { data: userData } = useUserData(id);

  return (
    <div className={styles.container}>
      {isMyProfile ? (
        <div className={styles.center}>
          <Profile isMyProfile={isMyProfile} id={id} />
          <div className={styles.bar} />
          <div className={styles.feedContainer}>
            <section className={styles.header}>
              <h2 className={styles.title}>
                나의 그림 <p className={styles.feedCount}>{userData?.feedCount}</p>
              </h2>
              <div className={styles.sort}>
                최신순 <IconComponent name="down" width={20} height={20} />
              </div>
            </section>
            <section>
              <Card />
            </section>
          </div>
        </div>
      ) : (
        <div className={styles.center}>
          <Profile isMyProfile={isMyProfile} id={id} />
          <div className={styles.bar} />
          <div className={styles.feedContainer}>
            <section className={styles.header}>
              <h2 className={styles.title}>
                전체 그림 <p className={styles.feedCount}>{userData?.feedCount}</p>
              </h2>
              <div className={styles.sort}>
                최신순 <IconComponent name="down" width={20} height={20} />
              </div>
            </section>
            <section>
              <Card />
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
