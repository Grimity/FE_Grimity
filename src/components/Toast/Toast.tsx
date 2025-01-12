import { useEffect, useState } from "react";
import styles from "./Toast.module.scss";
import { ToastProps } from "./Toast.types";
import IconComponent from "../Asset/Icon";
import { useToast } from "@/utils/useToast";

export default function Toast({ children, type }: ToastProps) {
  const { removeToast } = useToast();
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHide(true), 3500);
    const removeTimer = setTimeout(removeToast, 4000);
    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, [removeToast]);

  return (
    <div className={`${styles.toast} ${hide && styles.hide}`}>
      {type === "success" ? (
        <IconComponent name="checkFull" width={28} height={28} />
      ) : (
        <IconComponent name="errorFull" width={28} height={28} />
      )}
      {children}
    </div>
  );
}
