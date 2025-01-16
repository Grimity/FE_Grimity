export interface CardProps {
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
}
