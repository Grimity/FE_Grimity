import styles from "./Tooltip.module.scss";
import { TooltipProps } from "./Tooltip.types";

export default function Tooltip({
  message,
  position = "top",
  onClose,
  hasCloseBtn = false,
}: TooltipProps) {
  return (
    <div className={`${styles.tooltip} ${styles[position]}`}>
      <span className={styles.message}>{message}</span>
      {hasCloseBtn && (
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>
      )}
      <div className={styles.arrow}></div>
    </div>
  );
}
