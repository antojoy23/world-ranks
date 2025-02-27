'use server';

export interface Country {
    flags: { svg?: string, png?: string },
    name: { common: string },
    region: string,
    area: number,
    population: number
}

export interface CountryResponse {
    flag: string | undefined,
    name: string,
    region: string,
    area: number,
    population: number
}

export const getCountries = async (sortBy: "population" | "name" | "population" = "population") => {
    const countriesRes = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,population,area,region');
    const countries: Country[] = await countriesRes.json();
    const newCountries = countries.map((country) => {
        return {
            flag: country.flags?.svg || country.flags?.png,
            name: country.name.common,
            region: country.region,
            area: country.area,
            population: country.population
        }
    });

    if (sortBy === "name") {
        return newCountries.sort()
    } else {
        return newCountries.sort((a, b) => b[sortBy] - a[sortBy])
    }
};