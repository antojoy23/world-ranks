import React from 'react'

import styles from './Loader.module.css';

export default function Loader({ classes }: { classes: string }) {
    return (
        <div className={`${styles.loader} ${classes}`}></div>
    )
}
