import { isSameDay } from "date-fns"
import { type Habit, HabitContext } from "./useHabits"
import { useLocalStorage } from "../hooks/useLocalStorage"

type HabitProviderProps = {
    children: React.ReactNode
}

export function HabitProvider({ children }: HabitProviderProps) {
    const [habits, setHabits] = useLocalStorage<Habit[]>("Habit", [])

    function addHabit(name: string) {
        const trimmedName = name.trim()
        if (!trimmedName) return

        setHabits(cur => [...cur, { id: crypto.randomUUID(), name: trimmedName, completions: [] }])
    }

    function deleteHabit(id: string) {
        setHabits(cur => cur.filter(h => h.id !== id))
    }

    function toggleHabit(id: string, date: Date) {
        setHabits(cur => (
            cur.map(h => {
                if (h.id !== id) return h

                // const alreadyDone = h.completions.some(c => isSameDay(c, date))
                // const completions = alreadyDone
                //   ? h.completions.filter(c => !isSameDay(c, date))
                //   : [...h.completions, date]

                const existing = h.completions ?? []
                const alreadyDone = existing.some(c => isSameDay(c, date))
                const completions = alreadyDone
                    ? existing.filter(c => !isSameDay(c, date))
                    : [...existing, date]

                return { ...h, completions }
            })
        ))
    }
    return (
        <HabitContext value={{ habits, addHabit, deleteHabit, toggleHabit }}>
            {children}
        </HabitContext>
    )
}
