import { useEffect, useState } from "react"

export default function useDebounce<T>(value: T, delay: number = 500): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(debounceTimeout);
    }, [value, delay])

    return debouncedValue;
}