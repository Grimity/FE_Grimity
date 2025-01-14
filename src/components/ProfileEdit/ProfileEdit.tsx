import { useState, useEffect } from "react";
import { useMutation } from "react-query";
import TextField from "../TextField/TextField";
import styles from "./ProfileEdit.module.scss";
import { MyInfoRequest, putMyInfo } from "@/api/users/putMe";
import { useMyData } from "@/api/users/getMe";
import { useToast } from "@/utils/useToast";
import IconComponent from "../Asset/Icon";
import { AxiosError } from "axios";
import Image from "next/image";
import { postPresignedUrl } from "@/api/aws/postPresigned";
import Button from "../Button/Button";
import { putProfileImage } from "@/api/users/putMeImage";
import router from "next/router";

export default function ProfileEdit() {
  const { data: userData, isLoading } = useMyData();
  const [name, setName] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");
  const [links, setLinks] = useState<{ linkName: string; link: string }[]>([
    { linkName: "", link: "" },
  ]);
  const [profileImage, setProfileImage] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const { showToast } = useToast();

  useEffect(() => {
    if (userData) {
      setName(userData.name?.replace(/\s+$/, "") || "");
      setDescription(userData.description || "");
      setLinks(userData.links?.length ? userData.links : [{ linkName: "", link: "" }]);
      setProfileImage(userData.image || "/image/default.svg");
    }
  }, [userData]);

  const mutation = useMutation((newInfo: MyInfoRequest) => putMyInfo(newInfo), {
    onSuccess: () => {
      showToast("프로필 정보가 변경되었습니다!", "success");
      setNameError("");
    },
    onError: (error: AxiosError) => {
      showToast("오류가 발생했습니다. 다시 시도해주세요.", "error");
      if (error.response?.status === 409) {
        setNameError("닉네임이 이미 존재합니다.");
      }
    },
  });

  const ImageMutation = useMutation((imageName: string) => putProfileImage(imageName));

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);

      await uploadImageToServer(file);
    } catch (error) {
      setProfileImage(userData?.image || "/image/default.svg");
      console.error("File change error:", error);
    }
  };

  const uploadImageToServer = async (file: File) => {
    try {
      const fileExt = file.name.split(".").pop()?.toLowerCase();

      if (!fileExt || !["jpg", "jpeg", "png"].includes(fileExt)) {
        showToast("JPG, JPEG, PNG 파일만 업로드 가능합니다.", "error");
        return;
      }
      const ext = fileExt as "jpg" | "jpeg" | "png";

      const data = await postPresignedUrl({
        type: "profile",
        ext,
      });

      ImageMutation.mutate(data.imageName);

      const uploadResponse = await fetch(data.url, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error(`${uploadResponse.status}`);
      }

      showToast("프로필 사진이 변경되었습니다!", "success");
      router.reload();
    } catch (error) {
      showToast("프로필 사진 업로드에 실패했습니다.", "error");
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setName(inputValue);
    if (nameError) {
      setNameError("");
    }
  };

  const handleAddLink = () => {
    if (links.length < 3) {
      setLinks([...links, { linkName: "", link: "" }]);
    }
  };

  const handleRemoveLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const handleLinkChange = (index: number, field: "linkName" | "link", value: string) => {
    const newLinks = [...links];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setLinks(newLinks);
  };

  const handleSave = () => {
    setNameError("");
    const nameWithoutTrailingSpace = name?.replace(/\s+$/, "") || "";

    if (!nameWithoutTrailingSpace) {
      setNameError("닉네임을 입력해주세요.");
      return;
    }

    const filteredLinks = links.filter(
      (link) => link.linkName.trim() !== "" || link.link.trim() !== ""
    );

    const updatedInfo: MyInfoRequest = {
      name: nameWithoutTrailingSpace,
      description,
      links: filteredLinks,
    };

    mutation.mutate(updatedInfo);
  };

  if (isLoading || name === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      {userData && (
        <div className={styles.profileContainer}>
          <div className={styles.profileImage}>
            <label htmlFor="upload-image">
              {userData.image !== "https://image.grimity.com/null" ? (
                <Image
                  src={profileImage}
                  width={80}
                  height={80}
                  alt="프로필 이미지"
                  className={styles.image}
                />
              ) : (
                <Image
                  src="/image/default-card.svg"
                  width={80}
                  height={80}
                  alt="프로필 이미지"
                  className={styles.image}
                />
              )}
              <div className={styles.imageLabel}>
                <IconComponent name="profileEdit" width={30} height={30} alt="프로필 사진 편집" />
              </div>
            </label>
            <input
              id="upload-image"
              type="file"
              accept="image/*"
              className={styles.hidden}
              onChange={handleFileChange}
            />
          </div>
          <div className={styles.listContainer}>
            <TextField
              label="닉네임"
              placeholder="닉네임을 입력해 주세요."
              maxLength={10}
              value={name}
              onChange={handleNameChange}
              color="GREEN"
              required
              isError={!!nameError}
              errorMessage={nameError}
            />
            <TextField
              label="소개"
              placeholder="소개 문구를 입력해 주세요."
              maxLength={60}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              color="GREEN"
            />
            <div className={styles.linkContainer}>
              <label className={styles.label}>{`링크(${links.length}/3)`}</label>
              <p className={styles.message}>프로필에 다른 사이트 링크를 노출할 수 있어요.</p>
              {links.map((link, index) => (
                <div key={index} className={styles.linkInputContainer}>
                  <div className={styles.linkName}>
                    <TextField
                      placeholder="링크 명 입력"
                      value={link.linkName}
                      onChange={(e) => handleLinkChange(index, "linkName", e.target.value)}
                    />
                  </div>
                  <TextField
                    placeholder="https://"
                    value={link.link}
                    onChange={(e) => handleLinkChange(index, "link", e.target.value)}
                  />
                  <div onClick={() => handleRemoveLink(index)} className={styles.removeLinkButton}>
                    <IconComponent name="minusFull" width={32} height={32} alt="링크 삭제" />
                  </div>
                </div>
              ))}
              {links.length < 3 && (
                <div
                  onClick={handleAddLink}
                  className={styles.addLinkButton}
                  role="button"
                  tabIndex={0}
                >
                  <IconComponent name="add" width={40} height={40} alt="링크 추가" />
                </div>
              )}
            </div>
          </div>
          <Button size="l" onClick={handleSave} disabled={mutation.isLoading}>
            {mutation.isLoading ? "처리중..." : "변경 완료"}
          </Button>
        </div>
      )}
    </div>
  );
}
