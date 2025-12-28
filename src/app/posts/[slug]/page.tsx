import { remark } from "remark";
import html from "remark-html";

import logger from "@/logger";

import Card from "@/global/components/Card";
import Markdown from "@/global/components/Markdown";

import { ICommonResponse } from "@/interfaces/Response";
import { IPost } from "@/interfaces/Post";

import styles from "./styles.module.css";

const baseUrl = "http://localhost:3042";

type FetchPostData = Promise<ICommonResponse<IPost>>;

async function fetchPostData(slug: string): Promise<IPost> {
  try {
    const response = await fetch(`${baseUrl}/posts?slug=${slug}`);

    if (!response.ok) {
      throw new Error("Failed to fetch post data!");
    }

    const posts = (await response.json()) as FetchPostData;

    if (!Array.isArray(posts) || posts.length === 0) {
      throw new Error("Post not found!");
    }

    const post = posts[0] as IPost;
    const markdownContent = await remark().use(html).process(post.markdown);
    post.markdown = markdownContent.toString();

    logger.info("Post data fetched successfully!");
    return post;
  } catch (error: unknown) {
    let errorMessage = "An unexpected error has occurred";

    if (error instanceof Error) errorMessage = error.message;

    logger.error(errorMessage);
    return {} as IPost;
  }
}

interface PostPageParams {
  params: {
    slug: string;
  };
}

export default async function PostPage({ params }: PostPageParams) {
  const { slug } = await params;
  const post = await fetchPostData(slug);

  return (
    <div className={styles.page}>
      <Card post={post} isPostPage />
      <Markdown markdown={post.markdown} />
    </div>
  );
}
