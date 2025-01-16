import IconComponent from "@/components/Asset/Icon";
import styles from "./Card.module.scss";
import { formatCurrency } from "@/utils/formatCurrency";
import { formattedDate } from "@/utils/formatDate";
import Image from "next/image";
import { CardProps } from "./Card.types";

export default function Card({
  isMain = false,
  title,
  cards = [],
  author,
  likeCount,
  commentCount,
  createdAt,
}: CardProps) {
  const hasMultipleImages = cards.length > 1;

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        {isMain && (
          <div className={styles.likeBtn}>
            <IconComponent name="heartGray" width={28} height={28} />
          </div>
        )}
        {hasMultipleImages && (
          <div className={styles.overlapIcon}>
            <IconComponent name="overlap" width={12} height={12} />
          </div>
        )}
        <Image src={cards[0]} alt={title} width={280} height={300} className={styles.image} />
        <div className={styles.titleOverlay}>{title}</div>
      </div>
      <div className={styles.profileContainer}>
        {isMain ? (
          <div className={styles.profile}>
            <div className={styles.profileImage}>
              <IconComponent name="temp3" width={24} height={24} />
            </div>
            <p className={styles.author}>{author}</p>
          </div>
        ) : (
          <div className={styles.countContainer}>
            <div className={styles.likeContainer}>
              <IconComponent name="heart2" width={16} height={16} />
              <p className={styles.count2}>{formatCurrency(likeCount)}</p>
            </div>
            <div className={styles.likeContainer}>
              <IconComponent name="message2" width={16} height={16} />
              <p className={styles.count2}>{formatCurrency(commentCount)}</p>
            </div>
          </div>
        )}
        {isMain ? (
          <div className={styles.countContainer}>
            <div className={styles.likeContainer}>
              <IconComponent name="heart" width={16} height={16} />
              <p className={styles.count}>{formatCurrency(likeCount)}</p>
            </div>
            <div className={styles.likeContainer}>
              <IconComponent name="message" width={16} height={16} />
              <p className={styles.count}>{formatCurrency(commentCount)}</p>
            </div>
          </div>
        ) : (
          <p className={styles.date}>{formattedDate(createdAt)}</p>
        )}
      </div>
    </div>
  );
}
