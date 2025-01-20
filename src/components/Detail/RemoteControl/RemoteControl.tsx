import IconComponent from "@/components/Asset/Icon";
import styles from "./RemoteControl.module.scss";
import { RemoteControlProps } from "./RemoteControl.types";
import ShareBtn from "../ShareBtn/ShareBtn";

export default function RemoteControl({
  isLiked,
  onLikeClick,
  feedId,
  title,
  image,
}: RemoteControlProps) {
  return (
    <div className={styles.remoteControl}>
      <button onClick={onLikeClick} className={styles.controlButton}>
        <IconComponent name={isLiked ? "heartFullDetail" : "heartDetail"} width={50} height={50} />
      </button>
      <ShareBtn feedId={feedId} title={title} image={image} isRemoteControl />
    </div>
  );
}
