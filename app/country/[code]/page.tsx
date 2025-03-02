import { Currency } from '@/app/actions/getCountries';
import Image from 'next/image';
import React, { Suspense } from 'react'

import styles from './page.module.css';
import formatNumber from '@/app/utils/formatNumber';

import { getCountryByCode } from '@/app/actions/getCountries';
import NeighbourContriesLoader from './components/NeighbourContriesLoader';
import NeighbouringCountries from './components/NeighbouringCountries';

export default async function page({
    params,
}: {
    params: Promise<{ code: string }>
}) {

    const code = (await params).code;

    const { country } = await getCountryByCode(code);

    if (!country) return; //Show some error screen

    const detailedInfos = [
        {
            name: 'Capital',
            value: country.capital[0]
        },
        {
            name: 'Subregion',
            value: country.subregion
        },
        {
            name: 'Language',
            value: Object.values(country.languages).join(', ')
        },
        {
            name: 'Currencies',
            value: Object.values(country.currencies).reduce((acc: string[], currency: Currency) => {
                acc.push(currency.name);
                return acc;
            }, [])
        },
        {
            name: 'Continents',
            value: country.region
        }
    ]

    const detailedInfoSection = () => {
        return detailedInfos.map((info) => {
            return (
                <div className={styles.infoRow} key={info.name}>
                    <h4>{info.name}</h4>
                    <span>{info.value}</span>
                </div>
            )
        })
    }

    return (
        <main className={styles.main}>
            <article className={styles.countryInfoContainer}>
                <header className={styles.header}>
                    <div className={styles.countryFlagContainer}>
                        <Image
                            src={country.flags.svg}
                            width={0}
                            height={0}
                            alt={`Flag of ${country.name.common}`}
                            priority={true}
                            className={styles.countryFlag}
                        />
                    </div>
                    <h2 className={styles.countryName}>{country.name.common}</h2>
                    <h3 className={styles.countryOfficialName}>{country.name.official}</h3>
                </header>
                <section className={styles.metaInfoSection}>
                    <div className={styles.metaInfoWrapper}>
                        <h4 className={styles.metaInfoTitle}>Population</h4>
                        <span className={styles.metaInfoValue}>{formatNumber(country.population)}</span>
                    </div>
                    <div className={styles.metaInfoWrapper}>
                        <h4 className={styles.metaInfoTitle}>Area(km<sup>2</sup>)</h4>
                        <span className={styles.metaInfoValue}>{formatNumber(country.area)}</span>
                    </div>
                </section>
                <section className={styles.detailedInfoSection}>
                    {detailedInfoSection()}
                    <section className={styles.borderFlagsSection}>
                        <h4 className={styles.neighbourCountriesTitle}>Neighbouring countries</h4>
                        <div className={styles.neighbourFlagsContainer}>
                            <Suspense fallback={<NeighbourContriesLoader />}>
                                <NeighbouringCountries borders={country.borders} />
                            </Suspense>
                        </div>
                    </section>
                </section>
            </article>
        </main>
    )
}
