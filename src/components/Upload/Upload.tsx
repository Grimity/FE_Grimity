import { useState } from "react";
import Button from "../Button/Button";
import TextField from "../TextField/TextField";
import styles from "./Upload.module.scss";
import Image from "next/image";
import IconComponent from "../Asset/Icon";
import { useToast } from "@/utils/useToast";

export default function Upload() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isAi, setIsAi] = useState(false);
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const { showToast } = useToast();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && tag.trim() !== "") {
      event.preventDefault();

      if (tags.length >= 8) {
        showToast("태그는 최대 8개까지 추가할 수 있어요", "error");
        return;
      }

      setTags([...tags, tag.trim()]);
      setTag("");
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const isDisabled = title.trim() === "" || isAi === null;

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.sectionContainer}>
          <section className={styles.imageSection}>
            <h2 className={styles.title}>그림 올리기</h2>
            <div>
              <div className={styles.subtitle}>
                <p className={styles.stroke}>*</p>이미지 (0/10)
              </div>
              <p className={styles.description}>
                jpg, jpeg, png / 파일 크기 무제한 / 최대 10장 업로드
              </p>
              <Image
                src="/image/upload.svg"
                width={420}
                height={268}
                className={styles.uploadBtn}
                alt="그림 올리기"
              />
            </div>
          </section>
          <section className={styles.writeSection}>
            <Button size="s" type="secondary" disabled={isDisabled}>
              그림 올리기
            </Button>
            <div className={styles.textField}>
              <TextField
                placeholder="제목을 입력해주세요."
                label="제목"
                maxLength={24}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                isUpload
                color="GREEN"
              />
              <div className={styles.contentContainer}>
                <label className={styles.subtitle} htmlFor="upload-text">
                  내용
                </label>
                <div className={styles.textareaContainer}>
                  <textarea
                    id="upload-text"
                    className={styles.textarea}
                    placeholder="내용을 입력해주세요."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                  {content && (
                    <p className={styles.countTotal}>
                      <p className={styles.countGreen}>{content.length}</p>
                      /3000
                    </p>
                  )}
                </div>
              </div>
              <div className={styles.tagInputContainer}>
                <TextField
                  placeholder="태그 입력해서 추가하기"
                  label="태그"
                  maxLength={8}
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  onKeyDown={handleKeyDown}
                  isUpload
                  color="GREEN"
                />
                <div className={styles.tagList}>
                  {tags.map((tag, index) => (
                    <div key={index} className={styles.tag}>
                      {tag}
                      <div
                        className={styles.removeButton}
                        onClick={() => removeTag(index)}
                        role="button"
                        tabIndex={0}
                      >
                        <Image
                          src="/icon/x-sm.svg"
                          width={16}
                          height={16}
                          alt=""
                          className={styles.closeBtn}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <label className={styles.subtitle} htmlFor="ai-check">
                <p className={styles.stroke}>*</p>AI 그림인가요?
              </label>
              <div className={styles.options}>
                <div
                  className={`${styles.option} ${isAi ? styles.selected : ""}`}
                  onClick={() => setIsAi(true)}
                >
                  <IconComponent name={isAi ? "checkedbox" : "checkbox"} width={24} height={24} />네
                </div>
                <div
                  className={`${styles.option} ${!isAi ? styles.selected : ""}`}
                  onClick={() => setIsAi(false)}
                >
                  <IconComponent name={!isAi ? "checkedbox" : "checkbox"} width={24} height={24} />
                  아니오
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
