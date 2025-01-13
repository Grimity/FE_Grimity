import IconComponent from "@/components/Asset/Icon";
import styles from "./Hot.module.scss";
import { formatCurrency } from "@/utils/formatCurrency";

export default function Hot() {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <IconComponent name="temp1" width={280} height={200} alt="인기 그림" />
      </div>
      <div className={styles.profileContainer}>
        <div className={styles.profile}>
          <div className={styles.profileImage}>
            <IconComponent name="temp3" width={24} height={24} />
          </div>
          <p className={styles.author}>닉네임은열글자가최대</p>
        </div>
        <div className={styles.likeContainer}>
          <IconComponent name="heartRed" width={14} height={14} />
          <p className={styles.count}>{formatCurrency(123456)}</p>
        </div>
      </div>
    </div>
  );
}
