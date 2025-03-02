export const dynamic = 'force-static';

import React from 'react'
import CountryInfo from './CountryInfo';

import styles from './page.module.css';

export default async function page({
    params,
}: {
    params: Promise<{ code: string }>
}) {

    const code = (await params).code;

    return (
        <main className={styles.main}>
            <CountryInfo code={code} />
        </main>
    )
}
