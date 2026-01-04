import SearchInput from "@/global/components/SearchInput";
import LinkButton from "@/global/components/LinkButton";

import styles from "./styles.module.css";

export default function SearchForm() {
  return (
    <form className={styles.searchForm}>
      <SearchInput name="q" placeholder="Digite o que você procura" />
      <LinkButton type="submit" label="Buscar" />
    </form>
  );
}
