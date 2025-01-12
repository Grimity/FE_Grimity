import { useToast } from "@/utils/useToast";
import styles from "./Toast.module.scss";
import IconComponent from "../Asset/Icon";

export default function Toast() {
  const { toast } = useToast();

  if (!toast.isShow) return null;

  return (
    <div className={styles.toast}>
      {toast.type === "success" ? (
        <IconComponent name="checkFull" width={28} height={28} />
      ) : (
        <IconComponent name="errorFull" width={28} height={28} />
      )}
      {toast.message}
    </div>
  );
}
