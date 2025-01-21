export interface DraggableImageProps {
  image: {
    name: string;
    url: string;
  };
  index: number;
  removeImage: (index: number) => void;
  totalImages: number;
}
