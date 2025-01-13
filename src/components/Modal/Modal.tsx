import { useRecoilState } from "recoil";
import styles from "./Modal.module.scss";
import { modalState } from "@/states/modalState";
import Login from "./Login/Login";
import Nickname from "./Nickname/Nickname";
import Follower from "./Follower/Follower";
import { usePreventScroll } from "@/utils/usePreventScroll";
import IconComponent from "../Asset/Icon";

export default function Modal() {
  const [modal, setModal] = useRecoilState(modalState);

  usePreventScroll(modal.isOpen);
  if (!modal.isOpen) return null;

  const closeModal = () => {
    setModal({ isOpen: false, type: null, data: null });
  };

  const renderModalContent = () => {
    switch (modal.type) {
      case "LOGIN":
        return <Login />;
      case "NICKNAME":
        return <Nickname />;
      case "FOLLOWER_LIST":
        return <Follower data={modal.data} />;
      // case "FOLLOWING_LIST":
      //   return <FollowingModal data={modal.data} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.overlay} onClick={closeModal}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {renderModalContent()}
        <button className={styles.closeButton} onClick={closeModal}>
          <IconComponent name="x" width={32} height={32} />
        </button>
      </div>
    </div>
  );
}
