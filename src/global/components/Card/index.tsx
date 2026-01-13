import Image from "next/image";

import Avatar from "../Avatar";
import LinkButton from "../LinkButton";
import LikeButton from "../LikeButton";
import CommentButton from "../CommentButton";

import { incrementThumbsUp, postComment } from "@/actions";

import styles from "./styles.module.css";

import { IPost } from "@/interfaces/Post";

interface Props {
  post: IPost;
  isPostPage?: boolean;
}

const bannerFallback = "/assets/images/banner_fallback.png";

export default function Card({ post, isPostPage = false }: Props) {
  const submitThumbsUp = incrementThumbsUp.bind(null, post);
  const submitComment = postComment.bind(null, post);

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
          <LinkButton url={`/posts/${post.slug}`} label="Ver detalhes" />
        )}
      </section>

      <footer className={styles.cardFooter}>
        <div className={styles.cardFooterActions}>
          <form action={submitThumbsUp}>
            <LikeButton likes={post.likes} type="submit" />
          </form>
          <CommentButton
            comments={post.comments?.length ?? 0}
            action={submitComment}
          />
        </div>
        <div className={styles.cardFooterUser}>
          <Avatar author={post.author} />
        </div>
      </footer>
    </div>
  );
}
