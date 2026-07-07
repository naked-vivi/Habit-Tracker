import { parseISO } from "date-fns"
import { useEffect, useState } from "react"

export function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(() => {
        if (typeof window === "undefined") return initialValue

        try {
            const item = window.localStorage.getItem(key)
            if (item == null) return initialValue

            return JSON.parse(item, dateReviver)
        } catch {
            return initialValue
        }
    })

    useEffect(() => {
        if (typeof window === "undefined") return

        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue))
        } catch {
            // Keep the in-memory state usable when browser storage is unavailable.
        }
    }, [storedValue, key])

    return [storedValue, setStoredValue] as const
}

function dateReviver(_key: string, value: unknown) {
    if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
        return parseISO(value)
    }
    return value
}
