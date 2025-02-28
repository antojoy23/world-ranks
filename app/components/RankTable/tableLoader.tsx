import React from 'react'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import styles from './tableLoader.module.css';
import Loader from '../Loader';

const rowCount = 6;

export default function TableLoader() {
    const renderTableRows = () => {
        return Array(rowCount).fill(null).map((_, index) => {
            return <TableRow className={styles.tableRow} key={index}>
                <TableCell><Loader classes={styles.flagLoader} /></TableCell>
                <TableCell><Loader classes={styles.loader} /></TableCell>
                <TableCell><Loader classes={styles.loader} /></TableCell>
                <TableCell><Loader classes={styles.loader} /></TableCell>
                <TableCell><Loader classes={styles.loader} /></TableCell>
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
