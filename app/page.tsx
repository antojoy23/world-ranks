'use client';
import styles from "./page.module.css";

import RankHeader from "./components/RankHeader";
import RankFilters from "./components/RankFilters";
import RankTable from "./components/RankTable";

export default function Home() {

  return (
    <main className={styles.main}>
      <section className={styles.rankSection}>
        <RankHeader classes={styles.rankHeader} />
        <section className={styles.rankFilters}>
          <RankFilters />
        </section>
        <section className={styles.rankTable}>
          <RankTable />
        </section>
      </section>
    </main>
  );
}
