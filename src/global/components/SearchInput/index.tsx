"use client";

import { useState, ChangeEvent } from "react";

import Image from "next/image";
import styles from "./styles.module.css";

interface Props {
  name: string;
  placeholder?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export default function SearchInput({
  name,
  placeholder = "",
  defaultValue = "",
  onValueChange,
}: Props) {
  const [inputValue, setInputValue] = useState(defaultValue);

  const inputChangeEvent = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    onValueChange?.(value);
  };

  return (
    <div className={styles.searchInput}>
      <picture>
        <Image
          src="/assets/icons/search_icon.svg"
          alt="Search icon"
          width={20}
          height={20}
        />
      </picture>
      <input
        id={`search-${name}`}
        name={name}
        placeholder={placeholder}
        value={inputValue}
        onChange={inputChangeEvent}
      />
    </div>
  );
}
