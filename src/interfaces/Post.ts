export interface IAuthor {
  id: number;
  name: string;
  username: string;
  avatar: string;
  posts?: IPost[];
  comments?: Comment[];
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
  comments?: Comment[];
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
  parentId?: number;
  parent?: Comment;
  children: Comment[];
}
