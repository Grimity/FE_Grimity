import { useGetNotifications } from "@/api/notifications/getNotifications";
import IconComponent from "../Asset/Icon";
import Noti from "./Noti/Noti";
import Image from "next/image";
import styles from "./Notifications.module.scss";
import { NotificationsProps } from "./Notifications.types";
import { useRouter } from "next/router";
import { putNotificationsId } from "@/api/notifications/putNotifications";
import { deleteNotifications } from "@/api/notifications/deleteNotifications";
import { putNotifications } from "@/api/notifications/putNotifications";

export default function Notifications({ onClose }: NotificationsProps) {
  const { data = [], refetch } = useGetNotifications();
  const router = useRouter();

  const handleReadNotification = async (
    id: string,
    type: string,
    feedId?: string,
    actorId?: string
  ) => {
    try {
      await putNotificationsId(id);
      refetch();

      if (type === "COMMENT" || type === "LIKE") {
        router.push(`/feeds/${feedId}`);
        onClose();
      } else if (type === "FOLLOW") {
        router.push(`/users/${actorId}`);
        onClose();
      }
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  // 모두 읽음
  const handleMarkAllAsRead = async () => {
    try {
      await putNotifications();
      refetch();
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error);
    }
  };

  // 전체 삭제
  const handleDeleteAllNotifications = async () => {
    try {
      await deleteNotifications();
      refetch();
    } catch (error) {
      console.error("Failed to delete notifications:", error);
    }
  };

  // 읽은 알림은 아래로, 안 읽은 알림은 최신 알림 순으로 정렬
  const sortedNotifications = data
    .sort((a, b) => {
      if (a.isRead === b.isRead) {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return a.isRead ? 1 : -1;
    })
    .slice(0, 50);

  return (
    <div className={styles.container}>
      <section className={styles.topSection}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>알림</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <IconComponent name="x" width={24} height={24} />
          </button>
        </div>
        {data.length !== 0 && (
          <div className={styles.options}>
            <button className={styles.option} onClick={handleMarkAllAsRead}>
              모두 읽음
            </button>
            <button className={styles.option} onClick={handleDeleteAllNotifications}>
              전체 삭제
            </button>
          </div>
        )}
      </section>
      <section className={styles.notiSection}>
        {data.length ? (
          sortedNotifications.map((notification) => (
            <Noti
              key={notification.id}
              notification={notification}
              onClick={() =>
                handleReadNotification(
                  notification.id,
                  notification.type,
                  notification.feedId,
                  notification.actorId
                )
              }
            />
          ))
        ) : (
          <div className={styles.noneNoti}>
            <Image src="/icon/none-noti.svg" width={32} height={32} alt="알림 없음" />
            아직 알림 소식이 없어요.
          </div>
        )}
      </section>
    </div>
  );
}
