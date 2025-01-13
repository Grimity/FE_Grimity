import { useRecoilState } from "recoil";
import { useState } from "react";
import { modalState } from "@/states/modalState";
import styles from "./Nickname.module.scss";

export default function Nickname() {
  const [nickname, setNickname] = useState("");
  const [agree, setAgree] = useState(false);
  const [modal, setModal] = useRecoilState(modalState);

  return (
    <div className={styles.container}>
      <h2>닉네임 설정</h2>
      <input
        type="text"
        placeholder="닉네임을 입력하세요"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <label>
        <input type="checkbox" checked={agree} onChange={() => setAgree(!agree)} />
        서비스 이용약관에 동의합니다.
      </label>
      <button disabled={!nickname || !agree}>확인</button>
    </div>
  );
}
