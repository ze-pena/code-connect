"use client";

import { useState, useCallback, useEffect } from "react";

import Image from "next/image";
import CustomButton from "@/global/components/CustomButton";
import ReplyButton from "@/global/components/ReplyButton";

import { postReply } from "@/actions";

import { IComment } from "@/interfaces/Post";

import styles from "./styles.module.css";

interface Props {
  commentItem: IComment;
}

const avatarFallback = "/assets/images/icon_fallback.png";

export default function CommentItem({ commentItem }: Props) {
  const replySubmit = postReply.bind(null, commentItem);

  const [replies, setReplies] = useState<IComment[]>([]);
  const [showReplies, setShowReplies] = useState(false);

  const toggleShowReplies = useCallback(() => {
    setShowReplies((state) => !state);
  }, [setShowReplies]);

  useEffect(() => {
    const getReplies = async () => {
      console.log(commentItem);
      const id = commentItem.id;
      const response = await fetch(`/api/comment/${id}/replies`);
      console.log(response);
      const data = await response.json();
      setReplies(data);
    };

    if (showReplies) getReplies();
  }, [commentItem, showReplies]);

  return (
    <div className={styles.commentItem}>
      <div className={styles.author}>
        <picture>
          <Image
            src={commentItem.author?.avatar ?? avatarFallback}
            alt="Avatar do usuário"
            width={40}
            height={40}
          />
        </picture>
        <strong>@{commentItem.author?.username}:</strong>
        <p>{commentItem.text}</p>
      </div>
      <div className={styles.actions}>
        <ReplyButton comment={commentItem} action={replySubmit} />
        <div>
          <div>
            <figure>
              <Image
                src="/assets/icons/chat.svg"
                alt="Search icon"
                width={18}
                height={18}
              />
            </figure>
            <span>{commentItem.children?.length ?? 0}</span>
          </div>
          {!!commentItem?.children?.length && (
            <CustomButton
              name="answers"
              label={showReplies ? "Esconder respostar" : "Mostrar respostas"}
              onClick={toggleShowReplies}
            />
          )}
        </div>
      </div>
      {showReplies && !!replies.length && (
        <ul className={styles.reply}>
          {replies.map((comment) => (
            <li key={comment.id}>
              <CommentItem commentItem={comment} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
