import React, { use } from 'react';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { CountryResponse } from '@/app/actions/getCountries';
import Image from 'next/image';

import styles from './rankTable.module.css';
import { CountriesContext } from '@/app/context/CountriesContext';
import TableLoader from './tableLoader';
import TableError from './tableError';
import Link from 'next/link';
import formatNumber from '@/app/utils/formatNumber';

export default function RankTable() {
    const countriesContext = use(CountriesContext);
    const { countries, hasError, isLoading } = countriesContext || {};

    const resolveFlag = (flag: CountryResponse["flag"], countryName: CountryResponse["name"]) => {
        let imageNode = null;
        if (flag) {
            imageNode = <Image
                className={styles.flagImage}
                src={flag}
                alt={`Flag of ${countryName}`}
                width={0}
                height={0}
            />
        }
        return (
            <div className={styles.flagImageContainer}>
                {imageNode}
            </div>
        )
    }

    if (hasError) {
        return <TableError />
    }

    if (isLoading) {
        return <TableLoader />
    }

    const renderTableRows = () => {
        if (!countries) return null
        if (countries.length === 0) {
            return (
                <TableRow className={styles.tableRow}>
                    <TableCell colSpan={5} className={styles.tableEmpty}>No countries found. Please try changing the filters.</TableCell>
                </TableRow>
            )
        }
        return countries.map((country) => {
            return (
                <TableRow className={styles.tableRow} key={country.name}>
                    <TableCell><Link href={`/country/${country.code}`}>{resolveFlag(country.flag, country.name)}</Link></TableCell>
                    <TableCell><Link href={`/country/${country.code}`}>{country.name}</Link></TableCell>
                    <TableCell>{formatNumber(country.population)}</TableCell>
                    <TableCell>{formatNumber(country.area)}</TableCell>
                    <TableCell>{country.region}</TableCell>
                </TableRow>
            )
        })
    }

    return (
        <Table className={styles.table}>
            <TableHeader className={styles.tableHeader}>
                <TableRow>
                    <TableHead>Flag</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Population</TableHead>
                    <TableHead>Area(km<sup>2</sup>)</TableHead>
                    <TableHead>Region</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {renderTableRows()}
            </TableBody>
        </Table>
    )
}
