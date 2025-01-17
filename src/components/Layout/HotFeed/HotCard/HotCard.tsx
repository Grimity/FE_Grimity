import IconComponent from "@/components/Asset/Icon";
import styles from "./HotCard.module.scss";
import { formatCurrency } from "@/utils/formatCurrency";
import Image from "next/image";
import { HotCardProps } from "./HotCard.type";

export default function HotCard({ imageUrl, authorName, authorImage, likeCount }: HotCardProps) {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          src={imageUrl}
          // width={280}
          // height={0}
          // layout="intrinsic"
          layout="fill"
          objectFit="cover"
          alt="인기 그림"
          className={styles.image}
        />
      </div>
      <div className={styles.profileContainer}>
        <div className={styles.profile}>
          <div className={styles.profileImage}>
            {authorImage !== "https://image.grimity.com/null" ? (
              <Image
                src={authorImage}
                width={24}
                height={24}
                alt="프로필 이미지"
                className={styles.profileImage}
              />
            ) : (
              <Image
                src="/image/default-border.svg"
                width={24}
                height={24}
                alt="프로필 이미지"
                className={styles.profileImage}
              />
            )}
          </div>
          <p className={styles.author}>{authorName}</p>
        </div>
        <div className={styles.likeContainer}>
          <IconComponent name="heartRed" width={14} height={14} />
          <p className={styles.count}>{formatCurrency(likeCount)}</p>
        </div>
      </div>
    </div>
  );
}
