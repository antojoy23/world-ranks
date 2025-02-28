import React from 'react'
import { getImageProps } from 'next/image'

import styles from './picture.module.css';

interface PictureProps {
    alt: string,
    mobileImage: string,
    desktopImage: string,
    classes: string
}

export default function Picture({ alt, mobileImage, desktopImage, classes }: PictureProps) {
    const common = { alt: alt, priority: true }
    const {
        props: desktopProps
    } = getImageProps({
        ...common,
        width: 1280,
        height: 300,
        src: desktopImage,
    })
    const {
        props: mobileProps,
    } = getImageProps({
        ...common,
        width: 960,
        height: 225,
        src: mobileImage,
    })
    return (
        <picture className={`${styles.picture} ${classes}`}>
            <source media='(max-width: 640px)' width={mobileProps.width} height={mobileProps.height} srcSet={mobileProps.srcSet} />
            <img {...desktopProps} />
        </picture>
    )
}
