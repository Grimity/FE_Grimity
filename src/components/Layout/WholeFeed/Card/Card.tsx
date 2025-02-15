import { useState } from "react";
import IconComponent from "@/components/Asset/Icon";
import styles from "./Card.module.scss";
import { formatCurrency } from "@/utils/formatCurrency";
import { formattedDate } from "@/utils/formatDate";
import Image from "next/image";
import { CardProps } from "./Card.types";
import { deleteLike } from "@/api/feeds/deleteFeedsIdLike";
import { putLike } from "@/api/feeds/putFeedsIdLike";
import { useRecoilValue } from "recoil";
import { authState } from "@/states/authState";
import Link from "next/link";

export default function Card({
  isMain = false,
  title,
  cards = [],
  author,
  likeCount,
  commentCount,
  createdAt,
  id,
  isLike,
}: CardProps) {
  const { isLoggedIn } = useRecoilValue(authState);
  const [isLiked, setIsLiked] = useState(isLike);
  const [currentLikeCount, setCurrentLikeCount] = useState(likeCount);

  const hasMultipleImages = cards && cards.length > 1;

  const handleLikeClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLiked) {
      await deleteLike(id);
      setCurrentLikeCount((prev) => prev - 1);
    } else {
      await putLike(id);
      setCurrentLikeCount((prev) => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        {isLoggedIn && isMain && (
          <div className={styles.likeBtn} onClick={handleLikeClick}>
            <IconComponent name={isLiked ? "heartRed" : "heartGray"} width={28} height={28} />
          </div>
        )}
        {hasMultipleImages && (
          <div className={styles.overlapIcon}>
            <IconComponent name="overlap" width={12} height={12} />
          </div>
        )}
        <Link href={`/feeds/${id}`}>
          <Image
            src={cards[0]}
            alt={title}
            layout="fill"
            objectFit="cover"
            className={styles.image}
          />
          <div className={styles.titleOverlay}>{title}</div>
        </Link>
      </div>
      <div className={styles.profileContainer}>
        {isMain && author ? (
          <Link href={`/users/${author.id}`}>
            <div className={styles.profile}>
              <div className={styles.profileImage}>
                {author.image !== "https://image.grimity.com/null" ? (
                  <Image
                    src={author.image}
                    alt={author.name}
                    width={24}
                    height={24}
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
              <p className={styles.author}>{author.name}</p>
            </div>
          </Link>
        ) : (
          <div className={styles.countContainer}>
            <div className={styles.likeContainer}>
              <IconComponent name="heart2" width={16} height={16} />
              <p className={styles.count2}>{formatCurrency(currentLikeCount)}</p>
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
              <p className={styles.count}>{formatCurrency(currentLikeCount)}</p>
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
