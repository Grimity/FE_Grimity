export interface CardProps {
  isMain?: boolean;
  title: string;
  cards: string[];
  author?: string;
  likeCount: number;
  commentCount: number;
  createdAt: Date;
}
