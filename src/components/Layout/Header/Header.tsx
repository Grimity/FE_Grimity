import React from "react";
import Image from "next/image";
import styles from "./Header.module.scss";
import IconComponent from "@/components/Asset/Icon";
import SearchBar from "@/components/SearchBar/SearchBar";
import Button from "@/components/Button/Button";
import router from "next/router";

export default function Header() {
  const handleReload = () => {
    router.reload();
  };

  return (
    <header className={styles.header}>
      <div className={styles.cursor} onClick={handleReload}>
        <Image src="/image/logo.svg" width={90} height={45} alt="logo" />
      </div>
      <SearchBar placeholder="작품 정보를 검색해보세요." />
      <div className={styles.wrapper}>
        {/* TODO: 로그인한 유저에게만 보이도록 수정 */}
        <Button size="s" type="primary">
          그림 올리기
        </Button>
        <div className={styles.cursor}>
          <IconComponent name="alarm" width={24} height={24} alt="알림" />
        </div>
        <div className={styles.cursor}>
          <IconComponent name="setting" width={24} height={24} alt="설정" />
        </div>
      </div>
    </header>
  );
}
