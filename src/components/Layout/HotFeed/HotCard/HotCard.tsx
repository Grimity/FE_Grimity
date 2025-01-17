import IconComponent from "@/components/Asset/Icon";
import styles from "./HotCard.module.scss";
import { formatCurrency } from "@/utils/formatCurrency";
import Image from "next/image";
import { HotCardProps } from "./HotCard.type";
import Link from "next/link";

export default function HotCard({
  id,
  imageUrl,
  authorName,
  authorImage,
  authorId,
  likeCount,
}: HotCardProps) {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Link href={`/feeds/${id}`}>
          <Image
            src={imageUrl}
            layout="fill"
            objectFit="cover"
            alt="인기 그림"
            className={styles.image}
          />
        </Link>
      </div>
      <div className={styles.profileContainer}>
        <Link href={`/users/${authorId}`}>
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
        </Link>
        <div className={styles.likeContainer}>
          <IconComponent name="heartRed" width={14} height={14} />
          <p className={styles.count}>{formatCurrency(likeCount)}</p>
        </div>
      </div>
    </div>
  );
}
