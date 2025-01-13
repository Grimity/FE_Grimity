import BASE_URL from "@/constants/baseurl";
import styles from "./Nickname.module.scss";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "@/states/modalState";
import { useMutation } from "react-query";
import TextField from "@/components/TextField/TextField";
import IconComponent from "@/components/Asset/Icon";
import Button from "@/components/Button/Button";

// TODO: 닉네임 중복 처리 확인 要
export default function Nickname() {
  const [nickname, setNickname] = useState("");
  const [agree, setAgree] = useState(false);
  const [isError, setIsError] = useState(false);
  const [, setModal] = useRecoilState(modalState);
  const modal = useRecoilState(modalState);

  const registerMutation = useMutation({
    mutationFn: async (data: { provider: string; providerAccessToken: string; name: string }) => {
      const response = await BASE_URL.post("/auth/register", data);
      return response.data;
    },
    onSuccess: (data) => {
      setModal({ isOpen: false, type: null, data: null });
    },
    onError: (error: any) => {
      if (error?.response?.status === 409) {
        setIsError(true);
      } else {
        console.error("회원가입 실패:", error);
      }
    },
  });

  const handleSubmit = () => {
    const { accessToken, provider } = modal[0].data;
    registerMutation.mutate({
      provider: provider,
      providerAccessToken: accessToken,
      name: nickname,
    });
  };

  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.title}>닉네임을 설정할게요!</h2>
        <p className={styles.subtitle}>닉네임이 곧 작가 이름이에요!</p>
      </div>
      <TextField
        placeholder="프로필에 노출될 닉네임을 입력해 주세요."
        errorMessage="중복되는 닉네임이에요."
        maxLength={10}
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        isError={isError}
      />
      <label className={styles.label}>
        <div className={styles.checkbox} onClick={() => setAgree(!agree)}>
          <IconComponent name={agree ? "heartFull" : "checkbox"} width={24} height={24} />
        </div>
        <span className={styles.text}>
          <a
            href="https://curious-lettuce-6c7.notion.site/91bc1734a25645f8a3a4c056bd139798"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.underline}
          >
            서비스이용약관
          </a>{" "}
          과{" "}
          <a
            href="https://curious-lettuce-6c7.notion.site/70f4b64f57e34e6c89f744b75331b7ef"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.underline}
          >
            개인정보취급방침
          </a>{" "}
          에 동의합니다.
        </span>
      </label>
      <Button size="l" disabled={!nickname || !agree} onClick={handleSubmit}>
        확인
      </Button>
    </div>
  );
}
