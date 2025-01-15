import React from "react";
import styles from "./SearchBar.module.scss";
import { SearchBarProps } from "./SearchBar.types";
import IconComponent from "../Asset/Icon";

export default function SearchBar({ placeholder, value, onChange }: SearchBarProps) {
  return (
    <div className={styles.container}>
      <input className={styles.input} placeholder={placeholder} value={value} onChange={onChange} />
      <div className={styles.cursor}>
        <IconComponent name="magnifier" width={20} height={20} alt="검색" />
      </div>
    </div>
  );
}
