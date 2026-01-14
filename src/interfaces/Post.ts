export interface IAuthor {
  id: number;
  name: string;
  username: string;
  avatar: string;
  posts?: IPost[];
  comments?: IComment[];
}

export interface IPost {
  id: number;
  cover: string;
  title: string;
  slug: string;
  body: string;
  markdown: string;
  authorId: number;
  author?: IAuthor;
  createdAt: Date;
  updatedAt: Date;
  comments?: IComment[];
  likes: number;
}

export interface IComment {
  id: number;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: number;
  author?: IAuthor;
  postId: number;
  post?: IPost;
  parentId: number | null;
  parent?: IComment;
  children?: IComment[];
}
