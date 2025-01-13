import IconComponent from "@/components/Asset/Icon";
import styles from "./Gallery.module.scss";
import { formatCurrency } from "@/utils/formatCurrency";

export default function Gallery() {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <div className={styles.likeBtn}>
          <IconComponent name="heartGray" width={28} height={28} />
        </div>
        <div className={styles.overlapIcon}>
          <IconComponent name="overlap" width={12} height={12} />
        </div>
        <IconComponent name="temp1" width={280} height={300} />
        <div className={styles.titleOverlay}>그림 제목</div>
      </div>
      <div className={styles.profileContainer}>
        <div className={styles.profile}>
          <div className={styles.profileImage}>
            <IconComponent name="temp3" width={24} height={24} />
          </div>
          <p className={styles.author}>닉네임은열글자가최대</p>
        </div>
        <div className={styles.countContainer}>
          <div className={styles.likeContainer}>
            <IconComponent name="heart" width={16} height={16} />
            <p className={styles.count}>{formatCurrency(16)}</p>
          </div>
          <div className={styles.likeContainer}>
            <IconComponent name="message" width={16} height={16} />
            <p className={styles.count}>{formatCurrency(1111)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
