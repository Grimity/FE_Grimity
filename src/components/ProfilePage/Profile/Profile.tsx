import Link from "next/link";
import styles from "./Profile.module.scss";
import Button from "../../Button/Button";
import { useMyData } from "@/api/users/getMe";
import Image from "next/image";
import { formatCurrency } from "@/utils/formatCurrency";
import { modalState } from "@/states/modalState";
import { useRecoilState, useRecoilValue } from "recoil";
import { useMyFollower } from "@/api/users/getMeFollowers";
import { ProfileProps } from "./Profile.types";
import { useUserData } from "@/api/users/getId";
import { deleteFollow } from "@/api/users/deleteIdFollow";
import { putFollow } from "@/api/users/putIdFollow";
import { useToast } from "@/utils/useToast";
import { useFollower } from "@/api/users/getIdFollowers";
import { useFollowing } from "@/api/users/getIdFollowings";
import { authState } from "@/states/authState";

export default function Profile({ isMyProfile, id }: ProfileProps) {
  const [, setModal] = useRecoilState(modalState);
  const { isLoggedIn } = useRecoilValue(authState);
  const { data: myData } = useMyData();
  const { data: myFollowerData } = useMyFollower();
  const { data: followerData } = useFollower(id);
  const { data: followingData } = useFollowing(id);
  const { data: userData, refetch: refetchUserData } = useUserData(id);
  const { showToast } = useToast();

  const handleFollowerModal = () => {
    if (!isLoggedIn) {
      showToast("로그인 후 조회가 가능합니다!", "error");
    } else {
      if (isMyProfile) {
        if (myFollowerData && Array.isArray(myFollowerData)) {
          setModal({
            isOpen: true,
            type: "FOLLOWER_LIST",
            data: myFollowerData,
            follow: true,
            isMine: isMyProfile,
          });
        }
      } else {
        if (followerData && Array.isArray(followerData)) {
          setModal({
            isOpen: true,
            type: "FOLLOWER_LIST",
            data: followerData,
            follow: true,
          });
        }
      }
    }
  };

  const handleFollowingModal = () => {
    if (!isLoggedIn) {
      showToast("로그인 후 조회가 가능합니다!", "error");
    } else {
      if (followingData && Array.isArray(followingData)) {
        setModal({
          isOpen: true,
          type: "FOLLOWING_LIST",
          data: followingData,
          follow: true,
          isMine: isMyProfile,
        });
      }
    }
  };

  const handleFollowClick = async () => {
    try {
      await putFollow(id);
      refetchUserData();
    } catch (error) {
      showToast("오류가 발생했습니다. 다시 시도해주세요.", "error");
    }
  };

  const handleUnfollowClick = async () => {
    try {
      await deleteFollow(id);
      refetchUserData();
    } catch (error) {
      showToast("오류가 발생했습니다. 다시 시도해주세요.", "error");
    }
  };

  return (
    <div className={styles.container}>
      {userData && (
        <>
          <section className={styles.infoContainer}>
            <div className={styles.leftContainer}>
              <div className={styles.topContainer}>
                {userData.image !== "https://image.grimity.com/null" ? (
                  <Image
                    src={userData.image}
                    width={70}
                    height={70}
                    alt="프로필 이미지"
                    className={styles.profileImage}
                  />
                ) : (
                  <Image
                    src="/image/default.svg"
                    width={70}
                    height={70}
                    alt="프로필 이미지"
                    className={styles.profileImage}
                  />
                )}
                <div className={styles.nameDate}>
                  <h2 className={styles.name}>{userData.name}</h2>
                  {myData && <p className={styles.date}>{userData.email}</p>}
                </div>
              </div>
              <p className={styles.description}>{userData.description}</p>
            </div>
            <div className={styles.rightContainer}>
              <div className={styles.followEdit}>
                <div className={styles.follow}>
                  <div className={styles.follower} onClick={handleFollowingModal}>
                    팔로잉
                    <p className={styles.followerColor}>
                      {formatCurrency(userData.followingCount)}
                    </p>
                  </div>
                  <div className={styles.follower} onClick={handleFollowerModal}>
                    팔로워
                    <p className={styles.followerColor}>{formatCurrency(userData.followerCount)}</p>
                  </div>
                </div>
                {isLoggedIn ? (
                  isMyProfile ? (
                    <Link href="/profile-edit">
                      <Button size="s" type="tertiary">
                        프로필 편집
                      </Button>
                    </Link>
                  ) : userData.isFollowing ? (
                    <button className={styles.unfollowBtn} onClick={handleUnfollowClick}>
                      언 팔로우
                    </button>
                  ) : (
                    <button className={styles.followBtn} onClick={handleFollowClick}>
                      팔로우
                    </button>
                  )
                ) : null}
              </div>
              <div className={styles.linkContainer}>
                {userData.links.map(({ linkName, link }, index) => (
                  <div key={index}>
                    <a
                      href={link}
                      className={styles.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      🔗 {linkName}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
