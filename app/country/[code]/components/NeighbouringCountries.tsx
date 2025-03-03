import { getCountriesByCode } from '@/app/actions/getCountries';
import Image from 'next/image';
import React from 'react'

import styles from './neighbouringCountries.module.css';
import Link from 'next/link';

export default async function NeighbouringCountries({ borders }: { borders: string[] }) {

    const { countries } = await getCountriesByCode(borders);

    return countries?.map((country) => {
        return (
            <Link href={`/country/${country.cca3}`} key={country.cca3}>
                <div className={styles.neighbourFlagInfoContainer}>
                    <div className={styles.neighbourFlagContainer}>
                        <Image
                            src={country.flags.svg}
                            width={0}
                            height={0}
                            alt={`Flag of ${country.name.common}`}
                            priority={true}
                            className={styles.neighbourFlag}
                        />
                    </div>
                    <span className={styles.borderCountryName}>{country.name.common}</span>
                </div>
            </Link>
        )
    })

}
