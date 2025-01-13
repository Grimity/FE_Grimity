import Gallery from "./Gallery/Gallery";
import styles from "./WholeGallery.module.scss";

export default function WholeGallery() {
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h3 className={styles.title}>전체 그림</h3>
        <p className={styles.subtitle}>그리미티 작가들의 훌륭한 그림을 살펴보세요!</p>
      </div>
      <div className={styles.galleryGrid}>
        {Array(12)
          .fill(0)
          .map((_, index) => (
            <Gallery key={index} />
          ))}
      </div>
    </div>
  );
}
