import styles from "./InfoCard.module.scss";
import IconComponent from "@/components/Asset/Icon";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState } from "@/states/modalState";
import { useMyData } from "@/api/users/getMe";
import Image from "next/image";
import { formatCurrency } from "@/utils/formatCurrency";
import Link from "next/link";
import { authState } from "@/states/authState";

export default function InfoCard() {
  const [, setModal] = useRecoilState(modalState);
  const { data: userData } = useMyData();
  const { isLoggedIn } = useRecoilValue(authState);

  return (
    <section className={styles.loginContainer}>
      {isLoggedIn && userData ? (
        <>
          <Link href="/mypage">
            <div className={styles.loginTop}>
              <div className={styles.loginTopLeft}>
                {userData.image ? (
                  <Image
                    src={userData.image}
                    width={42}
                    height={42}
                    alt="프로필 이미지"
                    className={styles.profileImage}
                  />
                ) : (
                  <Image
                    src="/image/default.svg"
                    width={42}
                    height={42}
                    alt="프로필 이미지"
                    className={styles.profileImage}
                  />
                )}
                <p className={styles.loginBtn}>{userData.name}</p>
              </div>
              <IconComponent name="rightSm" width={24} height={24} alt="프로필 보기" />
            </div>
          </Link>
          <div className={styles.whiteBar} />
          <div className={styles.loginBottom}>
            <div className={styles.follow}>
              팔로잉<p className={styles.count}>{formatCurrency(userData.followingCount)}</p>
            </div>
            <div className={styles.follow}>
              팔로워<p className={styles.count}>{formatCurrency(userData.followerCount)}</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className={styles.loginTop}
            onClick={() => setModal({ isOpen: true, type: "LOGIN" })}
          >
            <div className={styles.loginTopLeft}>
              <IconComponent name="default" width={40} height={40} alt="기본 프로필 이미지" />
              <p className={styles.loginBtn}>로그인</p>
            </div>
            <IconComponent name="rightSm" width={24} height={24} alt="로그인" />
          </div>
          <div className={styles.whiteBar} />
          <div className={styles.loginBottom}>
            <div className={styles.follow}>
              팔로잉<p className={styles.count}>-</p>
            </div>
            <div className={styles.follow}>
              팔로워<p className={styles.count}>-</p>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
