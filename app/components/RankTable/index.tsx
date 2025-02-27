import React from 'react';

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

export default function RankTable({ countries }: { countries: CountryResponse[] | undefined }) {

    const resolveFlag = (flag: CountryResponse["flag"], countryName: CountryResponse["name"]) => {
        if (!flag) {
            return <div>Flag placeholder</div>
        } else {
            return <Image className={styles.flagImage} src={flag} alt={`Flag of ${countryName}`} width={70} height={42} />
        }
    }

    const renderTableRows = () => {
        if (!countries) return null
        return countries.map((country) => {
            return <TableRow className={styles.tableRow} key={country.name}>
                <TableCell>{resolveFlag(country.flag, country.name)}</TableCell>
                <TableCell>{country.name}</TableCell>
                <TableCell>{country.population}</TableCell>
                <TableCell>{country.area}</TableCell>
                <TableCell>{country.region}</TableCell>
            </TableRow>
        })
    }

    return (
        <Table className={styles.table}>
            <TableHeader className={styles.tableHeader}>
                <TableRow>
                    <TableHead>Flag</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Population</TableHead>
                    <TableHead>Area(km<sub>2</sub>)</TableHead>
                    <TableHead>Region</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {renderTableRows()}
            </TableBody>
        </Table>
    )
}
