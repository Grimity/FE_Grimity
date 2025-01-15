import MyProfile from "./MyProfile/MyProfile";
import styles from "./MyPage.module.scss";
import IconComponent from "../Asset/Icon";
import Card from "../Layout/WholeFeed/Card/Card";

export default function MyPage() {
  return (
    <div className={styles.container}>
      <div className={styles.center}>
        <MyProfile />
        <div className={styles.bar} />
        <div className={styles.feedContainer}>
          <section className={styles.header}>
            <h2 className={styles.title}>
              나의 그림 <p className={styles.feedCount}>123</p>
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
    </div>
  );
}
