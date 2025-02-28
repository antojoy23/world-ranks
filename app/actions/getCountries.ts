'use server';

import { getSortedCountries } from "../utils/countries";

export interface Country {
    flags: { svg?: string, png?: string },
    name: { common: string },
    region: string,
    area: number,
    population: number,
    unMember: boolean,
    subregion: string
}

export interface CountryResponse {
    flag: string | undefined,
    name: string,
    region: string,
    area: number,
    population: number,
    unMemberStatus: boolean,
    subRegion: string
}

export const getCountries = async () => {
    try {
        const countriesRes = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,population,area,region,unMember,subregion');
        const countries: Country[] = await countriesRes.json();
        const newCountries = countries.map((country) => {
            return {
                flag: country.flags?.svg,
                name: country.name.common,
                region: country.region,
                area: country.area,
                population: country.population,
                unMemberStatus: country.unMember,
                subRegion: country.subregion
            }
        });
        return { error: false, countries: getSortedCountries(newCountries) };
    } catch (ex) {
        console.error("Error fetching countries ", ex);
        return { error: true }
    }
};