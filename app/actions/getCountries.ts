'use server';

import { getSortedCountries } from "../utils/countries";

export type Languages = {
    [key: string]: string
}

export type Currency = { name: string, symbol: string };
export type Currencies = {
    [key: string]: Currency
}
export interface Country {
    flags: { svg: string },
    name: { common: string, official: string },
    region: string,
    area: number,
    population: number,
    unMember: boolean,
    subregion: string,
    cca3: string
    borders: string[],
    currencies: Currencies,
    capital: string[],
    languages: Languages
}

export interface CountryFlags {
    flags: { svg: string },
    name: { common: string }
}

export interface CountryResponse {
    flag: string,
    code: string,
    name: string,
    region: string,
    area: number,
    population: number,
    unMemberStatus: boolean,
    subRegion: string,
    borders: string[]
}

export interface CountryCodeResponse {
    flag: string,
    name: string
}

const FIELDS_STRING = "cca3,name,flags,population,area,region,unMember,subregion"

const INFO_FIELDS_STRING = "name,borders,currencies,capital,languages,flags,population,area,region,subregion";

const fetchRequest = (url: string) => {
    return fetch(url, {
        cache: 'force-cache',
        next: { revalidate: 3600 * 24 * 7 } // 1 week
    })
}

export const getCountries = async () => {
    try {
        const countriesRes = await fetchRequest(`https://restcountries.com/v3.1/all?fields=${FIELDS_STRING}`);
        const countries: Country[] = await countriesRes.json();
        const newCountries = countries.map((country) => {
            return {
                flag: country.flags.svg,
                code: country.cca3,
                name: country.name.common,
                region: country.region,
                area: country.area,
                population: country.population,
                unMemberStatus: country.unMember,
                subRegion: country.subregion,
                borders: country.borders
            }
        });
        return { error: false, countries: getSortedCountries(newCountries) };
    } catch (ex) {
        console.error("Error fetching countries ", ex);
        return { error: true }
    }
};

export const getCountriesByCode = async (codes: string[]) => {
    try {
        const countriesRes = await fetchRequest(`https://restcountries.com/v3.1/alpha?codes=${codes.join(',')}&fields=name,flags`);
        const countries: CountryFlags[] = await countriesRes.json();
        return { error: false, countries };
    } catch (ex) {
        console.error("Error fetching countries by code ", ex);
        return { error: true }
    }
}

export const getCountryByCode = async (code: string) => {
    try {
        const countryRes = await fetchRequest(`https://restcountries.com/v3.1/alpha?codes=${code}&fields=${INFO_FIELDS_STRING}`);
        const country: Country[] = await countryRes.json();
        return { error: false, country: country[0] };
    } catch (ex) {
        console.error("Error fetching countries by code ", ex);
        return { error: true }
    }
}