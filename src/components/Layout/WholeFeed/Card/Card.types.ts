export interface CardProps {
  id: string;
  isMain?: boolean;
  title: string;
  cards: string[];
  author?: {
    id: string;
    name: string;
    image: string;
  };
  likeCount: number;
  commentCount: number;
  createdAt: Date;
  isLike?: boolean;
}
