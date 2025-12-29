import Link from "next/link";
import styles from "./styles.module.css";

interface Props {
  label: string;
  path: string;
  isActive?: boolean;
}

export default function Button({ label, path, isActive = true }: Props) {
  return (
    <button
      className={`${styles.button} ${
        isActive ? styles.active : styles.inactive
      }`}
    >
      <Link href={path}>
        <span>{label}</span>
      </Link>
    </button>
  );
}
