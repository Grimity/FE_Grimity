import React from "react";
import styles from "./Layout.module.scss";
import { LayoutProps } from "./Layout.types";
import Nav from "./Nav/Nav";
import Header from "./Header/Header";
import { useRouter } from "next/router";

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const hideNav = ["/write"].includes(router.pathname);

  return (
    <div className={styles.layout}>
      <Header />
      {!hideNav ? (
        <div className={styles.children}>
          <Nav />
          {children}
        </div>
      ) : (
        <div className={styles.hideChildren}>{children}</div>
      )}
    </div>
  );
}
