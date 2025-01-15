import { useState, useRef, useEffect } from "react";
import styles from "./Dropdown.module.scss";
import Image from "next/image";
import { DropdownProps } from "./Dropdown.types";

export default function Dropdown({ menuItems }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.container} ref={dropdownRef}>
      <button className={styles.kebabButton} onClick={() => setIsOpen(!isOpen)}>
        <Image src="/icon/kebab.svg" width={16} height={16} alt="메뉴" />
      </button>
      {isOpen && (
        <ul className={styles.menu}>
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={item.isDelete ? styles.deleteItem : styles.menuItem}
              onClick={() => {
                item.onClick();
                setIsOpen(false);
              }}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
