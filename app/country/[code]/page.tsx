import React, { Suspense } from 'react'
import CountryInfo from './components/CountryInfo';

import styles from './page.module.css';
import NeighbouringCountries from './components/NeighbouringCountries';
import { getCountryByCode } from '@/app/actions/getCountries';

export default async function page({
    params,
}: {
    params: Promise<{ code: string }>
}) {

    const code = (await params).code;

    const { country } = await getCountryByCode(code);

    if (!country) return; //Show some error screen

    const neighbouringCountries = () => {
        return (
            <Suspense fallback={<div>Loading ..... </div>}>
                <NeighbouringCountries borders={country.borders} />
            </Suspense>
        )
    }

    return (
        <main className={styles.main}>
            <CountryInfo country={country} neighbouringCountries={neighbouringCountries()} />
        </main>
    )
}
