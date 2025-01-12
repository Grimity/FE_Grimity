import React from "react";
import styles from "./Layout.module.scss";
import { LayoutProps } from "./Layout.types";
import Nav from "./Nav/Nav";
import Header from "./Header/Header";

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.layout}>
      <Header />
      <Nav />
      <main>{children}</main>
    </div>
  );
}
