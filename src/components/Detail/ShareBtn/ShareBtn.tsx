import { useRecoilState } from "recoil";
import { modalState } from "@/states/modalState";
import IconComponent from "@/components/Asset/Icon";
import styles from "./ShareBtn.module.scss";
import { ShareBtnProps } from "./ShareBtn.types";

export default function ShareBtn({ feedId, title, image, isRemoteControl }: ShareBtnProps) {
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
      <IconComponent
        name={isRemoteControl ? "remoteShare" : "shareDetail"}
        width={isRemoteControl ? 36 : 40}
        height={isRemoteControl ? 36 : 40}
      />
    </div>
  );
}
