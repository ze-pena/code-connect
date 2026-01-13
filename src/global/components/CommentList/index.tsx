import styles from "./styles.module.css";

import CommentItem from "./components/CommentItem";

import { IComment } from "@/interfaces/Post";

interface Props {
  commentList?: IComment[];
}

export default function CommentList({ commentList = [] }: Props) {
  return (
    <div className={styles.commentList}>
      <h2>Comentários:</h2>
      <ul>
        {commentList.map((comment) => (
          <li key={comment.id}>
            <CommentItem commentItem={comment} />
          </li>
        ))}
      </ul>
    </div>
  );
}
