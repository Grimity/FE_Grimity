import IconComponent from "@/components/Asset/Icon";
import styles from "./Noti.module.scss";
import { NotiProps } from "./Noti.types";
import { timeAgoOrFormattedDate } from "@/utils/timeAgo";

export default function Noti({ notification, onClick }: NotiProps) {
  const renderMessage = () => {
    switch (notification.type) {
      case "COMMENT":
        return `님이 회원님에게 댓글을 달았어요.`;
      case "LIKE":
        return `님이 회원님의 피드에 좋아요를 남겼어요.`;
      case "FOLLOW":
        return `님이 회원님을 팔로우하기 시작했어요.`;
      default:
        return "";
    }
  };

  return (
    <div
      className={`${styles.container} ${notification.isRead ? styles.read : ""}`}
      onClick={onClick}
    >
      <div className={styles.iconWrapper}>
        <IconComponent
          name={
            notification.type === "COMMENT"
              ? "notiComment"
              : notification.type === "LIKE"
              ? "notiLike"
              : notification.type === "FOLLOW"
              ? "notiFollow"
              : "notiFollow"
          }
          width={18}
          height={18}
        />
        <div className={styles.content}>
          <div className={styles.message}>
            <span className={styles.actorName}>{notification.actorName}</span>
            {renderMessage()}
          </div>
          <span className={styles.date}>{timeAgoOrFormattedDate(notification.createdAt)}</span>
        </div>
      </div>
      <IconComponent name="right" width={20} height={20} />
    </div>
  );
}
