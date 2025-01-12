import IconComponent from "@/components/Asset/Icon";
import styles from "./Banner.module.scss";

export default function Banner() {
  return (
    <div className={styles.container}>
      <div>
        <p className={styles.textTop}>early user event</p>
        <p className={styles.textMid}>그리미티 얼리어답터 혜택!</p>
        <p className={styles.textBottom}>초기 멤버 유저에게만 특별한 혜택을 제공드려요.</p>
      </div>
      <IconComponent name="banner" width={250} height={250} alt="배너 이미지" />
    </div>
  );
}
