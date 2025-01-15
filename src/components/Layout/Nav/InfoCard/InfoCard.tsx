import styles from "./InfoCard.module.scss";
import IconComponent from "@/components/Asset/Icon";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState } from "@/states/modalState";
import { useMyData } from "@/api/users/getMe";
import Image from "next/image";
import { formatCurrency } from "@/utils/formatCurrency";
import Link from "next/link";
import { authState } from "@/states/authState";
import { useMyFollower } from "@/api/users/getMeFollowers";
import { useFollowing } from "@/api/users/getIdFollowings";

export default function InfoCard() {
  const [, setModal] = useRecoilState(modalState);
  const { data: myData } = useMyData();
  const { isLoggedIn, user_id } = useRecoilValue(authState);
  const { data: followerData } = useMyFollower();
  const { data: followingData } = useFollowing(user_id);

  const handleFollowerModal = () => {
    if (followerData && Array.isArray(followerData)) {
      setModal({
        isOpen: true,
        type: "FOLLOWER_LIST",
        data: followerData,
        follow: true,
        isMine: true,
      });
    }
  };

  const handleFollowingModal = () => {
    if (followingData && Array.isArray(followingData)) {
      setModal({
        isOpen: true,
        type: "FOLLOWING_LIST",
        data: followingData,
        follow: true,
        isMine: true,
      });
    }
  };

  return (
    <section className={styles.loginContainer}>
      {isLoggedIn && myData ? (
        <>
          <Link href={`/users/${myData.id}`}>
            <div className={styles.loginTop}>
              <div className={styles.loginTopLeft}>
                {myData.image !== "https://image.grimity.com/null" ? (
                  <Image
                    src={myData.image}
                    width={44}
                    height={44}
                    alt="프로필 이미지"
                    className={styles.profileImage}
                  />
                ) : (
                  <Image
                    src="/image/default.svg"
                    width={44}
                    height={44}
                    alt="프로필 이미지"
                    className={styles.profileImage}
                  />
                )}
                <p className={styles.loginBtn}>{myData.name}</p>
              </div>
              <IconComponent name="rightSm" width={24} height={24} alt="프로필 보기" />
            </div>
          </Link>
          <div className={styles.whiteBar} />
          <div className={styles.loginBottom}>
            <div className={styles.follow} onClick={handleFollowingModal}>
              팔로잉<p className={styles.count}>{formatCurrency(myData.followingCount)}</p>
            </div>
            <div className={styles.follow} onClick={handleFollowerModal}>
              팔로워<p className={styles.count}>{formatCurrency(myData.followerCount)}</p>
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
