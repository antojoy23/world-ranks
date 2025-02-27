import React from 'react'
import Search from '../icons/Search';

import styles from './rankHeader.module.css';

export default function RankHeader({ classes, countryCount }: { classes: string, countryCount: number }) {
    return (
        <header className={classes}>
            <h2 className={styles.title}>Found {countryCount} countries</h2>
            <div className={styles.searchWrapper}>
                <Search classes={styles.searchIcon} />
                <input className={styles.search} placeholder='Search by Name, Region, Subregion' type='search' />
            </div>
        </header>
    )
}
