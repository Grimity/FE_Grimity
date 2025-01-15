import { useState } from "react";
import Image from "next/image";
import styles from "./Following.module.scss";
import { useToast } from "@/utils/useToast";
import SearchBar from "@/components/SearchBar/SearchBar";
import Link from "next/link";
import Dropdown from "@/components/Dropdown/Dropdown";
import { deleteFollow } from "@/api/users/deleteIdFollow";
import router from "next/router";
import { useRecoilState } from "recoil";
import { modalState } from "@/states/modalState";

export default function Following({ data, isMine }: { data: any[]; isMine?: boolean }) {
  const [search, setSearch] = useState("");
  const [followers, setFollowers] = useState(data);
  const [, setModal] = useRecoilState(modalState);
  const { showToast } = useToast();

  const filteredFollowers = followers.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDeleteFollowing = async (id: string) => {
    try {
      await deleteFollow(id);
      setFollowers((prev) => prev.filter((user) => user.id !== id));
      router.reload();
    } catch (error) {
      showToast("언팔로우를 실패했습니다.", "error");
    }
  };

  const handleLinkClick = () => {
    setModal({ isOpen: false, type: null, data: null });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>팔로잉</h2>
      <SearchBar
        placeholder="닉네임을 검색해보세요."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul className={styles.listContainer}>
        {filteredFollowers.length > 0 ? (
          filteredFollowers.map((user) => (
            <li key={user.id} className={styles.list}>
              <Link href={`/users/${user.id}`} onClick={handleLinkClick}>
                <div className={styles.profile}>
                  <Image
                    src={user.image}
                    width={48}
                    height={48}
                    alt="팔로잉 프로필 이미지"
                    className={styles.image}
                  />
                  <div className={styles.nameCount}>
                    <p className={styles.name}>{user.name}</p>
                    <p className={styles.followerCount}>
                      팔로워<p className={styles.followerCountGreen}>{user.followerCount}</p>
                    </p>
                  </div>
                </div>
              </Link>
              {isMine && (
                <div className={styles.dropdownContainer}>
                  {user.isFollowing && <button className={styles.isFollowing}>팔로잉</button>}
                  <Dropdown
                    menuItems={[
                      {
                        label: "팔로잉 취소",
                        onClick: () => handleDeleteFollowing(user.id),
                        isDelete: true,
                      },
                    ]}
                  />
                </div>
              )}
            </li>
          ))
        ) : (
          <p className={styles.noResult}>사용자를 찾을 수 없습니다.</p>
        )}
      </ul>
    </div>
  );
}
