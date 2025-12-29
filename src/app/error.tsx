"use client";

import Image from "next/image";

import LinkButton from "@/global/components/LinkButton";

import styles from "./page.module.css";

export default function Error() {
  return (
    <div className={`${styles.page} ${styles.problem}`}>
      <Image
        src="/assets/images/internal_error.png"
        width={657}
        height={367}
        alt="Erro interno do servidor"
        loading="eager"
      />
      <h1>Opa! Um erro ocorreu.</h1>
      <p>Não conseguimos carregar a página. Volte para seguir navegando.</p>
      <LinkButton path={"/"} label="Voltar ao feed" />
    </div>
  );
}
