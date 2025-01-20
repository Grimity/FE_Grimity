import React, { useEffect, useState } from "react";
import styles from "./Layout.module.scss";
import { LayoutProps } from "./Layout.types";
import Nav from "./Nav/Nav";
import Header from "./Header/Header";
import { useRouter } from "next/router";
import IconComponent from "../Asset/Icon";

export default function Layout({ children }: LayoutProps) {
  const [isScrollAbove, setIsScrollAbove] = useState(false);
  const router = useRouter();
  const hideNav = ["/write", "/feeds/[id]/edit"].includes(router.pathname);

  // 스크롤 위치 감지
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsScrollAbove(true);
      } else {
        setIsScrollAbove(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.layout}>
      <Header />
      {!hideNav ? (
        <div className={styles.children}>
          <Nav />
          {children}
          <div
            className={`${styles.topButton} ${isScrollAbove && styles.show}`}
            onClick={scrollToTop}
            role="button"
            tabIndex={0}
          >
            <IconComponent name="up" width={30} height={30} />
          </div>
        </div>
      ) : (
        <div className={styles.hideChildren}>
          {children}
          <div
            className={`${styles.topButton} ${isScrollAbove && styles.show}`}
            onClick={scrollToTop}
            role="button"
            tabIndex={0}
          >
            <IconComponent name="up" width={30} height={30} />
          </div>
        </div>
      )}
    </div>
  );
}
