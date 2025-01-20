import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import styles from "./Nav.module.scss";
import IconComponent from "@/components/Asset/Icon";
import { formatCurrency } from "@/utils/formatCurrency";
import Link from "next/link";
import InfoCard from "./InfoCard/InfoCard";
import { authState } from "@/states/authState";
import router from "next/router";
import Image from "next/image";
import { usePopular } from "@/api/users/getPopular";
import Loader from "@/components/Layout/Loader/Loader";

export default function Nav() {
  const [mounted, setMounted] = useState(false);
  const [, setAuth] = useRecoilState(authState);
  const { isLoggedIn } = useRecoilValue(authState);

  const { data: popularData, isLoading } = usePopular();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    setAuth({
      access_token: "",
      isLoggedIn: false,
      user_id: "",
    });
    router.push("/");
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_id");
  };

  if (!mounted) {
    return null;
  }

  if (isLoading) {
    return <Loader />;
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
          {popularData &&
            popularData.map((author) => (
              <Link href={`/users/${author.id}`} key={author.id}>
                <div className={styles.recommend}>
                  <div className={styles.left}>
                    <div className={styles.profileImage}>
                      {author.image !== "https://image.grimity.com/null" ? (
                        <Image
                          src={author.image}
                          width={32}
                          height={32}
                          alt={author.name}
                          className={styles.image}
                        />
                      ) : (
                        <Image
                          src="/image/default.svg"
                          width={32}
                          height={32}
                          alt="프로필 이미지"
                          className={styles.image}
                        />
                      )}
                    </div>
                    <div>
                      <p className={styles.author}>{author.name}</p>
                      <div className={styles.follow}>
                        팔로워<p className={styles.count}>{formatCurrency(author.followerCount)}</p>
                      </div>
                    </div>
                  </div>
                  <p className={styles.update}>+{author.feedCount}</p>
                </div>
              </Link>
            ))}
        </div>
      </section>
      {isLoggedIn && (
        <div className={styles.logoutContainer}>
          <div className={styles.bar} />
          <div onClick={handleLogout} className={styles.logoutButton} role="button" tabIndex={0}>
            <IconComponent name="logout" width={20} height={20} />
            로그아웃
          </div>
        </div>
      )}
    </div>
  );
}
