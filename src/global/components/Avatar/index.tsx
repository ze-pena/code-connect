import Image from "next/image";
import styles from "./styles.module.css";

import { IAuthor } from "@/interfaces/Post";

interface Props {
  author: IAuthor;
}

const avatarFallback = "/assets/images/icon_fallback.png";

export default function Avatar({ author }: Props) {
  return (
    <div className={styles.avatar}>
      <Image
        className={styles.avatarImage}
        src={author?.avatar ?? avatarFallback}
        alt="Avatar do usuário"
        width={36}
        height={36}
      />

      <span className={styles.avatarUsername}>@{author.username}</span>
    </div>
  );
}
