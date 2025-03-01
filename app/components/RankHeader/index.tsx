import React, { use } from 'react'
import Search from '../icons/Search';

import styles from './rankHeader.module.css';
import { CountriesContext } from '@/app/context/CountriesContext';

export default function RankHeader({ classes }: { classes: string }) {

    const countriesContext = use(CountriesContext);

    const { countries = [], hasError, isLoading, updateSearchTerm } = countriesContext || {};

    const countryCount = countries.length ?? 0

    return (
        <header className={classes}>
            <h2 className={styles.title}>Found {countryCount} countries</h2>
            <div className={styles.searchWrapper}>
                <Search classes={styles.searchIcon} />
                <input
                    disabled={hasError || isLoading}
                    className={`${styles.search} focus-visible:border-ring focus-visible:ring-ring/50 shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px]`}
                    placeholder='Search by Name, Region, Subregion'
                    onChange={(e) => updateSearchTerm && updateSearchTerm(e.target.value)} type='search'
                />
            </div>
        </header>
    )
}
