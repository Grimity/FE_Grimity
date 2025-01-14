import Link from "next/link";
import styles from "./MyProfile.module.scss";
import Button from "../Button/Button";
import { useMyData } from "@/api/users/getMe";
import Image from "next/image";
import { useMembershipDuration } from "@/utils/useMembershipDuration";
import { formatCurrency } from "@/utils/formatCurrency";

export default function MyProfile() {
  const { data: userData } = useMyData();

  return (
    <div className={styles.container}>
      <div className={styles.centerContainer}>
        {userData && (
          <>
            <section className={styles.infoContainer}>
              <div className={styles.leftContainer}>
                <div className={styles.topContainer}>
                  {userData.image !== "https://image.grimity.com/null" ? (
                    <Image
                      src={userData.image}
                      width={64}
                      height={64}
                      alt="프로필 이미지"
                      className={styles.profileImage}
                    />
                  ) : (
                    <Image
                      src="/image/default-card.svg"
                      width={64}
                      height={64}
                      alt="프로필 이미지"
                      className={styles.profileImage}
                    />
                  )}
                  <div className={styles.nameDate}>
                    <h2 className={styles.name}>{userData.name}</h2>
                    <p className={styles.date}>
                      가입일 +{useMembershipDuration(userData.createdAt)}일
                    </p>
                  </div>
                </div>
                <p className={styles.description}>{userData.description}</p>
              </div>
              <div className={styles.rightContainer}>
                <div className={styles.followEdit}>
                  <div className={styles.follow}>
                    <p className={styles.follower}>
                      팔로잉
                      <p className={styles.followerColor}>
                        {formatCurrency(userData.followingCount)}
                      </p>
                    </p>
                    <p className={styles.follower}>
                      팔로워
                      <p className={styles.followerColor}>
                        {formatCurrency(userData.followerCount)}
                      </p>
                    </p>
                  </div>
                  <Link href="/mypage/edit">
                    <Button size="s" type="tertiary">
                      프로필 편집
                    </Button>
                  </Link>
                </div>
                <div className={styles.linkContainer}>
                  {userData.links.map(({ linkName, link }, index) => (
                    <p key={index}>
                      <a
                        href={link}
                        className={styles.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        🔗 {linkName}
                      </a>
                    </p>
                  ))}
                </div>
              </div>
            </section>
            <div className={styles.bar} />
          </>
        )}
      </div>
    </div>
  );
}
