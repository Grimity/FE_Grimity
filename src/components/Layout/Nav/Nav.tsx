import React from "react";
import styles from "./Nav.module.scss";
import IconComponent from "@/components/Asset/Icon";
import { formatCurrency } from "@/utils/formatCurrency";

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <section className={styles.loginContainer}>
        <div className={styles.loginTop}>
          <div className={styles.loginTopLeft}>
            <IconComponent name="default" width={40} height={40} alt="기본 프로필 이미지" />
            <p className={styles.loginBtn}>로그인</p>
          </div>
          <IconComponent name="rightSm" width={24} height={24} alt="로그인" />
        </div>
        <div className={styles.whiteBar} />
        <div className={styles.loginBottom}>
          <div className={styles.follow}>
            팔로잉<p className={styles.count}>-</p>
          </div>
          <div className={styles.follow}>
            팔로워<p className={styles.count}>-</p>
          </div>
        </div>
      </section>
      <section className={styles.menuContainer}>
        <div className={styles.menu}>
          <IconComponent name="layers" width={20} height={20} />
          <p className={styles.menuTxt}>전체 그림</p>
        </div>
        <div className={styles.menu}>
          <IconComponent name="lightning" width={20} height={20} />
          <p className={styles.menuTxt}>인기 그림</p>
        </div>
        <div className={styles.menu}>
          <IconComponent name="layout" width={20} height={20} />
          <p className={styles.menuTxt}>자유게시판</p>
          <p className={styles.subtext}>(준비 중)</p>
        </div>
      </section>
      <div className={styles.bar} />
      <section className={styles.recommendContainer}>
        <p className={styles.title}>인기 작가</p>
        <div className={styles.recommendList}>
          <div className={styles.recommend}>
            <div className={styles.left}>
              <div className={styles.profileImage}>
                <IconComponent name="temp1" width={32} height={32} alt="프로필 사진" />
              </div>
              <div>
                <p className={styles.author}>메구미</p>
                <div className={styles.follow}>
                  팔로워<p className={styles.count}>{formatCurrency(1999)}</p>
                </div>
              </div>
            </div>
            <p className={styles.update}>+27</p>
          </div>
          <div className={styles.recommend}>
            <div className={styles.left}>
              <div className={styles.profileImage}>
                <IconComponent name="default" width={32} height={32} alt="프로필 사진" />
              </div>
              <div>
                <p className={styles.author}>닉네임</p>
                <div className={styles.follow}>
                  팔로워<p className={styles.count}>{formatCurrency(1999)}</p>
                </div>
              </div>
            </div>
            <p className={styles.update}>+27</p>
          </div>
          <div className={styles.recommend}>
            <div className={styles.left}>
              <div className={styles.profileImage}>
                <IconComponent name="temp2" width={32} height={32} alt="프로필 사진" />
              </div>
              <div>
                <p className={styles.author}>닉네임</p>
                <div className={styles.follow}>
                  팔로워<p className={styles.count}>{formatCurrency(5)}</p>
                </div>
              </div>
            </div>
            <p className={styles.update}>+27</p>
          </div>
          <div className={styles.recommend}>
            <div className={styles.left}>
              <div className={styles.profileImage}>
                <IconComponent name="temp3" width={32} height={32} alt="프로필 사진" />
              </div>
              <div>
                <p className={styles.author}>닉네임</p>
                <div className={styles.follow}>
                  팔로워<p className={styles.count}>{formatCurrency(123456789)}</p>
                </div>
              </div>
            </div>
            <p className={styles.update}>+27</p>
          </div>
        </div>
      </section>
    </nav>
  );
}
