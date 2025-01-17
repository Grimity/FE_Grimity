export interface CommentProps {
  feedId: string;
  feedWriterId: string;
}

export interface CommentWriter {
  id: string;
  name: string;
  image: string;
}

export interface Comment {
  id: string;
  content: string;
  writer: CommentWriter;
  parentId: string | null;
  childComments?: Comment[];
}
