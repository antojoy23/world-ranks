import React from 'react'

import styles from './neighbouringCountries.module.css';
import Loader from '@/app/components/Loader';

const LOADERS = 6;

export default function NeighbourContriesLoader() {
    const countries = Array(LOADERS).fill(true);
    return countries?.map((_, idx) => {
        return (
            <div className={styles.neighbourFlagInfoContainer} key={idx}>
                <div className={styles.neighbourFlagContainer}>
                    <Loader classes={styles.loader} />
                </div>
                <span className={styles.borderCountryName}><Loader classes={styles.nameLoader} /></span>
            </div>
        )
    })
}
