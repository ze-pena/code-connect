import type { Metadata } from "next";
import { Prompt } from "next/font/google";

import Menu from "@/global/layouts/Menu";

import styles from "./page.module.css";
import "./globals.css";

const prompt = Prompt({
  preload: true,
  weight: ["200", "400", "600", "800"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Code Connect",
  description: "De desenvolvedores para desenvolvedores",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={prompt.className}>
        <div className={styles.container}>
          <aside className={styles.aside}>
            <Menu />
          </aside>
          <main className={styles.main}>{children}</main>
        </div>
      </body>
    </html>
  );
}
