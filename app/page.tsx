'use client';
import styles from "./page.module.css";
import Picture from "./components/Picture/index.";
import RankHeader from "./components/RankHeader";
import RankFilters from "./components/RankFilters";
import RankTable from "./components/RankTable";
import CountriesProvider from "./context/CountriesContext";
import Image from "next/image";

export default function Home() {

  return (
    <>
      <header>
        <section className={styles.heroImageContainer}>
          <Image
            className={styles.logo}
            src="/assets/Logo.svg"
            width={174}
            height={24}
            alt={"Logo for the world ranks app"}
          />
          <Picture
            classes={styles.heroBgImage}
            alt="An image showing the world from space and also having the website title - Word Ranks"
            desktopImage="/assets/hero-image.jpg"
            mobileImage="/assets/hero-image-sm.jpg"
          />
        </section>
      </header>
      <main className={styles.main}>
        <CountriesProvider>
          <section className={styles.rankSection}>
            <RankHeader classes={styles.rankHeader} />
            <section className={styles.rankFilters}>
              <RankFilters />
            </section>
            <section className={styles.rankTable}>
              <RankTable />
            </section>
          </section>
        </CountriesProvider>
      </main>
    </>
  );
}
