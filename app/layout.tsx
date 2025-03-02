import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import CountriesProvider from "./context/CountriesContext";
import Image from "next/image";

import styles from './layout.module.css';
import "./globals.css";
import Picture from "./components/Picture/index.";
import Link from "next/link";

const BeVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "World Ranks",
  description: "Country ranking web application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-theme="dark" lang="en">
      <body className={`${BeVietnamPro.variable}`}>
        <header>
          <section className={styles.heroImageContainer}>
            <Link href={'/'}>
              <Image
                className={styles.logo}
                src="/assets/Logo.svg"
                width={174}
                height={24}
                alt={"Logo for the world ranks app"}
              />
            </Link>
            <Picture
              classes={styles.heroBgImage}
              alt="An image showing the world from space and also having the website title - Word Ranks"
              desktopImage="/assets/hero-image.jpg"
              mobileImage="/assets/hero-image-sm.jpg"
            />
          </section>
        </header>
        <CountriesProvider>
          {children}
        </CountriesProvider>
      </body>
    </html>
  );
}
