"use client";

import { ReactNode } from "react";
import styles from "./styles.module.css";

type ButtonType = "button" | "submit" | "reset";

interface Props {
  name: string;
  label: string;
  type?: ButtonType;
  isDisabled?: boolean;
  icon?: ReactNode;
  onClick?: () => void;
}

export default function CustomButton({
  name,
  label,
  type = "button",
  isDisabled = false,
  icon,
  onClick,
}: Props) {
  return (
    <button
      type={type}
      name={name}
      id={`custom-button--${name}`}
      className={styles.customButton}
      disabled={isDisabled}
      onClick={() => onClick?.()}
    >
      <span>{label}</span>
      {icon && <figure>{icon}</figure>}
    </button>
  );
}
