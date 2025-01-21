import { useState } from "react";
import Button from "../Button/Button";
import TextField from "../TextField/TextField";
import styles from "./Upload.module.scss";
import Image from "next/image";
import IconComponent from "../Asset/Icon";
import { useToast } from "@/utils/useToast";
import { postPresignedUrls } from "@/api/aws/postPresigned";
import router from "next/router";
import { useMutation } from "react-query";
import { FeedsRequest, FeedsResponse, postFeeds } from "@/api/feeds/postFeeds";
import { AxiosError } from "axios";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import DraggableImage from "./DraggableImage/DraggableImage";

export default function Upload() {
  const [images, setImages] = useState<{ name: string; url: string }[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isAI, setIsAI] = useState(false);
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const { showToast } = useToast();

  const { mutate: uploadFeed } = useMutation<FeedsResponse, AxiosError, FeedsRequest>(postFeeds, {
    onSuccess: (response: FeedsResponse) => {
      showToast("그림이 업로드되었습니다!", "success");
      router.push(`/feeds/${response.id}`);
    },
    onError: (error: AxiosError) => {
      showToast("업로드 중 오류가 발생했습니다. 다시 시도해주세요.", "error");
      if (error.response?.status === 400) {
        showToast("잘못된 요청입니다. 입력값을 확인해주세요.", "error");
      }
    },
  });

  const uploadImagesToServer = async (files: FileList) => {
    try {
      const remainingSlots = 10 - images.length;
      const filesToUpload = Array.from(files).slice(0, remainingSlots);

      if (remainingSlots <= 0) {
        showToast("최대 10장의 그림만 업로드할 수 있습니다.", "error");
        return;
      }

      const requests = filesToUpload.map((file) => ({
        type: "feed" as const,
        ext: file.name.split(".").pop()?.toLowerCase() as "jpg" | "jpeg" | "png" | "gif",
      }));

      const invalidFiles = filesToUpload.some(
        (file) =>
          !["jpg", "jpeg", "png", "gif"].includes(file.name.split(".").pop()?.toLowerCase() || "")
      );

      if (invalidFiles) {
        showToast("JPG, JPEG, PNG 파일만 업로드 가능합니다.", "error");
        return;
      }

      const presignedUrls = await postPresignedUrls(requests);

      const uploadPromises = filesToUpload.map((file, index) =>
        fetch(presignedUrls[index].url, {
          method: "PUT",
          body: file,
          headers: {
            "Content-Type": file.type,
          },
        })
      );

      await Promise.all(uploadPromises);

      const newImages = filesToUpload.map((file, index) => ({
        name: presignedUrls[index].imageName,
        url: URL.createObjectURL(file),
      }));

      setImages([...images, ...newImages]);
    } catch (error) {
      showToast("이미지 업로드를 실패했어요.", "error");
    }
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    setImages((prevImages) => {
      const newImages = [...prevImages];
      const [removed] = newImages.splice(sourceIndex, 1);
      newImages.splice(destinationIndex, 0, removed);
      return newImages;
    });
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      showToast("제목을 입력해주세요.", "error");
      return;
    }

    if (images.length === 0) {
      showToast("최소 1장의 그림을 업로드해야 합니다.", "error");
      return;
    }

    uploadFeed({
      title,
      cards: images.map((image) => image.name),
      isAI,
      content,
      tags,
    });
  };

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

  const isDisabled = title.trim() === "" || isAI === null;

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
                jpg, jpeg, png, gif / 파일 크기 무제한 / 최대 10장 업로드
              </p>
              <DragDropContext onDragEnd={onDragEnd}>
                <div>
                  {images.length === 0 && (
                    <label htmlFor="file-upload" className={styles.uploadBtn}>
                      <Image src="/image/upload.svg" width={420} height={268} alt="그림 올리기" />
                    </label>
                  )}
                  <Droppable droppableId="images" direction="horizontal">
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={styles.imageContainer}
                      >
                        {images.map((image, index) => (
                          <DraggableImage
                            key={image.name}
                            image={image}
                            index={index}
                            removeImage={removeImage}
                            totalImages={images.length}
                          />
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                  {images.length > 0 && images.length < 10 && (
                    <div className={styles.addBtnContainer}>
                      <label htmlFor="file-upload" className={styles.addImageBtn}>
                        <Image src="/icon/image-add.svg" width={40} height={40} alt="이미지 추가" />
                      </label>
                    </div>
                  )}
                </div>
              </DragDropContext>
              <input
                id="file-upload"
                type="file"
                multiple
                accept="image/png, image/jpeg, image/jpg, image/gif"
                style={{ display: "none" }}
                onChange={(e) => e.target.files && uploadImagesToServer(e.target.files)}
              />
            </div>
          </section>
          <section className={styles.writeSection}>
            <Button size="s" type="secondary" disabled={isDisabled} onClick={handleSubmit}>
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
                  className={`${styles.option} ${isAI ? styles.selected : ""}`}
                  onClick={() => setIsAI(true)}
                >
                  <IconComponent name={isAI ? "checkedbox" : "checkbox"} width={24} height={24} />네
                </div>
                <div
                  className={`${styles.option} ${!isAI ? styles.selected : ""}`}
                  onClick={() => setIsAI(false)}
                >
                  <IconComponent name={!isAI ? "checkedbox" : "checkbox"} width={24} height={24} />
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
