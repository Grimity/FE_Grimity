import { useRecoilValue } from "recoil";
import Image from "next/image";
import styles from "./Header.module.scss";
import IconComponent from "@/components/Asset/Icon";
import SearchBar from "@/components/SearchBar/SearchBar";
import Button from "@/components/Button/Button";
import Link from "next/link";
import { authState } from "@/states/authState";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Header() {
  const { isLoggedIn } = useRecoilValue(authState);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const hideBtn = ["/write"].includes(router.pathname);

  return (
    <header className={styles.header}>
      <Link href="/">
        <div className={styles.cursor}>
          <Image src="/image/logo.svg" width={90} height={45} alt="logo" />
        </div>
      </Link>
      <div className={styles.searchBar}>
        <SearchBar
          placeholder="작품 정보를 검색해보세요."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className={styles.wrapper}>
        {isLoggedIn && (
          <>
            {!hideBtn && (
              <Link href="/write">
                <div className={styles.uploadBtn}>
                  <Button size="s" type="primary">
                    그림 올리기
                  </Button>
                </div>
              </Link>
            )}
            <div className={styles.cursor}>
              <IconComponent name="alarm" width={24} height={24} alt="알림" />
            </div>
            <div className={styles.cursor}>
              <IconComponent name="setting" width={24} height={24} alt="설정" />
            </div>
          </>
        )}
      </div>
    </header>
  );
}
