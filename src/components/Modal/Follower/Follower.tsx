import { useState } from "react";
import styles from "./Follower.module.scss";

export default function Follower({ data }: { data: any[] }) {
  const [search, setSearch] = useState("");

  const filteredFollowers = data.filter((user) => user.name.includes(search));

  return (
    <div className={styles.container}>
      <h2>팔로워 목록</h2>
      <input
        type="text"
        placeholder="작가명 검색"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {filteredFollowers.map((user) => (
          <li key={user.id}>
            <span>{user.name}</span>
            <button>팔로우</button>
            <button>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
