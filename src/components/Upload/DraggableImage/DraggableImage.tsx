import { useDrag, useDrop } from "react-dnd";
import { DraggableImageProps } from "./DraggableImage.types";
import Image from "next/image";
import styles from "./DraggableImage.module.scss";

export default function DraggableImage({
  image,
  index,
  moveImage,
  removeImage,
}: DraggableImageProps) {
  const [{ isDragging }, drag] = useDrag({
    type: "IMAGE",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "IMAGE",
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveImage(item.index, index);
        item.index = index;
      }
    },
  });

  const dragDropRef = (element: HTMLDivElement | null) => {
    drag(element);
    drop(element);
  };

  return (
    <div
      ref={dragDropRef}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className={styles.imageWrapper}
    >
      <Image
        src={image.url}
        width={200}
        height={0}
        layout="intrinsic"
        alt="Uploaded"
        className={styles.image}
      />
      <div className={styles.removeImage} onClick={() => removeImage(index)}>
        <Image src="/icon/image-delete.svg" width={28} height={28} alt="사진 제거" />
      </div>
    </div>
  );
}
