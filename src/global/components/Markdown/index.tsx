import styles from "./styles.module.css";

interface Props {
  markdown: string;
}

export default function Markdown({ markdown }: Props) {
  return (
    <div className={styles.markdown}>
      <h2>Código</h2>
      <div dangerouslySetInnerHTML={{ __html: markdown }} />
    </div>
  );
}
