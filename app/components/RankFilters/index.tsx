'use client';

import React, { startTransition, use, useActionState, useRef } from 'react'

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
import { CountriesContext } from '@/app/context/CountriesContext';

export type SortFilter = "population" | "name" | "area";
export interface FilterState {
    sort_by: SortFilter,
    regions: string[],
    status: string[]
}

const initialState: FilterState = { sort_by: 'population', regions: [], status: [] };

const regions = [
    { value: 'americas', id: "americas_region", label: 'Americas' },
    { value: 'antarctic', id: "antarctic_region", label: 'Antarctic' },
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
    const countriesContext = use(CountriesContext);
    const { isLoading, hasError, updateFilters, filterCountries } = countriesContext || {};
    const [state, formAction] = useActionState((_oldFilters: FilterState, newFilters: FilterState) => {
        updateFilters && updateFilters(newFilters)
        filterCountries && filterCountries();
        return newFilters;
    }, initialState);
    const regionsRef = useRef(new Set<string>());
    const statusRef = useRef(new Set<string>());

    const onSortUpdate = (sortBy: SortFilter) => {
        startTransition(() => {
            formAction({ ...state, sort_by: sortBy })
        })
    }

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
                <fieldset className={styles.selectFieldset} disabled={isLoading || hasError}>
                    <legend className={styles.selectLegend}>Sort by</legend>
                    <Select defaultValue={state.sort_by} onValueChange={onSortUpdate} value={state.sort_by}>
                        <SelectTrigger className={styles.select}>
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent className={styles.selectContent}>
                            <SelectItem className={styles.selectItem} value="population">Population</SelectItem>
                            <SelectItem className={styles.selectItem} value="name">Name</SelectItem>
                            <SelectItem className={styles.selectItem} value="area">Area</SelectItem>
                        </SelectContent>
                    </Select>
                </fieldset>
                <fieldset className={styles.checkboxFieldset} disabled={isLoading || hasError}>
                    <legend className={styles.checkboxLegend}>Region</legend>
                    <CheckboxFilters onChange={onRegionUpdate} />
                </fieldset>
                <fieldset className={styles.statusFieldset} disabled={isLoading || hasError}>
                    <legend className={styles.statusLegend}>Status</legend>
                    <div className={styles.statusCheckboxWrapper}>
                        <Checkbox className={styles.statusCheckbox} onCheckedChange={(checked) => onStatusChange(checked, "un")} value={"un"} id='un_status' />
                        <Label className={styles.statusCheckboxLabel} htmlFor='un_status'>Member of the United Nations</Label>
                    </div>
                    <div className={styles.statusCheckboxWrapper}>
                        <Checkbox className={styles.statusCheckbox} onCheckedChange={(checked) => onStatusChange(checked, "independent")} value={"independent"} id="independent_status" />
                        <Label className={styles.statusCheckboxLabel} htmlFor='independent_status'>Independent</Label>
                    </div>
                </fieldset>
            </form>
        </section>
    )
}
