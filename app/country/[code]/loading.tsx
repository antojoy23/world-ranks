import React from 'react'

import styles from './page.module.css';
import Loader from '@/app/components/Loader';
import NeighbourContriesLoader from './components/NeighbourContriesLoader';

export default function loader() {

    const detailedInfos = ['Capital', 'Subregion', 'Language', 'Currencies', 'Continents'];

    const detailedInfoSection = () => {
        return detailedInfos.map((infoTitle) => {
            return (
                <div className={styles.infoRow} key={infoTitle}>
                    <h4>{infoTitle}</h4>
                    <span><Loader classes={styles.textLoader} /></span>
                </div>
            )
        })
    }

    return (
        <main className={styles.main}>
            <article className={styles.countryInfoContainer}>
                <header className={styles.header}>
                    <div className={styles.countryFlagContainer}>
                        <Loader classes={styles.mainImageLoader} />
                    </div>
                    <h2 className={styles.countryName}><Loader classes={styles.textTitleLoader} /></h2>
                    <h3 className={styles.countryOfficialName}><Loader classes={styles.textSubTitleLoader} /></h3>
                </header>
                <section className={styles.metaInfoSection}>
                    <Loader classes={styles.metaInfoLoader} />
                    <Loader classes={styles.metaInfoLoader} />
                </section>
                <section className={styles.detailedInfoSection}>
                    {detailedInfoSection()}
                    <section className={styles.borderFlagsSection}>
                        <h4 className={styles.neighbourCountriesTitle}>Neighbouring countries</h4>
                        <div className={styles.neighbourFlagsContainer}>
                            <NeighbourContriesLoader />
                        </div>
                    </section>
                </section>
            </article>
        </main>
    )
}
