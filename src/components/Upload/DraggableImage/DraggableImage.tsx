import { Draggable } from "react-beautiful-dnd";
import { DraggableImageProps } from "./DraggableImage.types";
import Image from "next/image";
import styles from "./DraggableImage.module.scss";

export default function DraggableImage({
  image,
  index,
  removeImage,
  totalImages,
}: DraggableImageProps) {
  const imageWidth = totalImages >= 2 ? 200 : 420;

  return (
    <Draggable draggableId={image.name} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={styles.imageWrapper}
          style={{
            ...provided.draggableProps.style,
            opacity: snapshot.isDragging ? 0.5 : 1,
          }}
        >
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
      )}
    </Draggable>
  );
}
