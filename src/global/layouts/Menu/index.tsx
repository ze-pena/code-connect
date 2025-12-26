import Image from "next/image";
import styles from "./styles.module.css";

export default function Menu() {
  return (
    <nav className={styles.menu}>
      <div className={styles.menuLogo}>
        <Image
          src="/assets/images/code_connect_logo.png"
          alt="logo do site"
          width={128}
          height={40}
        />
      </div>
    </nav>
  );
}
