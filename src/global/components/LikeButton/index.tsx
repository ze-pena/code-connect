"use client";

import { useFormStatus } from "react-dom";
import Image from "next/image";

import Spinner from "../Spinner";

import styles from "./styles.module.css";

type ButtonType = "button" | "submit" | "reset";

interface Props {
  likes: number;
  type?: ButtonType;
}

export default function LikeButton({ likes, type = "button" }: Props) {
  const { pending } = useFormStatus();

  return (
    <button type={type} className={styles.likeButton} disabled={pending}>
      {pending ? (
        <Spinner />
      ) : (
        <figure>
          <Image
            src="/assets/icons/thumb_up_outline.svg"
            alt="Ícone de curatida"
            width={24}
            height={24}
          />
        </figure>
      )}
      <span>{likes}</span>
    </button>
  );
}
