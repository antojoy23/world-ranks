import { CountryResponse } from "../actions/getCountries"
import { FilterState, SortFilter } from "../components/RankFilters"

export const getSortedCountries = (countries: CountryResponse[], sortBy: SortFilter = "population") => {
    if (sortBy === "name") {
        return countries.toSorted((a, b) => {
            if (a[sortBy].toLowerCase() < b[sortBy].toLowerCase()) return -1;
            if (a[sortBy].toLowerCase() > b[sortBy].toLowerCase()) return 1
            return 0;
        });
    } else {
        return countries.toSorted((a, b) => b[sortBy] - a[sortBy]);
    }
}

export const getFilteredCountries = (countries: CountryResponse[], filters: FilterState | null, search: string) => {
    let filteredCountries = countries;
    if (filters) {
        if (filters.regions.length > 0) {
            filteredCountries = filteredCountries.filter((country) => filters.regions.some((region) => region === country.region.toLowerCase()));
        }
        if (filters.status.length > 0) {
            filteredCountries = filteredCountries.filter((country) => {
                return filters.status.some((status) => {
                    if (status === "un" && country.unMemberStatus) return true;
                    if (status === "independent" && !country.unMemberStatus) return true;
                    return false;
                });
            });
        }
    }
    if (search?.length > 0) {
        filteredCountries = filteredCountries.filter((country) => {
            if (country.name.toLowerCase().includes(search.toLowerCase())) return true;
            if (country.region.toLowerCase().includes(search.toLowerCase())) return true;
            if (country.subRegion.toLowerCase().includes(search.toLowerCase())) return true;
            return false;
        });
    }
    return filteredCountries;
}