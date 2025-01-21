import { useDrag, useDrop } from "react-dnd";
import { DraggableImageProps } from "./DraggableImage.types";
import Image from "next/image";
import styles from "./DraggableImage.module.scss";
import { useRef } from "react";

export default function DraggableImage({
  image,
  index,
  moveImage,
  removeImage,
  totalImages,
}: DraggableImageProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: "IMAGE",
    item: { type: "IMAGE", id: image.name, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "IMAGE",
    hover(item: { type: string; id: string; index: number }, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      const clientOffset = monitor.getClientOffset();

      if (!clientOffset) {
        return;
      }

      const hoverClientX = clientOffset.x - hoverBoundingRect.left;

      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return;
      }

      moveImage(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  const imageWidth = totalImages >= 2 ? 200 : 420;

  return (
    <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }} className={styles.imageWrapper}>
      <Image
        src={image.url}
        width={imageWidth}
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
