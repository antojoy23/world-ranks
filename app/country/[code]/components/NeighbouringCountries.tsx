import { getCountriesByCode } from '@/app/actions/getCountries';
import Image from 'next/image';
import React from 'react'

import styles from './neighbouringCountries.module.css';

export default async function NeighbouringCountries({ borders }: { borders: string[] }) {

    const { countries } = await getCountriesByCode(borders);

    return countries?.map((country) => {
        return (
            <div className={styles.neighbourFlagInfoContainer} key={country.name.common}>
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
        )
    })

}
