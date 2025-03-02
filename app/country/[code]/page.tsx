import React from 'react'
import CountryInfo from './components/CountryInfo';

import styles from './page.module.css';
import { getCountryByCode } from '@/app/actions/getCountries';

export default async function page({
    params,
}: {
    params: Promise<{ code: string }>
}) {

    const code = (await params).code;

    const { country } = await getCountryByCode(code);

    if (!country) return; //Show some error screen

    return (
        <main className={styles.main}>
            <CountryInfo country={country} />
        </main>
    )
}
