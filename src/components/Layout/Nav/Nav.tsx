import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import styles from "./Nav.module.scss";
import IconComponent from "@/components/Asset/Icon";
import { formatCurrency } from "@/utils/formatCurrency";
import Link from "next/link";
import InfoCard from "./InfoCard/InfoCard";
import { authState } from "@/states/authState";

export default function Nav() {
  const [mounted, setMounted] = useState(false);
  const [, setAuth] = useRecoilState(authState);
  const { isLoggedIn } = useRecoilValue(authState);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    setAuth({
      access_token: "",
      isLoggedIn: false,
    });
    localStorage.removeItem("access_token");
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className={styles.nav}>
      <InfoCard />
      <section className={styles.menuContainer}>
        <Link href="/">
          <div className={styles.menu}>
            <IconComponent name="layers" width={20} height={20} />
            <p className={styles.menuTxt}>전체 그림</p>
          </div>
        </Link>
        <div className={styles.menu}>
          <IconComponent name="lightning" width={20} height={20} />
          <p className={styles.menuTxt}>인기 그림</p>
        </div>
        <div className={styles.menu}>
          <IconComponent name="layout" width={20} height={20} />
          <p className={styles.menuTxt}>자유게시판</p>
          <p className={styles.subtext}>(준비 중)</p>
        </div>
      </section>
      <div className={styles.bar} />
      <section className={styles.recommendContainer}>
        <p className={styles.title}>인기 작가</p>
        <div className={styles.recommendList}>
          <div className={styles.recommend}>
            <div className={styles.left}>
              <div className={styles.profileImage}>
                <IconComponent name="temp1" width={32} height={32} alt="프로필 사진" />
              </div>
              <div>
                <p className={styles.author}>메구미</p>
                <div className={styles.follow}>
                  팔로워<p className={styles.count}>{formatCurrency(1999)}</p>
                </div>
              </div>
            </div>
            <p className={styles.update}>+27</p>
          </div>
          <div className={styles.recommend}>
            <div className={styles.left}>
              <div className={styles.profileImage}>
                <IconComponent name="default" width={32} height={32} alt="프로필 사진" />
              </div>
              <div>
                <p className={styles.author}>닉네임</p>
                <div className={styles.follow}>
                  팔로워<p className={styles.count}>{formatCurrency(1999)}</p>
                </div>
              </div>
            </div>
            <p className={styles.update}>+27</p>
          </div>
          <div className={styles.recommend}>
            <div className={styles.left}>
              <div className={styles.profileImage}>
                <IconComponent name="temp2" width={32} height={32} alt="프로필 사진" />
              </div>
              <div>
                <p className={styles.author}>닉네임</p>
                <div className={styles.follow}>
                  팔로워<p className={styles.count}>{formatCurrency(5)}</p>
                </div>
              </div>
            </div>
            <p className={styles.update}>+27</p>
          </div>
          <div className={styles.recommend}>
            <div className={styles.left}>
              <div className={styles.profileImage}>
                <IconComponent name="temp3" width={32} height={32} alt="프로필 사진" />
              </div>
              <div>
                <p className={styles.author}>닉네임</p>
                <div className={styles.follow}>
                  팔로워<p className={styles.count}>{formatCurrency(123456789)}</p>
                </div>
              </div>
            </div>
            <p className={styles.update}>+27</p>
          </div>
        </div>
        {isLoggedIn && <button onClick={handleLogout}>로그아웃</button>}
      </section>
    </div>
  );
}
