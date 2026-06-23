import { createContext, useContext } from "react"

export type Habit = {
    id: string
    name: string
    completions?: Date[] // Optional array to track completed dates for the habit
    // Add more fields as needed (e.g., frequency, progress, etc.)
}

type Context = {
    habits: Habit[]
    addHabit: (name: string) => void
    deleteHabit: (id: string) => void
    toggleHabit: (id: string, date: Date) => void
}

export const HabitContext = createContext<null | Context>(null)

export function useHabits() {
    const habitContext = useContext(HabitContext)

    if (habitContext == null) throw new Error("Null context")
    return habitContext
}