import React, { use, useEffect, useState } from 'react'
import Search from '../icons/Search';

import styles from './rankHeader.module.css';
import { CountriesContext } from '@/app/context/CountriesContext';
import useDebounce from '@/app/hooks/useDebounce';

export default function RankHeader({ classes }: { classes: string }) {

    const countriesContext = use(CountriesContext);

    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 200);

    const { countries = [], hasError, isLoading, updateSearchTerm } = countriesContext || {};

    const countryCount = countries.length ?? 0;

    useEffect(() => {
        if (updateSearchTerm) updateSearchTerm(debouncedSearchTerm)
    }, [debouncedSearchTerm]);

    return (
        <header className={classes}>
            <h2 className={styles.title}>Found {countryCount} countries</h2>
            <div className={styles.searchWrapper}>
                <Search classes={styles.searchIcon} />
                <input
                    disabled={hasError || isLoading}
                    className={`${styles.search} focus-visible:border-ring focus-visible:ring-ring/50 shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px]`}
                    placeholder='Search by Name, Region, Subregion'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} type='search'
                />
            </div>
        </header>
    )
}
