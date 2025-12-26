import Link from "next/link";
import styles from "./styles.module.css";

interface Props {
  label: string;
  path: string;
}

export default function Button({ label, path }: Props) {
  return (
    <Link href={path} className={styles.button}>
      <span className={styles.buttonLabel}>{label}</span>
    </Link>
  );
}
