import Image from "next/image";

import Avatar from "../Avatar";
import LinkButton from "../LinkButton";

import styles from "./styles.module.css";

import { IPost } from "@/interfaces/Post";

interface Props {
  post: IPost;
  isPostPage?: boolean;
}

const bannerFallback = "/assets/images/banner_fallback.png";

export default function Card({ post, isPostPage = false }: Props) {
  return (
    <div className={styles.card}>
      <header className={styles.cardHeader}>
        <figure>
          <Image
            className={styles.banner}
            src={post.cover ?? bannerFallback}
            alt="banner do card"
            width={435}
            height={150}
            loading="eager"
          />
        </figure>
      </header>

      <section className={styles.cardBody}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        {!isPostPage && (
          <LinkButton label="Ver detalhes" path={`/posts/${post.slug}`} />
        )}
      </section>

      <footer className={styles.cardFooter}>
        <Avatar author={post.author} />
      </footer>
    </div>
  );
}
