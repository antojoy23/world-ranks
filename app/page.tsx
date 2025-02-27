'use client';
import styles from "./page.module.css";
import Picture from "./components/Picture/index.";
import RankHeader from "./components/RankHeader";
import RankFilters from "./components/RankFilters";
import RankTable from "./components/RankTable";
import { CountryResponse, getCountries } from "./actions/getCountries";
import { startTransition, useEffect, useState } from "react";

export default function Home() {

  const [countries, setCounries] = useState<CountryResponse[] | undefined>();

  useEffect(() => {
    startTransition(async () => {
      const countries = await getCountries();
      setCounries(countries);
    })
  }, []);

  return (
    <>
      <header>
        <section className={styles.heroImageContainer}>
          <Picture
            alt="An image showing the world from space and also having the website title - Word Ranks"
            desktopImage="/assets/hero-image.jpg"
            mobileImage="/assets/hero-image-sm.jpg"
          />
        </section>
      </header>
      <main className={styles.main}>
        <section className={styles.rankSection}>
          <RankHeader classes={styles.rankHeader} countryCount={countries?.length ?? 0} />
          <section className={styles.rankFilters}>
            <RankFilters />
          </section>
          <section className={styles.rankTable}>
            <RankTable countries={countries} />
          </section>
        </section>
      </main>
    </>
  );
}
