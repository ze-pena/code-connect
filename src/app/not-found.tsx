import Image from "next/image";

import LinkButton from "@/global/components/LinkButton";

import styles from "./page.module.css";

export default function NotFound() {
  return (
    <div className={`${styles.page} ${styles.problem}`}>
      <Image
        src="/assets/images/not_found.png"
        width={657}
        height={367}
        alt="Página não encontrada"
        loading="eager"
      />
      <h1>OPS! Página não encontrada.</h1>
      <p>Você pode voltar ao feed e continuar buscando projetos incríveis!</p>
      <LinkButton url={"/"} label="Voltar ao feed" />
    </div>
  );
}
