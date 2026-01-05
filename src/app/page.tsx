import prisma from "../../prisma/db";
import { PostWhereInput } from "@/generated/prisma/models";

import logger from "@/logger";

import Card from "@/global/components/Card";
import LinkButton from "@/global/components/LinkButton";
import SearchForm from "./components/SearchForm";

import { IPost } from "@/interfaces/Post";
import { IPaginatedResponse } from "@/interfaces/Response";

import styles from "./page.module.css";

type FetchPostResponse = Promise<IPaginatedResponse<IPost>>;

async function fetchPosts(page: number, search?: string): FetchPostResponse {
  try {
    const where: PostWhereInput = {};

    if (search) {
      where.title = {
        contains: search,
        mode: "insensitive",
      };
    }

    const perPage = 6;
    const pageSkip = (page - 1) * perPage;

    const posts = await prisma.post.findMany({
      take: perPage,
      skip: pageSkip,
      where,
      orderBy: { createdAt: "desc" },
      include: {
        author: true,
      },
    });

    const postsLength = await prisma.post.count({ where });
    const pagesLength = Math.ceil(postsLength / perPage);

    const prev = page > 1 ? page - 1 : null;
    const next = page !== pagesLength ? page + 1 : null;
    const response: IPaginatedResponse<IPost> = {
      data: posts,
      prev,
      next,
    };

    logger.info("This request was a success!");
    return response;
  } catch (error: unknown) {
    let errorMessage = "An unexpected error has occurred";

    if (error instanceof Error) errorMessage = error.message;

    logger.error(errorMessage);
    return {} as FetchPostResponse;
  }
}

interface PageParams {
  searchParams: { page?: string; q?: string };
}

export default async function Home({ searchParams }: PageParams) {
  const { page, q } = await searchParams;
  const {
    data: postList,
    prev,
    next,
  } = await fetchPosts(page ? Number(page) : 1, q);

  return (
    <div className={styles.page}>
      <SearchForm />

      <ul className={styles.list}>
        {Array.isArray(postList) &&
          postList.map((post) => (
            <li key={post.id} className={styles.listItem}>
              <Card post={post} />
            </li>
          ))}
      </ul>

      <nav className={styles.pagination}>
        <li>
          <LinkButton
            url={{
              pathname: "/",
              query: { page: prev ? String(prev) : undefined, q },
            }}
            label="Página anterior"
            isActive={prev !== null}
          />
        </li>
        <li>
          <LinkButton
            url={{
              pathname: "/",
              query: { page: next ? String(next) : undefined, q },
            }}
            label="Próxima página"
            isActive={next !== null}
          />
        </li>
      </nav>
    </div>
  );
}
