import { useRecoilState } from "recoil";
import { modalState } from "@/states/modalState";
import IconComponent from "@/components/Asset/Icon";
import styles from "./ShareBtn.module.scss";
import { ShareBtnProps } from "./ShareBtn.types";

export default function ShareBtn({ feedId, title, image }: ShareBtnProps) {
  const [, setModal] = useRecoilState(modalState);

  const handleOpenShareModal = () => {
    setModal({
      isOpen: true,
      type: "SHARE",
      data: { feedId, title, image },
    });
  };

  return (
    <div className={styles.shareBtn} onClick={handleOpenShareModal}>
      <IconComponent name="shareDetail" width={40} height={40} />
    </div>
  );
}
