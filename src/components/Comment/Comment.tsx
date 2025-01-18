import { useState } from "react";
import TextField from "../TextField/TextField";
import styles from "./Comment.module.scss";
import Image from "next/image";
import { authState } from "@/states/authState";
import { useRecoilValue } from "recoil";
import { useUserData } from "@/api/users/getId";
import { usePostFeedsComments } from "@/api/feeds-comments/postFeedComments";
import { FeedsCommentsResponse, useGetFeedsComments } from "@/api/feeds-comments/getFeedComments";
import { CommentProps } from "./Comment.types";
import { timeAgoOrFormattedDate } from "@/utils/timeAgo";
import Dropdown from "../Dropdown/Dropdown";
import { useToast } from "@/utils/useToast";
import { deleteComments } from "@/api/feeds-comments/deleteFeedComment";
import { useMutation } from "react-query";
import Link from "next/link";

export default function Comment({ feedId, feedWriterId }: CommentProps) {
  const { isLoggedIn, user_id } = useRecoilValue(authState);
  const { data: userData, isLoading } = isLoggedIn
    ? useUserData(user_id)
    : { data: null, isLoading: false };
  const { showToast } = useToast();
  const [comment, setComment] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);

  const { data: commentsData, refetch } = useGetFeedsComments({ feedId }) as {
    data: FeedsCommentsResponse | undefined;
    refetch: () => void;
  };
  const postCommentMutation = usePostFeedsComments();
  const deleteCommentMutation = useMutation(deleteComments, {
    onSuccess: () => {
      showToast("댓글이 삭제되었습니다.", "success");
      refetch();
    },
    onError: () => {
      showToast("댓글 삭제에 실패했습니다.", "error");
    },
  });

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleReply = (commentId: string) => {
    setReplyTo(commentId);
  };

  const handleReport = () => {
    showToast("신고 처리 로직 추가 필요합니다.", "success");
  };

  const handleCommentDelete = async (id: string) => {
    deleteCommentMutation.mutate(id);
  };

  const handleSubmit = async () => {
    if (!isLoggedIn || !comment.trim()) return;

    postCommentMutation.mutate(
      {
        feedId,
        content: comment,
        parentCommentId: replyTo ?? undefined,
      },
      {
        onSuccess: () => {
          setComment("");
          setReplyTo(null);
          refetch();
        },
      }
    );
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  const renderComment = (comment: FeedsCommentsResponse["comments"][number], isNested = false) => {
    return (
      <div key={comment.id} className={`${styles.comment} ${isNested && styles.nestedComment}`}>
        {isNested && (
          <Image
            src="/icon/reply.svg"
            width={28}
            height={28}
            alt="답글 아이콘"
            className={styles.replyIcon}
          />
        )}
        <div className={styles.commentBox}>
          <Link href={`/users/${comment.writer.id}`}>
            {comment.writer.image !== "https://image.grimity.com/null" ? (
              <Image
                src={comment.writer.image}
                width={28}
                height={28}
                alt="댓글 프로필"
                className={styles.writerImage}
              />
            ) : (
              <Image
                src="/image/default.svg"
                width={28}
                height={28}
                alt="댓글 프로필"
                className={styles.writerImage}
              />
            )}
          </Link>
          <div className={styles.commentBody}>
            <div className={styles.writerReply}>
              <Link href={`/users/${comment.writer.id}`}>
                <div className={styles.writerName}>
                  {comment.writer.name}
                  {comment.writer.id === feedWriterId && (
                    <span className={styles.ownerTag}>(작성자)</span>
                  )}
                </div>
              </Link>
              {isLoggedIn && (
                <div className={styles.replyBtnDropdown}>
                  {!isNested && (
                    <>
                      {!replyTo ? (
                        <button onClick={() => handleReply(comment.id)} className={styles.replyBtn}>
                          답글
                        </button>
                      ) : (
                        <button onClick={() => setReplyTo(null)} className={styles.replyBtn}>
                          취소
                        </button>
                      )}
                    </>
                  )}

                  {comment.writer.id === user_id ? (
                    <Dropdown
                      menuItems={[
                        {
                          label: "삭제하기",
                          onClick: () => handleCommentDelete(comment.id),
                          isDelete: true,
                        },
                      ]}
                    />
                  ) : (
                    <Dropdown
                      menuItems={[
                        {
                          label: "신고하기",
                          onClick: handleReport,
                          isDelete: true,
                        },
                      ]}
                    />
                  )}
                </div>
              )}
            </div>
            <p className={styles.commentText}>{comment.content}</p>
            <p className={styles.createdAt}>{timeAgoOrFormattedDate(comment.createdAt)}</p>
          </div>
        </div>
        {/* 답글이 있는 경우 */}
        {comment.childComments?.length > 0 && (
          <div className={styles.childComments}>
            {comment.childComments.map((reply) =>
              renderComment(reply as FeedsCommentsResponse["comments"][number], true)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <section className={styles.countContainer}>
        댓글<p className={styles.count}>{commentsData?.commentCount || 0}</p>
      </section>

      <section className={styles.inputContainer}>
        <div className={styles.inputWrapper}>
          <div className={styles.input}>
            {isLoggedIn && userData ? (
              <Image
                src={
                  userData.image !== "https://image.grimity.com/null"
                    ? userData.image
                    : "/image/default-border.svg"
                }
                width={40}
                height={40}
                alt="프로필 이미지"
                className={styles.writerImage}
              />
            ) : (
              <Image
                src="/image/default-border.svg"
                width={40}
                height={40}
                alt="프로필 이미지"
                className={styles.writerImage}
              />
            )}

            <TextField
              placeholder={isLoggedIn ? "댓글 입력하기" : "회원만 댓글 달 수 있어요!"}
              isComment
              value={comment}
              onChange={handleCommentChange}
              onFocus={() => {
                if (!isLoggedIn) {
                  showToast("회원만 댓글 달 수 있어요!", "error");
                }
              }}
            />

            {isLoggedIn ? (
              <Image
                src="/icon/comment-upload.svg"
                width={40}
                height={40}
                className={styles.uploadBtn}
                alt="댓글 작성"
                onClick={handleSubmit}
              />
            ) : (
              <Image
                src="/icon/comment-upload-disabled.svg"
                width={40}
                height={40}
                alt="댓글 작성"
                className={styles.uploadBtn}
              />
            )}
          </div>
          {replyTo && (
            <div className={styles.replyIndicator}>
              <div className={styles.message}>
                <p className={styles.messageGreen}>
                  {commentsData?.comments.find((c) => c.id === replyTo)?.writer.name}
                </p>
                에게 답글 다는 중
              </div>
            </div>
          )}
        </div>
      </section>

      <section className={styles.commentsList}>
        {commentsData?.comments
          .filter((comment) => !comment.parentId)
          .map((comment) => renderComment(comment))}
      </section>
    </div>
  );
}
