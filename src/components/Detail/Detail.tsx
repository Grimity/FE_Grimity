import styles from "./Detail.module.scss";
import { DetailProps } from "./Detail.types";
import { formatCurrency } from "@/utils/formatCurrency";
import { useDetails } from "@/api/feeds/getFeedsId";
import Image from "next/image";
import { useState, useEffect } from "react";
import Dropdown from "../Dropdown/Dropdown";
import { authState } from "@/states/authState";
import { useRecoilValue } from "recoil";
import { putFollow } from "@/api/users/putIdFollow";
import { deleteFollow } from "@/api/users/deleteIdFollow";
import { useToast } from "@/utils/useToast";
import IconComponent from "../Asset/Icon";
import { deleteLike } from "@/api/feeds/deleteFeedsIdLike";
import { putLike } from "@/api/feeds/putFeedsIdLike";
import { timeAgoOrFormattedDate } from "@/utils/timeAgo";
import Button from "../Button/Button";
import Link from "next/link";
import { putView } from "@/api/feeds/putIdView";
import { deleteFeeds } from "@/api/feeds/deleteFeedsId";
import { useRouter } from "next/router";
import Tooltip from "../Tooltip/Tooltip";

export default function Detail({ id }: DetailProps) {
  const { isLoggedIn, user_id } = useRecoilValue(authState);
  const { data: details, isLoading } = useDetails(id);
  const [isExpanded, setIsExpanded] = useState(false);
  const { showToast } = useToast();
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [currentLikeCount, setCurrentLikeCount] = useState(0);
  const [viewCounted, setViewCounted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!details) return;
    setIsFollowing(details.author.isFollowing ?? false);
    setIsLiked(details.isLike ?? false);
    setCurrentLikeCount(details.likeCount ?? 0);
  }, [details]);

  // 새로고침 조회수 증가
  useEffect(() => {
    const incrementViewCount = async () => {
      if (!id || viewCounted) return;

      try {
        await putView(id);
        setViewCounted(true);
      } catch (error) {
        console.error("조회수 증가 에러", error);
      }
    };

    incrementViewCount();
  }, [id, viewCounted]);

  useEffect(() => {
    const firstVisit = localStorage.getItem("firstDetailVisit");
    if (!firstVisit) {
      setShowTooltip(true);
      localStorage.setItem("firstDetailVisit", "true");
    }
  }, []);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  const handleShowMore = () => {
    setIsExpanded(!isExpanded);
  };

  const handleFollowClick = async (id: string) => {
    try {
      await putFollow(id);
      setIsFollowing(true);
    } catch (error) {
      showToast("오류가 발생했습니다. 다시 시도해주세요.", "error");
    }
  };

  const handleUnfollowClick = async (id: string) => {
    try {
      await deleteFollow(id);
      setIsFollowing(false);
    } catch (error) {
      showToast("오류가 발생했습니다. 다시 시도해주세요.", "error");
    }
  };

  const handleDelete = async () => {
    if (!id) return;

    try {
      await deleteFeeds(id);
      showToast("삭제가 완료되었습니다.", "success");
      router.push("/");
    } catch (error) {
      showToast("삭제 중 오류가 발생했습니다.", "error");
    }
  };

  const handleOpenEditPage = () => {
    router.push(`/feeds/${id}/edit`);
  };

  const handleLikeClick = async () => {
    if (!isLoggedIn) {
      showToast("로그인 후 좋아요를 누를 수 있어요.", "error");
      return;
    }

    if (isLiked) {
      await deleteLike(id);
      setCurrentLikeCount((prev) => prev - 1);
    } else {
      await putLike(id);
      setCurrentLikeCount((prev) => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className={styles.container}>
      <div className={styles.center}>
        {details && (
          <>
            <section className={styles.profileContainer}>
              <Link href={`/users/${details.author.id}`}>
                <div className={styles.profileLeft}>
                  <div className={styles.profileImage}>
                    {details.author.image !== "https://image.grimity.com/null" ? (
                      <Image
                        src={details.author.image}
                        alt={details.author.name}
                        className={styles.authorImage}
                        width={48}
                        height={48}
                      />
                    ) : (
                      <Image
                        src="/image/default-border.svg"
                        width={48}
                        height={48}
                        alt="프로필 이미지"
                        className={styles.authorImage}
                      />
                    )}
                  </div>
                  <div className={styles.authorInfo}>
                    <p className={styles.authorName}>{details.author.name}</p>
                    <div className={styles.follower}>
                      팔로워
                      <p className={styles.followerColor}>
                        {formatCurrency(details.author.followerCount)}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
              <div className={styles.followDropdown}>
                {isLoggedIn &&
                  user_id !== details.author.id &&
                  (isFollowing ? (
                    <div
                      className={styles.followBtn}
                      onClick={() => handleUnfollowClick(details.author.id)}
                    >
                      언 팔로우
                    </div>
                  ) : (
                    <Button
                      size="s"
                      type="primary"
                      onClick={() => handleFollowClick(details.author.id)}
                    >
                      팔로우
                    </Button>
                  ))}
                {isLoggedIn &&
                  (user_id === details.author.id ? (
                    <div className={styles.dropdownContainer}>
                      <Dropdown
                        menuItems={[
                          {
                            label: "수정하기",
                            onClick: handleOpenEditPage,
                          },
                          {
                            label: "삭제하기",
                            onClick: handleDelete,
                            isDelete: true,
                          },
                        ]}
                      />
                    </div>
                  ) : (
                    <div className={styles.dropdownContainer}>
                      <Dropdown
                        menuItems={[
                          {
                            label: "신고하기",
                            onClick: handleShowMore,
                            isDelete: true,
                          },
                        ]}
                      />
                    </div>
                  ))}
              </div>
            </section>
            <section className={styles.imageGallery}>
              {details.cards.slice(0, 2).map((card, index) => (
                <div key={index} className={styles.imageWrapper}>
                  <Image
                    src={card}
                    alt={`Card image ${index + 1}`}
                    width={600}
                    height={0}
                    layout="intrinsic"
                    className={styles.cardImage}
                  />
                  {index === 1 && details.cards.length > 2 && !isExpanded && (
                    <>
                      <div className={styles.gradient} />
                      <div
                        onClick={handleShowMore}
                        className={styles.showMore}
                        role="button"
                        tabIndex={0}
                      >
                        그림 더보기
                        <IconComponent name="down" width={16} height={16} />
                      </div>
                    </>
                  )}
                </div>
              ))}
            </section>
            {isExpanded &&
              details.cards.slice(2).map((card, index) => (
                <div key={index + 2} className={styles.imageWrapper2}>
                  <Image
                    src={card}
                    alt={`Card image ${index + 3}`}
                    width={600}
                    height={0}
                    layout="intrinsic"
                    className={styles.cardImage}
                  />
                </div>
              ))}
            <section className={styles.btnStats}>
              {showTooltip && (
                <Tooltip
                  message="마음에 든다면 좋아요를 눌러보세요!"
                  position="bottom-left"
                  onClose={() => setShowTooltip(false)}
                />
              )}
              <div className={styles.btnContainer}>
                <div className={styles.likeBtn} onClick={handleLikeClick}>
                  <IconComponent
                    name={isLiked ? "heartFullDetail" : "heartDetail"}
                    width={40}
                    height={40}
                  />
                </div>
                <div className={styles.likeBtn}>
                  <IconComponent name="shareDetail" width={40} height={40} />
                </div>
              </div>
              <div className={styles.stats}>
                <div className={styles.stat}>
                  <Image
                    src="/icon/like-count.svg"
                    width={16}
                    height={16}
                    alt="좋아요 수"
                    className={styles.statIcon}
                  />
                  {currentLikeCount}
                </div>
                <div className={styles.stat}>
                  <Image
                    src="/icon/view-count.svg"
                    width={16}
                    height={0}
                    layout="intrinsic"
                    alt="조회수"
                    className={styles.statIcon}
                  />
                  {details.viewCount}
                </div>
              </div>
            </section>
            <section className={styles.contentContainer}>
              <h2 className={styles.title}>{details.title}</h2>
              <p className={styles.content}>{details.content}</p>
              <p className={styles.createdAt}>{timeAgoOrFormattedDate(details.createdAt)}</p>
              <div className={styles.tags}>
                {details.isAI && <div className={styles.aiBtn}>AI 그림</div>}
                {details.tags.map((tag, index) => (
                  <span key={index} className={styles.tag}>
                    #{tag}
                  </span>
                ))}
              </div>
            </section>
            <div className={styles.bar} />
          </>
        )}
      </div>
    </div>
  );
}
