export interface IAuthor {
  id: number;
  name: string;
  username: string;
  avatar: string;
}

export interface IPost {
  id: number;
  cover: string;
  title: string;
  slug: string;
  body: string;
  markdown: string;
  author: IAuthor;
}
