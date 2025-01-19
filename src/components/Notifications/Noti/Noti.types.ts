import { NotificationsResponse } from "@/api/notifications/getNotifications";

export interface NotiProps {
  notification: NotificationsResponse;
  onClick: () => void;
}
