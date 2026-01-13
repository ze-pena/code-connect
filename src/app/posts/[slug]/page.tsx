import { remark } from "remark";
import html from "remark-html";
import prisma from "../../../../prisma/db";

import logger from "@/logger";

import Card from "@/global/components/Card";
import Markdown from "@/global/components/Markdown";
import CommentList from "@/global/components/CommentList";

import { ICommonResponse } from "@/interfaces/Response";
import { IPost } from "@/interfaces/Post";

import styles from "./styles.module.css";

// const baseUrl = "http://localhost:3042";

type FetchPostData = Promise<ICommonResponse<IPost | null>>;

async function fetchPostData(slug: string): FetchPostData {
  try {
    const post = await prisma.post.findFirst({
      where: { slug },
      include: {
        author: true,
        comments: {
          where: { parentId: null },
          include: {
            author: true,
            children: {
              include: {
                author: true,
              },
            },
          },
        },
      },
    });

    if (!post) {
      throw new Error("Post not found");
    }

    const markdownContent = await remark().use(html).process(post.markdown);
    post.markdown = markdownContent.toString();

    logger.info("Post data fetched successfully!");
    return post;
  } catch (error: unknown) {
    let errorMessage = "An unexpected error has occurred";

    if (error instanceof Error) errorMessage = error.message;

    logger.error(errorMessage);
    return null;
  }
}

interface PostPageParams {
  params: {
    slug: string;
  };
}

export default async function PostPage({ params }: PostPageParams) {
  const { slug } = await params;
  const post = (await fetchPostData(slug)) as IPost;

  return (
    <div className={styles.page}>
      <Card post={post} isPostPage />
      <Markdown markdown={post.markdown} />
      <CommentList commentList={post.comments} />
    </div>
  );
}
