import Link from "next/link";
import logger from "@/logger";

import Card from "@/global/components/Card";

import { IPost } from "@/interfaces/Post";
import { IPaginatedResponse } from "@/interfaces/Response";

import styles from "./page.module.css";

type FetchPostResponse = Promise<IPaginatedResponse<IPost>>;

const baseUrl = "http://localhost:3042";

async function fetchPosts(page: number): FetchPostResponse {
  try {
    const response = await fetch(`${baseUrl}/posts?_page=${page}&_per_page=6`);

    if (!response.ok) {
      throw new Error("Failed to fetch post data!");
    }

    logger.info("This request was a success!");
    return response.json() as FetchPostResponse;
  } catch (error: unknown) {
    let errorMessage = "An unexpected error has occurred";

    if (error instanceof Error) errorMessage = error.message;

    logger.error(errorMessage);
    return {} as FetchPostResponse;
  }
}

interface PageParams {
  searchParams: { page?: string };
}

export default async function Home({ searchParams }: PageParams) {
  const { page } = await searchParams;
  const {
    data: postList,
    prev,
    next,
  } = await fetchPosts(page ? Number(page) : 1);

  return (
    <div className={styles.page}>
      <ul className={styles.list}>
        {Array.isArray(postList) &&
          postList.map((post) => (
            <li key={post.id} className={styles.listItem}>
              <Card post={post} />
            </li>
          ))}
      </ul>

      <nav className={styles.pagination}>
        <li
          className={`${styles.button} ${
            prev ? styles.active : styles.inactive
          }`}
        >
          <Link href={`/?page=${prev}`}>Página anterior</Link>
        </li>
        <li
          className={`${styles.button} ${
            next ? styles.active : styles.inactive
          }`}
        >
          <Link href={`/?page=${next}`}>Próxima página</Link>
        </li>
      </nav>
    </div>
  );
}
