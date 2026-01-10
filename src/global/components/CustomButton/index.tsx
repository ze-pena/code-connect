import { ReactNode } from "react";
import styles from "./styles.module.css";

type ButtonType = "button" | "submit" | "reset";

interface Props {
  type: ButtonType;
  name: string;
  label: string;
  isDisabled: boolean;
  icon?: ReactNode;
}

export default function CustomButton({
  type,
  name,
  label,
  isDisabled,
  icon,
}: Props) {
  return (
    <button
      type={type}
      name={name}
      id={`custom-button--${name}`}
      className={styles.customButton}
      disabled={isDisabled}
    >
      <span>{label}</span>
      {icon && <figure>{icon}</figure>}
    </button>
  );
}
