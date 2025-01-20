import IconComponent from "@/components/Asset/Icon";
import styles from "./RemoteControl.module.scss";
import { RemoteControlProps } from "./RemoteControl.types";
import ShareBtn from "../ShareBtn/ShareBtn";
import { formatCurrency } from "@/utils/formatCurrency";

export default function RemoteControl({
  isLiked,
  onLikeClick,
  feedId,
  title,
  image,
  likeCount,
}: RemoteControlProps) {
  return (
    <div className={styles.remoteControl}>
      <div className={styles.likeContainer}>
        <button onClick={onLikeClick} className={styles.controlButton}>
          <IconComponent name={isLiked ? "remoteLikeFull" : "remoteLike"} width={36} height={36} />
        </button>
        <p className={styles.count}>{formatCurrency(likeCount)}</p>
      </div>
      <ShareBtn feedId={feedId} title={title} image={image} isRemoteControl />
    </div>
  );
}
