import React from 'react'

import styles from './tableError.module.css';

export default function TableError() {
    return (
        <div className={styles.tableError}>
            Oops! Could not fetch the countries at this time. Please try again later.
        </div>
    )
}
