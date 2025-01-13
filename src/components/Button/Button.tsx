import styles from "./Button.module.scss";
import { ButtonProps } from "./Button.types";

export default function Button({ children, size, type, disabled, onClick }: ButtonProps) {
  let className = `${styles.button} ${styles[size]}`;

  if (type) {
    className += ` ${styles[type]}`;
  }

  if (disabled) {
    className += ` ${styles.disabled}`;
  }

  return (
    <button className={className} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
