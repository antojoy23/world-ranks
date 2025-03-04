'use client';

import { createContext, ReactNode, useEffect, useRef, useState } from "react";
import { CountryResponse, getCountries } from "../actions/getCountries";
import { FilterState } from "../components/RankFilters";
import { getFilteredCountries, getSortedCountries } from "../utils/countries";

type CountryContext = {
    countries: CountryResponse[],
    isLoading: boolean,
    hasError: boolean,
    filterCountries: () => void,
    updateFilters: (filters: FilterState) => void,
    updateSearchTerm: (searchTerm: string) => void
}

export const CountriesContext = createContext<CountryContext | null>(null);

const mapCountriesToCode = (countries: CountryResponse[]) => {
    const countryCodeMap = new Map();
    for (let i = 0; i < countries.length; i++) {
        countryCodeMap.set(countries[i].code, i);
    }
    return countryCodeMap;
}

export default function CountriesProvider({ children }: { children: ReactNode }) {
    const [countries, setCountries] = useState<CountryResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const originalCountriesRef = useRef<CountryResponse[]>([]);
    const originalCountriesCodeMappingRef = useRef<Map<string, number>>(new Map());
    const filtersRef = useRef<FilterState>(null);
    const searchTermRef = useRef<string>('');

    const updateFilters = (filters: FilterState) => {
        filtersRef.current = filters;
    }

    const updateSearchTerm = (searchTerm: string) => {
        searchTermRef.current = searchTerm;
        filterCountries();
    }

    const filterCountries = () => {
        const newCountries = getFilteredCountries(originalCountriesRef.current, filtersRef.current, searchTermRef.current);
        const sortedCountries = getSortedCountries(newCountries, filtersRef.current?.sort_by);
        setCountries(sortedCountries);
    }

    useEffect(() => {
        const fetchCountries = async () => {
            const { error, countries } = await getCountries();
            if (error) {
                setHasError(true);
            }
            if (countries) {
                originalCountriesRef.current = countries;
                originalCountriesCodeMappingRef.current = mapCountriesToCode(countries);
                setCountries(countries);
                setIsLoading(false);
            }
        }
        fetchCountries();
    }, []);

    return (
        <CountriesContext value={{ countries, hasError, isLoading, filterCountries, updateFilters, updateSearchTerm }}>{children}</CountriesContext>
    )
}