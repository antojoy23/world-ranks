'use client';
import { Country, CountryFlags, Currency, getCountriesByCode, getCountryByCode } from '@/app/actions/getCountries';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

import styles from './countryInfo.module.css';
import formatNumber from '@/app/utils/formatNumber';

export default function CountryInfo({
    code
}: {
    code: string
}) {

    const [country, setCountry] = useState<Country>();
    const [borders, setBorders] = useState<CountryFlags[]>();

    useEffect(() => {
        const getCountryDetails = async () => {
            const { country } = await getCountryByCode(code);
            setCountry(country)
        }
        getCountryDetails();
    }, [code])

    useEffect(() => {
        const getBorders = async () => {
            if (country?.borders) {
                const { countries: borderCountries } = await getCountriesByCode(country?.borders);
                setBorders(borderCountries);
            }
        }

        getBorders();
    }, [country]);

    if (!country) return;

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

    const neighboringCountriesSection = () => {
        let flagNodes;
        if (!borders) {
            flagNodes = (
                <>
                    <div>Loading</div>
                    <div>Loading</div>
                    <div>Loading</div>
                    <div>Loading</div>
                </>
            )
        } else {
            flagNodes = borders.map((border) => {
                return (
                    <div className={styles.neighbourFlagInfoContainer} key={border.name.common}>
                        <div className={styles.neighbourFlagContainer}>
                            <Image
                                src={border.flags.svg}
                                width={0}
                                height={0}
                                alt={`Flag of ${border.name.common}`}
                                priority={true}
                                className={styles.neighbourFlag}
                            />
                        </div>
                        <span className={styles.borderCountryName}>{border.name.common}</span>
                    </div>
                )
            })
        }
        return flagNodes;
    }

    return (
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
                        {neighboringCountriesSection()}
                    </div>
                </section>
            </section>
        </article>
    )
}
