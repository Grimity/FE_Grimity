import { useState } from "react";
import Image from "next/image";
import styles from "./Follower.module.scss";
import { deleteMyFollowers } from "@/api/users/deleteMeFollowers";
import { useToast } from "@/utils/useToast";
import SearchBar from "@/components/SearchBar/SearchBar";
import Link from "next/link";
import Dropdown from "@/components/Dropdown/Dropdown";
import { modalState } from "@/states/modalState";
import { useRecoilState } from "recoil";
import IconComponent from "@/components/Asset/Icon";

export default function Follower({ data, isMine }: { data: any[]; isMine?: boolean }) {
  const [search, setSearch] = useState("");
  const [followers, setFollowers] = useState(data);
  const [, setModal] = useRecoilState(modalState);
  const { showToast } = useToast();

  const filteredFollowers = followers.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDeleteFollower = async (id: string) => {
    try {
      await deleteMyFollowers(id);
      setFollowers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      showToast("팔로워 삭제를 실패했습니다.", "error");
    }
  };

  const handleLinkClick = () => {
    setModal({ isOpen: false, type: null, data: null });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>팔로워</h2>
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
                  {user.image !== "https://image.grimity.com/null" || user.image === null ? (
                    <Image
                      src={user.image}
                      width={48}
                      height={48}
                      alt="팔로워 프로필 이미지"
                      className={styles.image}
                    />
                  ) : (
                    <Image
                      src="/image/default.svg"
                      width={48}
                      height={48}
                      alt="팔로워 프로필 이미지"
                      className={styles.image}
                    />
                  )}
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
                        label: "팔로워 삭제",
                        onClick: () => handleDeleteFollower(user.id),
                        isDelete: true,
                      },
                    ]}
                  />
                </div>
              )}
            </li>
          ))
        ) : (
          <div className={styles.noResult}>
            <IconComponent name="userX" width={32} height={32} />
            팔로우하는 유저가 없어요.
          </div>
        )}
      </ul>
    </div>
  );
}
