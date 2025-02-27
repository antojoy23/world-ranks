'use client';

import React, { startTransition, useActionState, useRef } from 'react'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

import styles from './rankFilters.module.css';

interface FormState {
    sort_by: string,
    regions: string[],
    status: string[]
}

const initialState: FormState = { sort_by: 'population', regions: [], status: [] };

async function onFormSubmit(_: FormState, formData: FormState) {
    console.log("FORM DATA ", formData);
    return formData;
}

const regions = [
    { value: 'americas', id: "americas_region", label: 'Americas' },
    { value: 'antartica', id: "antartica_region", label: 'Antartica' },
    { value: 'africa', id: "africa_region", label: 'Africa' },
    { value: 'asia', id: "asia_region", label: 'Asia' },
    { value: 'europe', id: "europe_region", label: 'Europe' },
    { value: 'oceania', id: "oceania_region", label: 'Oceania' }
]

const CheckboxFilters = ({ onChange }: { onChange: (value: string) => void }) => {
    return regions.map((region) => {
        return (
            <div key={region.value}>
                <Label className={styles.checkboxLabel} htmlFor={region.id}>{region.label}</Label>
                <input className={styles.checkbox} onChange={(e) => onChange(e.target.value)} title={region.label} id={region.id} type="checkbox" name="region" value={region.value} />
            </div>
        )
    })
}


export default function RankFilters() {
    const [state, formAction] = useActionState(onFormSubmit, initialState);
    const regionsRef = useRef(new Set<string>());
    const statusRef = useRef(new Set<string>());

    const onRegionUpdate = (region: string) => {
        if (regionsRef.current.has(region)) {
            regionsRef.current.delete(region);
        } else {
            regionsRef.current.add(region);
        }
        startTransition(() => formAction({ ...state, regions: Array.from(regionsRef.current) }))
    }

    const onStatusChange = (checked: boolean | 'indeterminate', status: string) => {
        if (checked === true) {
            statusRef.current.add(status);
        } else {
            statusRef.current.delete(status);
        }
        startTransition(() => formAction({ ...state, status: Array.from(statusRef.current) }))
    }

    return (
        <section>
            <form className={styles.filtersForm}>
                <fieldset className={styles.checkboxFieldset}>
                    <legend className={styles.checkboxLegend}>Sort by</legend>
                    <Select defaultValue={state.sort_by} onValueChange={(value) => startTransition(() => formAction({ ...state, sort_by: value }))} value={state.sort_by}>
                        <SelectTrigger className={styles.select}>
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="population">Population</SelectItem>
                            <SelectItem value="name">Name</SelectItem>
                            <SelectItem value="area">Area</SelectItem>
                        </SelectContent>
                    </Select>
                </fieldset>
                <fieldset className={styles.checkboxFieldset}>
                    <legend className={styles.checkboxLegend}>Region</legend>
                    <CheckboxFilters onChange={onRegionUpdate} />
                </fieldset>
                <fieldset className={styles.statusFieldset}>
                    <legend className={styles.statusLegend}>Status</legend>
                    <div className={styles.statusCheckboxWrapper}>
                        <Checkbox className={styles.statusCheckbox} onCheckedChange={(checked) => onStatusChange(checked, "us")} value={"us"} id='us_status' />
                        <Label htmlFor='us_status'>Member of the United Nations</Label>
                    </div>
                    <div className={styles.statusCheckboxWrapper}>
                        <Checkbox className={styles.statusCheckbox} onCheckedChange={(checked) => onStatusChange(checked, "independent")} value={"independent"} id="independent_status" />
                        <Label htmlFor='independent_status'>Independent</Label>
                    </div>
                </fieldset>
            </form>
        </section>
    )
}
