import Link from "next/link";
import { Url } from "url";

import styles from "./styles.module.css";

type ButtonType = "button" | "submit" | "reset";

interface Props {
  label: string;
  url?: string | Partial<Url>;
  isActive?: boolean;
  type?: ButtonType;
}

export default function LinkButton({
  label,
  url = "/",
  isActive = true,
  type = "button",
}: Props) {
  return (
    <button
      type={type}
      className={`${styles.button} ${
        isActive ? styles.active : styles.inactive
      }`}
    >
      <Link href={url}>
        <span>{label}</span>
      </Link>
    </button>
  );
}
