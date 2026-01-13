import styles from "./styles.module.css";

import Image from "next/image";
import CustomButton from "@/global/components/CustomButton";
import ReplyButton from "@/global/components/ReplyButton";

import { postReply } from "@/actions";

import { IComment } from "@/interfaces/Post";

interface Props {
  commentItem: IComment;
}

const avatarFallback = "/assets/images/icon_fallback.png";

export default function CommentItem({ commentItem }: Props) {
  const replySubmit = postReply.bind(null, commentItem);

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
          <CustomButton name="answers" label="Ver respostas" />
        </div>
      </div>
      {commentItem.children && commentItem.children.length ? (
        <ul className={styles.reply}>
          {commentItem.children.map((comment) => (
            <li key={comment.id}>
              <CommentItem commentItem={comment} />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
